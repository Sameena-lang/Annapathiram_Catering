from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from app.config.database import db_manager
from app.schemas.inquiry_schema import (
    InquiryCreateRequest, InquiryStatusUpdateRequest,
    InquiryResponse, InquiryListResponse
)
from app.middleware.auth import get_current_admin
from app.utils.helpers import serialize_doc, serialize_docs, utc_now

router = APIRouter(prefix="/inquiries", tags=["Event Inquiries"])


@router.post(
    "",
    response_model=InquiryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Quick Inquiry"
)
async def submit_inquiry(data: InquiryCreateRequest):
    """Submit quick event quote inquiry."""
    doc = data.model_dump()
    doc.update({
        "status": "new",
        "created_at": utc_now(),
        "updated_at": utc_now()
    })
    res = await db_manager.inquiries.insert_one(doc)
    doc["_id"] = res.inserted_id
    return serialize_doc(doc)


@router.get(
    "",
    response_model=InquiryListResponse,
    status_code=status.HTTP_200_OK,
    summary="List Inquiries (Admin)"
)
async def list_inquiries(current_admin: Dict[str, Any] = Depends(get_current_admin)):
    """List all event inquiries."""
    cursor = db_manager.inquiries.find().sort("created_at", -1)
    items = await cursor.to_list(length=100)
    total = await db_manager.inquiries.count_documents({})
    return {
        "total": total,
        "items": serialize_docs(items)
    }


@router.patch(
    "/{inquiry_id}/status",
    response_model=InquiryResponse,
    status_code=status.HTTP_200_OK,
    summary="Update Inquiry Status (Admin)"
)
async def update_inquiry_status(
    inquiry_id: str,
    data: InquiryStatusUpdateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Update inquiry status and notes."""
    try:
        update_data = {
            "status": data.status,
            "updated_at": utc_now()
        }
        if data.notes is not None:
            update_data["notes"] = data.notes

        res = await db_manager.inquiries.find_one_and_update(
            {"_id": ObjectId(inquiry_id)},
            {"$set": update_data},
            return_document=True
        )
        if not res:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found.")
        return serialize_doc(res)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid inquiry ID.")
