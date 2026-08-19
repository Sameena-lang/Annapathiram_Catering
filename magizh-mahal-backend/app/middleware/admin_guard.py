from typing import Dict, Any, List
from fastapi import Depends, HTTPException, status
from app.middleware.auth import get_current_admin


class RequireRole:
    """Dependency for role-based authorization check."""

    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_admin: Dict[str, Any] = Depends(get_current_admin)) -> Dict[str, Any]:
        user_role = current_admin.get("role", "admin")
        if user_role not in self.allowed_roles and "superadmin" not in user_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: requires one of the following roles: {self.allowed_roles}."
            )
        return current_admin


# Pre-configured role guards
require_superadmin = RequireRole(["superadmin"])
require_manager = RequireRole(["superadmin", "manager"])
