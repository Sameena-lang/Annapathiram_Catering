import re
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from bson import ObjectId


def str_object_id(oid: Any) -> str:
    """Safely convert BSON ObjectId to string."""
    if isinstance(oid, ObjectId):
        return str(oid)
    return str(oid) if oid else ""


def serialize_doc(doc: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """Convert MongoDB document `_id` to string `id`."""
    if not doc:
        return None
    res = dict(doc)
    if "_id" in res:
        res["id"] = str(res.pop("_id"))
    return res


def serialize_docs(docs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Convert a list of MongoDB documents."""
    return [serialize_doc(d) for d in docs if d]


def generate_slug(text: str) -> str:
    """Generate a URL-safe slug from text."""
    slug = text.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_-]+", "-", slug)
    return slug


def utc_now() -> datetime:
    """Get current UTC datetime."""
    return datetime.now(timezone.utc)
