from datetime import datetime, timezone
from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from bson import ObjectId
from app.config.database import db_manager
from app.config.security import verify_password, get_password_hash, create_access_token
from app.config.settings import settings
from app.utils.helpers import serialize_doc, utc_now
from app.utils.logger import logger


class AuthService:
    """Authentication and Admin management service."""

    @staticmethod
    async def seed_default_admin() -> Dict[str, str]:
        """Create the initial default admin if no admin accounts exist."""
        existing_admin = await db_manager.admins.find_one({"email": settings.INITIAL_ADMIN_EMAIL.lower()})
        if existing_admin:
            return {
                "message": "Default admin already exists.",
                "email": settings.INITIAL_ADMIN_EMAIL,
                "status": "existing"
            }

        admin_doc = {
            "email": settings.INITIAL_ADMIN_EMAIL.lower(),
            "password_hash": get_password_hash(settings.INITIAL_ADMIN_PASSWORD),
            "full_name": settings.INITIAL_ADMIN_NAME,
            "role": "superadmin",
            "is_active": True,
            "created_at": utc_now(),
            "last_login": None
        }

        await db_manager.admins.insert_one(admin_doc)
        logger.info(f"Default admin initialized: {settings.INITIAL_ADMIN_EMAIL}")
        return {
            "message": "Default admin successfully created.",
            "email": settings.INITIAL_ADMIN_EMAIL,
            "status": "created"
        }

    @staticmethod
    async def authenticate_admin(email: str, password: str) -> Dict[str, Any]:
        """Authenticate admin credentials and return JWT token."""
        admin = await db_manager.admins.find_one({"email": email.lower().strip()})
        if not admin or not verify_password(password, admin.get("password_hash", "")):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
                headers={"WWW-Authenticate": "Bearer"}
            )

        if not admin.get("is_active", True):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin account is inactive. Please contact system administrator."
            )

        # Update last login
        await db_manager.admins.update_one(
            {"_id": admin["_id"]},
            {"$set": {"last_login": utc_now()}}
        )

        admin_data = serialize_doc(admin)
        token_payload = {
            "sub": str(admin["_id"]),
            "email": admin["email"],
            "role": admin.get("role", "admin"),
            "full_name": admin.get("full_name", "")
        }

        access_token = create_access_token(token_payload)

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expires_in_minutes": settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES,
            "admin": {
                "id": admin_data["id"],
                "email": admin_data["email"],
                "full_name": admin_data.get("full_name"),
                "role": admin_data.get("role")
            }
        }

    @staticmethod
    async def get_admin_by_id(admin_id: str) -> Optional[Dict[str, Any]]:
        """Get admin document by ID."""
        try:
            admin = await db_manager.admins.find_one({"_id": ObjectId(admin_id)})
            return serialize_doc(admin)
        except Exception:
            return None


auth_service = AuthService()
