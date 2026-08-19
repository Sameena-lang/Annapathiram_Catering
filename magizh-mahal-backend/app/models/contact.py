from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import utc_now


class ContactModel(BaseModel):
    """General contact form inquiry document model."""
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=utc_now)
