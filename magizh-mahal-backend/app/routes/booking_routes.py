from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, Query, BackgroundTasks, status
from app.schemas.booking_schema import (
    BookingCreateRequest, BookingStatusUpdateRequest,
    BookingResponse, BookingListResponse
)
from app.services.booking_service import booking_service
from app.middleware.auth import get_current_admin

router = APIRouter(prefix="/bookings", tags=["Bookings & Reservations"])


@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Catering Reservation",
    description="Submit a catering reservation inquiry from the website booking form. Triggers email & WhatsApp alerts."
)
async def create_booking(
    data: BookingCreateRequest,
    background_tasks: BackgroundTasks
):
    """Create new booking reservation."""
    return await booking_service.create_booking(data, background_tasks)


@router.get(
    "",
    response_model=BookingListResponse,
    status_code=status.HTTP_200_OK,
    summary="List Bookings (Admin)",
    description="Retrieve all catering reservations with optional status filter, search query, and pagination."
)
async def list_bookings(
    status: Optional[str] = Query(None, description="Filter by status (pending, confirmed, completed, cancelled)"),
    search: Optional[str] = Query(None, description="Search by name, phone, or email"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """List bookings."""
    return await booking_service.get_bookings(
        status_filter=status,
        search=search,
        page=page,
        limit=limit
    )


@router.get(
    "/{booking_id}",
    response_model=BookingResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Booking Details (Admin)"
)
async def get_booking(
    booking_id: str,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Fetch booking by ID."""
    return await booking_service.get_booking_by_id(booking_id)


@router.patch(
    "/{booking_id}/status",
    response_model=BookingResponse,
    status_code=status.HTTP_200_OK,
    summary="Update Booking Status (Admin)"
)
async def update_booking_status(
    booking_id: str,
    data: BookingStatusUpdateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Update status of booking."""
    return await booking_service.update_booking_status(booking_id, data)


@router.delete(
    "/{booking_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete Booking (Admin)"
)
async def delete_booking(
    booking_id: str,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Delete a booking record."""
    return await booking_service.delete_booking(booking_id)
