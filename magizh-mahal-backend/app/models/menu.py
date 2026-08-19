from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.helpers import utc_now


class MenuCategoryModel(BaseModel):
    """Menu category document model."""
    name: str  # e.g., "Banana Leaf Feasts", "Live Tiffin & Dosa", "Biryani & Non-Veg", "Traditional Sweets"
    slug: str
    description: Optional[str] = None
    display_order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=utc_now)


class MenuItemModel(BaseModel):
    """Menu item / dish document model."""
    title: str
    category_id: str
    category_name: str
    tag: str = "Signature Feast"
    description: str
    highlights: List[str] = Field(default_factory=list)
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    is_vegetarian: bool = True
    is_available: bool = True
    display_order: int = 0
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)
