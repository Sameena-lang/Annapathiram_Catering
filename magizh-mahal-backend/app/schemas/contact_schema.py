from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.utils.validators import validate_phone_number


class ContactCreateRequest(BaseModel):
    """Contact form submission request schema."""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    email: Optional[str] = None
    message: str = Field(..., min_length=5, max_length=2000)

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        if not validate_phone_number(v):
            raise ValueError("Please provide a valid 10-digit phone number.")
        return v.strip()


class ContactResponse(BaseModel):
    """Contact form response schema."""
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    is_read: bool = False
    created_at: datetime


class ContactListResponse(BaseModel):
    """List of contact messages."""
    total: int
    items: List[ContactResponse]
