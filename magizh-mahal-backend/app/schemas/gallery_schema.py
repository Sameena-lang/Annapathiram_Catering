from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class GalleryCreateRequest(BaseModel):
    """Create gallery media item."""
    title: str = Field(..., min_length=2, max_length=150)
    description: Optional[str] = Field(None, max_length=500)
    category: str = Field("Catering Feasts", examples=["Catering Feasts", "Venue & Dining Setups"])
    tag: str = Field("Grand Setup", max_length=50)
    media_type: str = Field("image", pattern="^(image|video)$")
    url: str
    thumbnail_url: Optional[str] = None
    display_order: int = 0
    is_featured: bool = False


class GalleryUpdateRequest(BaseModel):
    """Update gallery media item."""
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tag: Optional[str] = None
    media_type: Optional[str] = None
    url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    display_order: Optional[int] = None
    is_featured: Optional[bool] = None


class GalleryResponse(BaseModel):
    """Gallery media item response."""
    id: str
    title: str
    description: Optional[str] = None
    category: str
    tag: str
    media_type: str
    url: str
    thumbnail_url: Optional[str] = None
    display_order: int = 0
    is_featured: bool = False
    created_at: datetime


class GalleryListResponse(BaseModel):
    """List of gallery items."""
    total: int
    items: List[GalleryResponse]
