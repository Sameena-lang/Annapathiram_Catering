from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from app.config.database import db_manager
from app.schemas.testimonial_schema import (
    TestimonialCreateRequest, TestimonialUpdateRequest,
    TestimonialResponse, TestimonialListResponse
)
from app.middleware.auth import get_current_admin
from app.utils.helpers import serialize_doc, serialize_docs, utc_now

router = APIRouter(prefix="/testimonials", tags=["Testimonials & Reviews"])


@router.get(
    "",
    response_model=List[TestimonialResponse],
    status_code=status.HTTP_200_OK,
    summary="List Approved Testimonials"
)
async def list_testimonials():
    """Retrieve approved customer reviews."""
    cursor = db_manager.testimonials.find({"is_approved": True}).sort("display_order", 1)
    items = await cursor.to_list(length=50)
    return serialize_docs(items)


@router.post(
    "",
    response_model=TestimonialResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add Testimonial"
)
async def add_testimonial(data: TestimonialCreateRequest):
    """Add customer review."""
    doc = data.model_dump()
    doc["created_at"] = utc_now()
    res = await db_manager.testimonials.insert_one(doc)
    doc["_id"] = res.inserted_id
    return serialize_doc(doc)


@router.put(
    "/{testimonial_id}",
    response_model=TestimonialResponse,
    status_code=status.HTTP_200_OK,
    summary="Update Testimonial (Admin)"
)
async def update_testimonial(
    testimonial_id: str,
    data: TestimonialUpdateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Update review."""
    try:
        update_data = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
        res = await db_manager.testimonials.find_one_and_update(
            {"_id": ObjectId(testimonial_id)},
            {"$set": update_data},
            return_document=True
        )
        if not res:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found.")
        return serialize_doc(res)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid testimonial ID.")


@router.delete(
    "/{testimonial_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete Testimonial (Admin)"
)
async def delete_testimonial(
    testimonial_id: str,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Delete review."""
    try:
        res = await db_manager.testimonials.delete_one({"_id": ObjectId(testimonial_id)})
        if res.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found.")
        return {"message": "Testimonial deleted.", "id": testimonial_id}
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid testimonial ID.")
