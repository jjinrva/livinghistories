from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.user import UserRole, UserStatus

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    school_district: Optional[str] = None
    location: Optional[str] = None
    state: Optional[str] = None
    subject: Optional[str] = None
    position: Optional[str] = None
    is_decision_maker: bool = False
    other_info: Optional[str] = None

class UserCreate(UserBase):
    password: Optional[str] = None
    role: UserRole = UserRole.TEACHER

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    school_district: Optional[str] = None
    location: Optional[str] = None
    state: Optional[str] = None
    subject: Optional[str] = None
    position: Optional[str] = None
    is_decision_maker: Optional[bool] = None
    other_info: Optional[str] = None
    role: Optional[UserRole] = None
    status: Optional[UserStatus] = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    school_district: Optional[str]
    location: Optional[str]
    state: Optional[str]
    subject: Optional[str]
    position: Optional[str]
    is_decision_maker: bool
    role: UserRole
    status: UserStatus
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True

class UserInvite(BaseModel):
    email: EmailStr
    role: UserRole = UserRole.TEACHER

class UserListResponse(BaseModel):
    users: list[UserResponse]
    total: int
    page: int
    size: int