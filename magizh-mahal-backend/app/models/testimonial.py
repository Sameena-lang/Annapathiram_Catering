from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import utc_now


class TestimonialModel(BaseModel):
    """Testimonial review document model."""
    name: str
    role: str = "Wedding Client · Chennai"
    rating: int = 5
    review: str
    initials: str = "MM"
    avatar_url: Optional[str] = None
    is_approved: bool = True
    display_order: int = 0
    created_at: datetime = Field(default_factory=utc_now)
