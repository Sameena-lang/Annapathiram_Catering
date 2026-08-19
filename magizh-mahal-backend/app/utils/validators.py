import re
from typing import Set
from fastapi import HTTPException, UploadFile, status
from app.config.settings import settings

# Allowed file extensions and MIME types
ALLOWED_IMAGE_EXTENSIONS: Set[str] = {"jpg", "jpeg", "png", "webp", "gif"}
ALLOWED_VIDEO_EXTENSIONS: Set[str] = {"mp4", "webm", "mov", "m4v"}

ALLOWED_IMAGE_MIMES: Set[str] = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}
ALLOWED_VIDEO_MIMES: Set[str] = {
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-m4v",
}


def validate_phone_number(phone: str) -> bool:
    """Validate Indian / international phone numbers."""
    cleaned = re.sub(r"[\s\-\(\)\+]", "", phone)
    return len(cleaned) >= 10 and cleaned.isdigit()


def validate_upload_file(file: UploadFile, is_video_allowed: bool = True) -> str:
    """
    Validate uploaded file extension and MIME type.
    Returns detected media type: 'image' or 'video'.
    """
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename cannot be empty."
        )

    ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    content_type = file.content_type.lower() if file.content_type else ""

    if ext in ALLOWED_IMAGE_EXTENSIONS or content_type in ALLOWED_IMAGE_MIMES:
        return "image"

    if is_video_allowed and (ext in ALLOWED_VIDEO_EXTENSIONS or content_type in ALLOWED_VIDEO_MIMES):
        return "video"

    allowed_types = "Images (JPG, PNG, WEBP)" + (" or Videos (MP4, WEBM)" if is_video_allowed else "")
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=f"Unsupported file type '{ext}'. Allowed types: {allowed_types}."
    )
