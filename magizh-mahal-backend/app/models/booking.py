from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import utc_now


class BookingModel(BaseModel):
    """Catering booking document model."""
    name: str
    phone: str
    email: Optional[str] = None
    event_type: str = "Traditional Wedding Feast"  # Wedding, Reception, Engagement, Birthday, Corporate, Housewarming
    event_date: str  # YYYY-MM-DD
    guest_count: int = 100
    special_requirements: Optional[str] = None
    status: str = "pending"  # pending, confirmed, completed, cancelled
    is_notified: bool = False
    admin_notes: Optional[str] = None
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)
