from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class TestimonialCreateRequest(BaseModel):
    """Create testimonial review."""
    name: str = Field(..., min_length=2, max_length=100)
    role: str = Field("Wedding Client · Chennai", max_length=100)
    rating: int = Field(5, ge=1, le=5)
    review: str = Field(..., min_length=10, max_length=2000)
    initials: str = Field("MM", max_length=10)
    avatar_url: Optional[str] = None
    is_approved: bool = True
    display_order: int = 0


class TestimonialUpdateRequest(BaseModel):
    """Update testimonial review."""
    name: Optional[str] = None
    role: Optional[str] = None
    rating: Optional[int] = None
    review: Optional[str] = None
    initials: Optional[str] = None
    avatar_url: Optional[str] = None
    is_approved: Optional[bool] = None
    display_order: Optional[int] = None


class TestimonialResponse(BaseModel):
    """Testimonial review response."""
    id: str
    name: str
    role: str
    rating: int
    review: str
    initials: str
    avatar_url: Optional[str] = None
    is_approved: bool
    display_order: int
    created_at: datetime


class TestimonialListResponse(BaseModel):
    """List of testimonials."""
    total: int
    items: List[TestimonialResponse]
