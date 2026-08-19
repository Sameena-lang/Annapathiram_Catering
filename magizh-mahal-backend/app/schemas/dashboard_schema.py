from typing import List, Dict, Any
from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    """Dashboard analytics and statistics response."""
    total_bookings: int
    pending_bookings: int
    confirmed_bookings: int
    upcoming_events_count: int
    total_inquiries: int
    new_inquiries: int
    total_contact_messages: int
    unread_messages: int
    total_menu_items: int
    total_gallery_items: int
    total_testimonials: int
    recent_bookings: List[Dict[str, Any]]
    recent_inquiries: List[Dict[str, Any]]
