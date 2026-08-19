from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, Query, status
from app.schemas.menu_schema import (
    MenuCategoryCreateRequest, MenuCategoryUpdateRequest, MenuCategoryResponse,
    MenuItemCreateRequest, MenuItemUpdateRequest, MenuItemResponse, FullMenuResponse
)
from app.services.menu_service import menu_service
from app.middleware.auth import get_current_admin

router = APIRouter(prefix="/menu", tags=["Menu Management"])


@router.get(
    "",
    response_model=FullMenuResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Full Menu",
    description="Retrieve all active categories and dishes for the website menu grid."
)
async def get_full_menu():
    """Get all categorized menu items."""
    return await menu_service.get_full_menu()


# ── Category Routes ──────────────────────────────────────────────────────────

@router.get(
    "/categories",
    response_model=List[MenuCategoryResponse],
    status_code=status.HTTP_200_OK,
    summary="List Menu Categories"
)
async def list_categories():
    """List active menu categories."""
    return await menu_service.get_categories()


@router.post(
    "/categories",
    response_model=MenuCategoryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Menu Category (Admin)"
)
async def create_category(
    data: MenuCategoryCreateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Add new menu category."""
    return await menu_service.create_category(data)


@router.patch(
    "/categories/{category_id}",
    response_model=MenuCategoryResponse,
    status_code=status.HTTP_200_OK,
    summary="Update Menu Category (Admin)"
)
async def update_category(
    category_id: str,
    data: MenuCategoryUpdateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Update menu category."""
    return await menu_service.update_category(category_id, data)


@router.delete(
    "/categories/{category_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete Menu Category (Admin)"
)
async def delete_category(
    category_id: str,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Deactivate menu category."""
    return await menu_service.delete_category(category_id)


# ── Dish / Item Routes ────────────────────────────────────────────────────────

@router.get(
    "/items",
    response_model=List[MenuItemResponse],
    status_code=status.HTTP_200_OK,
    summary="List Menu Items / Dishes"
)
async def list_dishes(
    category_id: Optional[str] = Query(None, description="Filter by category ID"),
    vegetarian_only: bool = Query(False, description="Filter strictly vegetarian dishes")
):
    """List dishes."""
    return await menu_service.get_menu_items(category_id, vegetarian_only)


@router.post(
    "/items",
    response_model=MenuItemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add Menu Item / Dish (Admin)"
)
async def add_dish(
    data: MenuItemCreateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Create new dish."""
    return await menu_service.create_menu_item(data)


@router.put(
    "/items/{item_id}",
    response_model=MenuItemResponse,
    status_code=status.HTTP_200_OK,
    summary="Update Menu Item / Dish (Admin)"
)
async def update_dish(
    item_id: str,
    data: MenuItemUpdateRequest,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Update dish details."""
    return await menu_service.update_menu_item(item_id, data)


@router.delete(
    "/items/{item_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete Menu Item / Dish (Admin)"
)
async def delete_dish(
    item_id: str,
    current_admin: Dict[str, Any] = Depends(get_current_admin)
):
    """Delete dish record."""
    return await menu_service.delete_menu_item(item_id)
