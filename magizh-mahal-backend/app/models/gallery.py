from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.utils.helpers import utc_now


class GalleryModel(BaseModel):
    """Gallery media document model."""
    title: str
    description: Optional[str] = None
    category: str = "Catering Feasts"  # "Catering Feasts", "Venue & Dining Setups"
    tag: str = "Grand Setup"
    media_type: str = "image"  # "image" or "video"
    url: str
    thumbnail_url: Optional[str] = None
    display_order: int = 0
    is_featured: bool = False
    created_at: datetime = Field(default_factory=utc_now)
