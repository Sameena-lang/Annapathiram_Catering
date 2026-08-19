from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, Query, status
from app.schemas.gallery_schema import (
    GalleryCreateRequest, GalleryUpdateRequest,
    GalleryResponse, GalleryListResponse
)
from app.services.gallery_service import gallery_service
from app.middleware.auth import get_current_admin

router = APIRouter(prefix="/gallery", tags=["Gallery & Media Management"])


@router.get(
    "",
    response_model=List[GalleryResponse],
    status_code=status.HTTP_200_OK,
    summary="List Gallery Media",
    description="Retrieve all gallery photos and videos, optionally filtered by category ('Catering Feasts', 'Venue & Dining Setups')."
)
async def list_gallery(category: Optional[str] = Query(None, description="Category filter")):
    """List gallery items."""
    return await gallery_service.get_gallery_items(category)


@router.post(
    "/upload",
    status_code=status.HTTP_201_CREATED,
    summary="Upload Media File (Admin)",
    description="Upload an image (JPG, PNG, WEBP) or video (MP4, WEBM) to the server."
)
async def upload_media(
    file: UploadFile = File(...),
    folder: str = Form("gallery"),
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Upload media file."""
    return await gallery_service.upload_file(file, folder)


@router.post(
    "",
    response_model=GalleryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add Gallery Item (Admin)"
)
async def add_gallery_item(
    data: GalleryCreateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Add new gallery item."""
    return await gallery_service.create_gallery_item(data)


@router.put(
    "/{gallery_id}",
    response_model=GalleryResponse,
    status_code=status.HTTP_200_OK,
    summary="Update Gallery Item (Admin)"
)
async def update_gallery_item(
    gallery_id: str,
    data: GalleryUpdateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Update gallery item."""
    return await gallery_service.update_gallery_item(gallery_id, data)


@router.delete(
    "/{gallery_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete Gallery Item (Admin)"
)
async def delete_gallery_item(
    gallery_id: str,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Delete gallery item."""
    return await gallery_service.delete_gallery_item(gallery_id)
