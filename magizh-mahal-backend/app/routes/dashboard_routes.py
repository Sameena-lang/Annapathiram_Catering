from datetime import datetime, timezone
from typing import Dict, Any
from fastapi import APIRouter, Depends, status
from app.config.database import db_manager
from app.schemas.dashboard_schema import DashboardStatsResponse
from app.middleware.auth import get_current_admin
from app.utils.helpers import serialize_docs

router = APIRouter(prefix="/dashboard", tags=["Dashboard & Analytics"])


@router.get(
    "/stats",
    response_model=DashboardStatsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Dashboard Statistics (Admin)",
    description="Retrieve live analytics including total bookings, pending requests, upcoming events, inquiries, and content counts."
)
async def get_dashboard_stats(current_admin: Dict[str, Any] = Depends(get_current_admin)):
    """Fetch dashboard counts and recent activity."""
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Counts
    total_bookings = await db_manager.bookings.count_documents({})
    pending_bookings = await db_manager.bookings.count_documents({"status": "pending"})
    confirmed_bookings = await db_manager.bookings.count_documents({"status": "confirmed"})
    upcoming_events = await db_manager.bookings.count_documents({
        "event_date": {"$gte": now_str},
        "status": {"$in": ["pending", "confirmed"]}
    })

    total_inquiries = await db_manager.inquiries.count_documents({})
    new_inquiries = await db_manager.inquiries.count_documents({"status": "new"})

    total_contacts = await db_manager.contacts.count_documents({})
    unread_contacts = await db_manager.contacts.count_documents({"is_read": False})

    total_menu = await db_manager.menu_items.count_documents({})
    total_gallery = await db_manager.gallery.count_documents({})
    total_testimonials = await db_manager.testimonials.count_documents({})

    # Recent items
    recent_bookings_cursor = db_manager.bookings.find().sort("created_at", -1).limit(5)
    recent_bookings = await recent_bookings_cursor.to_list(length=5)

    recent_inquiries_cursor = db_manager.inquiries.find().sort("created_at", -1).limit(5)
    recent_inquiries = await recent_inquiries_cursor.to_list(length=5)

    return {
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "confirmed_bookings": confirmed_bookings,
        "upcoming_events_count": upcoming_events,
        "total_inquiries": total_inquiries,
        "new_inquiries": new_inquiries,
        "total_contact_messages": total_contacts,
        "unread_messages": unread_contacts,
        "total_menu_items": total_menu,
        "total_gallery_items": total_gallery,
        "total_testimonials": total_testimonials,
        "recent_bookings": serialize_docs(recent_bookings),
        "recent_inquiries": serialize_docs(recent_inquiries)
    }
