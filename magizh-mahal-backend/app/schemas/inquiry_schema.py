from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.utils.validators import validate_phone_number


class InquiryCreateRequest(BaseModel):
    """Event inquiry submission schema."""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    email: Optional[str] = None
    event_type: str = "Traditional Wedding Feast"
    expected_date: Optional[str] = None
    expected_guests: Optional[int] = None
    notes: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        if not validate_phone_number(v):
            raise ValueError("Please provide a valid 10-digit phone number.")
        return v.strip()


class InquiryStatusUpdateRequest(BaseModel):
    """Inquiry status update schema."""
    status: str = Field(..., pattern="^(new|contacted|in_discussion|converted|closed)$")
    notes: Optional[str] = None


class InquiryResponse(BaseModel):
    """Inquiry response schema."""
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    event_type: str
    expected_date: Optional[str] = None
    expected_guests: Optional[int] = None
    status: str
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class InquiryListResponse(BaseModel):
    """List of inquiries."""
    total: int
    items: List[InquiryResponse]
