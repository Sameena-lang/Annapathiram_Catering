from typing import Optional, List, Dict, Any
from fastapi import HTTPException, status, BackgroundTasks
from bson import ObjectId
from app.config.database import db_manager
from app.schemas.booking_schema import BookingCreateRequest, BookingStatusUpdateRequest
from app.services.email_service import email_service
from app.services.whatsapp_service import whatsapp_service
from app.utils.helpers import serialize_doc, serialize_docs, utc_now
from app.utils.logger import logger


class BookingService:
    """Catering booking business logic."""

    @staticmethod
    async def create_booking(data: BookingCreateRequest, background_tasks: Optional[BackgroundTasks] = None) -> Dict[str, Any]:
        """Create a new catering reservation and trigger notification alerts."""
        doc = data.model_dump()
        doc.update({
            "status": "pending",
            "is_notified": False,
            "admin_notes": None,
            "created_at": utc_now(),
            "updated_at": utc_now()
        })

        result = await db_manager.bookings.insert_one(doc)
        doc["_id"] = result.inserted_id
        serialized = serialize_doc(doc)

        # Trigger notifications in background
        if background_tasks:
            background_tasks.add_task(email_service.send_booking_confirmation, serialized)
            background_tasks.add_task(email_service.send_admin_booking_alert, serialized)
            background_tasks.add_task(whatsapp_service.send_booking_alert, serialized)
        else:
            try:
                email_service.send_booking_confirmation(serialized)
                email_service.send_admin_booking_alert(serialized)
                await whatsapp_service.send_booking_alert(serialized)
            except Exception as e:
                logger.warning(f"Notification alert warning: {e}")

        return serialized

    @staticmethod
    async def get_bookings(
        status_filter: Optional[str] = None,
        search: Optional[str] = None,
        page: int = 1,
        limit: int = 50
    ) -> Dict[str, Any]:
        """Retrieve paginated catering bookings with optional filters."""
        query: Dict[str, Any] = {}
        if status_filter and status_filter != "all":
            query["status"] = status_filter

        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"phone": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"event_type": {"$regex": search, "$options": "i"}},
            ]

        total = await db_manager.bookings.count_documents(query)
        cursor = db_manager.bookings.find(query).sort("created_at", -1).skip((page - 1) * limit).limit(limit)
        items = await cursor.to_list(length=limit)

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "items": serialize_docs(items)
        }

    @staticmethod
    async def get_booking_by_id(booking_id: str) -> Dict[str, Any]:
        """Fetch single booking by ID."""
        try:
            doc = await db_manager.bookings.find_one({"_id": ObjectId(booking_id)})
            if not doc:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found.")
            return serialize_doc(doc)
        except Exception:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid booking ID format.")

    @staticmethod
    async def update_booking_status(booking_id: str, data: BookingStatusUpdateRequest) -> Dict[str, Any]:
        """Update booking status and admin notes."""
        try:
            update_data = {
                "status": data.status,
                "updated_at": utc_now()
            }
            if data.admin_notes is not None:
                update_data["admin_notes"] = data.admin_notes

            result = await db_manager.bookings.find_one_and_update(
                {"_id": ObjectId(booking_id)},
                {"$set": update_data},
                return_document=True
            )
            if not result:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found.")
            return serialize_doc(result)
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Could not update booking.")

    @staticmethod
    async def delete_booking(booking_id: str) -> Dict[str, str]:
        """Delete booking record."""
        try:
            res = await db_manager.bookings.delete_one({"_id": ObjectId(booking_id)})
            if res.deleted_count == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found.")
            return {"message": "Booking successfully deleted.", "id": booking_id}
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid booking ID.")


booking_service = BookingService()
