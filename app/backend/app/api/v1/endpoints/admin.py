# app/backend/app/api/v1/endpoints/admin.py
from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.schemas.user import UserResponse, UserInvite, UserListResponse
from app.crud.user import (
    get_users, count_users, get_user_by_id, create_user_invitation,
    activate_user, disable_user, delete_user, get_user_by_email
)
from app.auth.deps import get_admin_user, get_super_admin_user
from app.models.user import User, UserStatus, UserRole
from app.utils.email import send_invitation_email

router = APIRouter()

@router.get("/users", response_model=UserListResponse)
async def list_users(
    page: int = Query(1, ge=1),
    size: int = Query(50, ge=1, le=100),
    search: Optional[str] = Query(None),
    status: Optional[UserStatus] = Query(None),
    role: Optional[UserRole] = Query(None),
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """List all users with filtering and pagination"""
    skip = (page - 1) * size
    
    users = get_users(
        db, 
        skip=skip, 
        limit=size, 
        search=search, 
        status=status, 
        role=role
    )
    
    total = count_users(
        db, 
        search=search, 
        status=status, 
        role=role
    )
    
    return UserListResponse(
        users=users,
        total=total,
        page=page,
        size=size
    )

@router.post("/invite-user", response_model=UserResponse)
async def invite_user(
    invitation: UserInvite,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Send invitation to new user"""
    # Check if user already exists
    existing_user = get_user_by_email(db, invitation.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create invitation
    invited_user = create_user_invitation(db, invitation.email, invitation.role)
    
    # Send email in background
    background_tasks.add_task(
        send_invitation_email,
        email=invitation.email,
        token=invited_user.invitation_token,
        inviter_name=current_user.full_name or current_user.email
    )
    
    return invited_user

@router.patch("/users/{user_id}/activate", response_model=UserResponse)
async def activate_user_account(
    user_id: int,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Activate user account"""
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    activated_user = activate_user(db, user)
    return activated_user

@router.patch("/users/{user_id}/disable", response_model=UserResponse)
async def disable_user_account(
    user_id: int,
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Disable user account"""
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Prevent disabling super admins
    if user.role == UserRole.SUPER_ADMIN and current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot disable super admin"
        )
    
    disabled_user = disable_user(db, user)
    return disabled_user

@router.delete("/users/{user_id}")
async def delete_user_account(
    user_id: int,
    current_user: User = Depends(get_super_admin_user),
    db: Session = Depends(get_db)
):
    """Delete user account (super admin only)"""
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Prevent deleting yourself
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    delete_user(db, user)
    return {"message": "User deleted successfully"}

@router.get("/stats")
async def get_admin_stats(
    current_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get admin dashboard statistics"""
    total_users = count_users(db)
    active_users = count_users(db, status=UserStatus.ACTIVE)
    pending_users = count_users(db, status=UserStatus.PENDING)
    disabled_users = count_users(db, status=UserStatus.DISABLED)
    
    teachers = count_users(db, role=UserRole.TEACHER)
    admins = count_users(db, role=UserRole.SCHOOL_ADMIN) + count_users(db, role=UserRole.SUPER_ADMIN)
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "pending_users": pending_users,
        "disabled_users": disabled_users,
        "teachers": teachers,
        "admins": admins
    }