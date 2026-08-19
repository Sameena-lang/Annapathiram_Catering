from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


# ── Category Schemas ─────────────────────────────────────────────────────────

class MenuCategoryCreateRequest(BaseModel):
    """Create menu category request."""
    name: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    display_order: int = 0


class MenuCategoryUpdateRequest(BaseModel):
    """Update menu category request."""
    name: Optional[str] = None
    description: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class MenuCategoryResponse(BaseModel):
    """Menu category response."""
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    display_order: int = 0
    is_active: bool = True
    created_at: datetime


# ── Menu Item / Dish Schemas ──────────────────────────────────────────────────

class MenuItemCreateRequest(BaseModel):
    """Create dish / menu item request."""
    title: str = Field(..., min_length=2, max_length=150)
    category_id: str
    tag: str = Field("Signature Feast", max_length=50)
    description: str = Field(..., min_length=5, max_length=1000)
    highlights: List[str] = Field(default_factory=list)
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    is_vegetarian: bool = True
    is_available: bool = True
    display_order: int = 0


class MenuItemUpdateRequest(BaseModel):
    """Update dish / menu item request."""
    title: Optional[str] = None
    category_id: Optional[str] = None
    tag: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    is_vegetarian: Optional[bool] = None
    is_available: Optional[bool] = None
    display_order: Optional[int] = None


class MenuItemResponse(BaseModel):
    """Dish / menu item response."""
    id: str
    title: str
    category_id: str
    category_name: str
    tag: str
    description: str
    highlights: List[str]
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    is_vegetarian: bool = True
    is_available: bool = True
    display_order: int = 0
    created_at: datetime
    updated_at: datetime


class FullMenuResponse(BaseModel):
    """Full categorized menu response."""
    categories: List[MenuCategoryResponse]
    items: List[MenuItemResponse]
