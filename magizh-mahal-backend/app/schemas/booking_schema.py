from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.utils.validators import validate_phone_number


class BookingCreateRequest(BaseModel):
    """Booking creation request schema."""
    name: str = Field(..., min_length=2, max_length=100, examples=["Priya Ramachandran"])
    phone: str = Field(..., min_length=10, max_length=20, examples=["+919840012345"])
    email: Optional[str] = Field(None, examples=["priya@example.com"])
    event_type: str = Field("Traditional Wedding Feast", examples=["Traditional Wedding Feast", "Grand Reception Buffet", "Muhurtham Catering"])
    event_date: str = Field(..., examples=["2026-11-20"])
    guest_count: int = Field(100, ge=10, le=50000, examples=[500])
    special_requirements: Optional[str] = Field(None, examples=["Need Elaneer Payasam & Live Dosa counter"])

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        if not validate_phone_number(v):
            raise ValueError("Please provide a valid 10-digit phone number.")
        return v.strip()


class BookingStatusUpdateRequest(BaseModel):
    """Booking status update request."""
    status: str = Field(..., pattern="^(pending|confirmed|completed|cancelled)$")
    admin_notes: Optional[str] = None


class BookingResponse(BaseModel):
    """Booking response schema."""
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    event_type: str
    event_date: str
    guest_count: int
    special_requirements: Optional[str] = None
    status: str
    is_notified: bool = False
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class BookingListResponse(BaseModel):
    """List of bookings with metadata."""
    total: int
    page: int
    limit: int
    items: List[BookingResponse]
