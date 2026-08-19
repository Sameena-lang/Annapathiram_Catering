from typing import List, Dict, Any, Optional
from fastapi import HTTPException, status
from bson import ObjectId
from app.config.database import db_manager
from app.schemas.menu_schema import (
    MenuCategoryCreateRequest, MenuCategoryUpdateRequest,
    MenuItemCreateRequest, MenuItemUpdateRequest
)
from app.utils.helpers import serialize_doc, serialize_docs, generate_slug, utc_now


class MenuService:
    """Menu categories and dish varieties management service."""

    # ── Categories ────────────────────────────────────────────────────────────

    @staticmethod
    async def get_categories() -> List[Dict[str, Any]]:
        """List active menu categories ordered by display order."""
        cursor = db_manager.menu_categories.find({"is_active": True}).sort("display_order", 1)
        items = await cursor.to_list(length=100)
        return serialize_docs(items)

    @staticmethod
    async def create_category(data: MenuCategoryCreateRequest) -> Dict[str, Any]:
        """Create new menu category."""
        slug = generate_slug(data.name)
        existing = await db_manager.menu_categories.find_one({"slug": slug})
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Category with name '{data.name}' already exists.")

        doc = data.model_dump()
        doc.update({
            "slug": slug,
            "is_active": True,
            "created_at": utc_now()
        })
        res = await db_manager.menu_categories.insert_one(doc)
        doc["_id"] = res.inserted_id
        return serialize_doc(doc)

    @staticmethod
    async def update_category(cat_id: str, data: MenuCategoryUpdateRequest) -> Dict[str, Any]:
        """Update menu category."""
        try:
            update_data = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
            if "name" in update_data:
                update_data["slug"] = generate_slug(update_data["name"])

            res = await db_manager.menu_categories.find_one_and_update(
                {"_id": ObjectId(cat_id)},
                {"$set": update_data},
                return_document=True
            )
            if not res:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")
            return serialize_doc(res)
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid category ID.")

    @staticmethod
    async def delete_category(cat_id: str) -> Dict[str, str]:
        """Soft delete category."""
        try:
            await db_manager.menu_categories.update_one(
                {"_id": ObjectId(cat_id)},
                {"$set": {"is_active": False}}
            )
            return {"message": "Category deactivated.", "id": cat_id}
        except Exception:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid category ID.")

    # ── Menu Items / Dishes ───────────────────────────────────────────────────

    @staticmethod
    async def get_menu_items(category_id: Optional[str] = None, vegetarian_only: bool = False) -> List[Dict[str, Any]]:
        """Retrieve dishes, optionally filtered by category and vegetarian preference."""
        query: Dict[str, Any] = {"is_available": True}
        if category_id:
            query["category_id"] = category_id
        if vegetarian_only:
            query["is_vegetarian"] = True

        cursor = db_manager.menu_items.find(query).sort("display_order", 1)
        items = await cursor.to_list(length=200)
        return serialize_docs(items)

    @staticmethod
    async def get_full_menu() -> Dict[str, Any]:
        """Retrieve entire categorized menu."""
        categories = await MenuService.get_categories()
        items = await MenuService.get_menu_items()
        return {
            "categories": categories,
            "items": items
        }

    @staticmethod
    async def create_menu_item(data: MenuItemCreateRequest) -> Dict[str, Any]:
        """Create new dish."""
        # Verify category exists
        try:
            cat = await db_manager.menu_categories.find_one({"_id": ObjectId(data.category_id)})
            cat_name = cat.get("name", "General") if cat else "General"
        except Exception:
            cat_name = "General"

        doc = data.model_dump()
        doc.update({
            "category_name": cat_name,
            "created_at": utc_now(),
            "updated_at": utc_now()
        })
        res = await db_manager.menu_items.insert_one(doc)
        doc["_id"] = res.inserted_id
        return serialize_doc(doc)

    @staticmethod
    async def update_menu_item(item_id: str, data: MenuItemUpdateRequest) -> Dict[str, Any]:
        """Update dish details."""
        try:
            update_data = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
            update_data["updated_at"] = utc_now()

            if "category_id" in update_data:
                try:
                    cat = await db_manager.menu_categories.find_one({"_id": ObjectId(update_data["category_id"])})
                    if cat:
                        update_data["category_name"] = cat.get("name", "General")
                except Exception:
                    pass

            res = await db_manager.menu_items.find_one_and_update(
                {"_id": ObjectId(item_id)},
                {"$set": update_data},
                return_document=True
            )
            if not res:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu item not found.")
            return serialize_doc(res)
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid menu item ID.")

    @staticmethod
    async def delete_menu_item(item_id: str) -> Dict[str, str]:
        """Delete dish record."""
        try:
            res = await db_manager.menu_items.delete_one({"_id": ObjectId(item_id)})
            if res.deleted_count == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Menu item not found.")
            return {"message": "Menu item deleted.", "id": item_id}
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid menu item ID.")


menu_service = MenuService()
