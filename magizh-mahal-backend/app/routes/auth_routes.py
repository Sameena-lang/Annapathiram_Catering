from typing import Dict, Any
from fastapi import APIRouter, Depends, status
from app.schemas.auth_schema import (
    AdminLoginRequest, AdminLoginResponse,
    AdminProfileResponse, SeedAdminResponse
)
from app.services.auth_service import auth_service
from app.middleware.auth import get_current_admin

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/seed-admin",
    response_model=SeedAdminResponse,
    status_code=status.HTTP_200_OK,
    summary="Seed Initial Default Admin",
    description="Creates the default superadmin account if no admin accounts currently exist in MongoDB."
)
async def seed_admin():
    """Create initial admin account."""
    return await auth_service.seed_default_admin()


@router.post(
    "/login",
    response_model=AdminLoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Admin Login",
    description="Authenticate admin credentials and obtain a JWT Bearer access token."
)
async def login(credentials: AdminLoginRequest):
    """Authenticate and receive access token."""
    return await auth_service.authenticate_admin(
        email=credentials.email,
        password=credentials.password
    )


@router.get(
    "/me",
    response_model=AdminProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Current Admin Profile",
    description="Fetch profile details of the authenticated admin."
)
async def get_profile(current_admin: Dict[str, Any] = Depends(get_current_admin)):
    """Retrieve logged-in admin details."""
    return current_admin
