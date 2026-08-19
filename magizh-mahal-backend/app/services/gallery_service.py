import os
import uuid
import aiofiles
from typing import List, Dict, Any, Optional
from fastapi import HTTPException, status, UploadFile
from bson import ObjectId
from app.config.database import db_manager
from app.config.settings import settings
from app.schemas.gallery_schema import GalleryCreateRequest, GalleryUpdateRequest
from app.utils.validators import validate_upload_file
from app.utils.helpers import serialize_doc, serialize_docs, utc_now
from app.utils.logger import logger


class GalleryService:
    """Gallery media management and file upload handling service."""

    @staticmethod
    async def upload_file(file: UploadFile, folder: str = "gallery") -> Dict[str, Any]:
        """Save uploaded image or video to local storage folder."""
        media_type = validate_upload_file(file, is_video_allowed=True)

        target_dir = os.path.join(settings.UPLOAD_DIR, folder)
        os.makedirs(target_dir, exist_ok=True)

        ext = file.filename.split(".")[-1].lower() if "." in file.filename else "bin"
        unique_filename = f"{uuid.uuid4().hex}.{ext}"
        file_path = os.path.join(target_dir, unique_filename)

        try:
            async with aiofiles.open(file_path, "wb") as out_file:
                while content := await file.read(1024 * 1024):  # 1MB chunk
                    await out_file.write(content)

            public_url = f"/uploads/{folder}/{unique_filename}"
            logger.info(f"File uploaded successfully: {public_url} ({media_type})")

            return {
                "url": public_url,
                "filename": unique_filename,
                "media_type": media_type,
                "size_bytes": os.path.getsize(file_path)
            }
        except Exception as e:
            logger.error(f"File write error: {e}")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save uploaded file.")

    @staticmethod
    async def get_gallery_items(category: Optional[str] = None) -> List[Dict[str, Any]]:
        """List gallery media items."""
        query: Dict[str, Any] = {}
        if category and category != "All":
            query["category"] = category

        cursor = db_manager.gallery.find(query).sort("display_order", 1)
        items = await cursor.to_list(length=100)
        return serialize_docs(items)

    @staticmethod
    async def create_gallery_item(data: GalleryCreateRequest) -> Dict[str, Any]:
        """Create new gallery item."""
        doc = data.model_dump()
        doc["created_at"] = utc_now()
        res = await db_manager.gallery.insert_one(doc)
        doc["_id"] = res.inserted_id
        return serialize_doc(doc)

    @staticmethod
    async def update_gallery_item(item_id: str, data: GalleryUpdateRequest) -> Dict[str, Any]:
        """Update gallery item."""
        try:
            update_data = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
            res = await db_manager.gallery.find_one_and_update(
                {"_id": ObjectId(item_id)},
                {"$set": update_data},
                return_document=True
            )
            if not res:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found.")
            return serialize_doc(res)
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid gallery ID.")

    @staticmethod
    async def delete_gallery_item(item_id: str) -> Dict[str, str]:
        """Delete gallery item and remove local media file if present."""
        try:
            doc = await db_manager.gallery.find_one({"_id": ObjectId(item_id)})
            if not doc:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found.")

            # Attempt local file deletion if path starts with /uploads/
            url = doc.get("url", "")
            if url.startswith("/uploads/"):
                rel_path = url.lstrip("/")
                if os.path.exists(rel_path):
                    try:
                        os.remove(rel_path)
                    except Exception:
                        pass

            await db_manager.gallery.delete_one({"_id": ObjectId(item_id)})
            return {"message": "Gallery item deleted.", "id": item_id}
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid gallery item ID.")


gallery_service = GalleryService()
