# backend/app/models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    SCHOOL_ADMIN = "school_admin" 
    TEACHER = "teacher"
    STUDENT = "student"

class UserStatus(str, enum.Enum):
    PENDING = "pending"
    ACTIVE = "active"
    DISABLED = "disabled"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)  # Null for pending invitations
    
    # Profile information
    full_name = Column(String, nullable=True)
    school_district = Column(String, nullable=True)
    location = Column(String, nullable=True)
    state = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    position = Column(String, nullable=True)
    is_decision_maker = Column(Boolean, default=False)
    other_info = Column(Text, nullable=True)
    
    # System fields
    role = Column(Enum(UserRole), default=UserRole.TEACHER)
    status = Column(Enum(UserStatus), default=UserStatus.PENDING)
    is_active = Column(Boolean, default=True)
    
    # Invitation fields
    invitation_token = Column(String, nullable=True, unique=True)
    invitation_sent_at = Column(DateTime(timezone=True), nullable=True)
    invitation_expires_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)

# backend/app/models/__init__.py
from .user import User, UserRole, UserStatus

__all__ = ["User", "UserRole", "UserStatus"]