from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class AdminLoginRequest(BaseModel):
    """Admin login request schema."""
    email: EmailStr
    password: str = Field(..., min_length=6)


class AdminLoginResponse(BaseModel):
    """Admin login success response schema."""
    access_token: str
    token_type: str = "bearer"
    expires_in_minutes: int
    admin: dict


class AdminProfileResponse(BaseModel):
    """Admin profile details."""
    id: str
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    created_at: Optional[datetime] = None
    last_login: Optional[datetime] = None


class SeedAdminResponse(BaseModel):
    """Seed admin response schema."""
    message: str
    email: str
    status: str
