from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import utc_now


class InquiryModel(BaseModel):
    """Event inquiry document model."""
    name: str
    phone: str
    email: Optional[str] = None
    event_type: str = "Traditional Wedding Feast"
    expected_date: Optional[str] = None
    expected_guests: Optional[int] = None
    status: str = "new"  # new, contacted, in_discussion, converted, closed
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)
