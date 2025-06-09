from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import Optional, List
from datetime import datetime, timedelta
import secrets

from app.models.user import User, UserRole, UserStatus
from app.schemas.user import UserCreate, UserUpdate
from app.auth.auth import get_password_hash, verify_password

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

def get_user_by_invitation_token(db: Session, token: str) -> Optional[User]:
    return db.query(User).filter(
        and_(
            User.invitation_token == token,
            User.invitation_expires_at > datetime.utcnow()
        )
    ).first()

def get_users(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    search: Optional[str] = None,
    status: Optional[UserStatus] = None,
    role: Optional[UserRole] = None
) -> List[User]:
    query = db.query(User)
    
    if search:
        search_filter = or_(
            User.full_name.ilike(f"%{search}%"),
            User.email.ilike(f"%{search}%"),
            User.school_district.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    if status:
        query = query.filter(User.status == status)
        
    if role:
        query = query.filter(User.role == role)
    
    return query.offset(skip).limit(limit).all()

def count_users(
    db: Session,
    search: Optional[str] = None,
    status: Optional[UserStatus] = None,
    role: Optional[UserRole] = None
) -> int:
    query = db.query(User)
    
    if search:
        search_filter = or_(
            User.full_name.ilike(f"%{search}%"),
            User.email.ilike(f"%{search}%"),
            User.school_district.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    if status:
        query = query.filter(User.status == status)
        
    if role:
        query = query.filter(User.role == role)
    
    return query.count()

def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = None
    if user.password:
        hashed_password = get_password_hash(user.password)
    
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        school_district=user.school_district,
        location=user.location,
        state=user.state,
        subject=user.subject,
        position=user.position,
        is_decision_maker=user.is_decision_maker,
        other_info=user.other_info,
        role=user.role,
        status=UserStatus.ACTIVE if user.password else UserStatus.PENDING
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_user_invitation(db: Session, email: str, role: UserRole = UserRole.TEACHER) -> User:
    # Generate secure invitation token
    invitation_token = secrets.token_urlsafe(32)
    invitation_expires_at = datetime.utcnow() + timedelta(days=7)  # 7 days to complete
    
    db_user = User(
        email=email,
        role=role,
        status=UserStatus.PENDING,
        invitation_token=invitation_token,
        invitation_sent_at=datetime.utcnow(),
        invitation_expires_at=invitation_expires_at
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def complete_user_onboarding(db: Session, user: User, onboarding_data) -> User:
    user.full_name = onboarding_data.full_name
    user.school_district = onboarding_data.school_district
    user.location = onboarding_data.location
    user.state = onboarding_data.state
    user.subject = onboarding_data.subject
    user.position = onboarding_data.position
    user.is_decision_maker = onboarding_data.is_decision_maker
    user.other_info = onboarding_data.other_info
    user.hashed_password = get_password_hash(onboarding_data.password)
    user.status = UserStatus.ACTIVE
    user.invitation_token = None  # Clear the token
    
    db.commit()
    db.refresh(user)
    return user

def update_user(db: Session, user: User, user_update: UserUpdate) -> User:
    for field, value in user_update.dict(exclude_unset=True).items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not user.hashed_password:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    return user

def activate_user(db: Session, user: User) -> User:
    user.status = UserStatus.ACTIVE
    db.commit()
    db.refresh(user)
    return user

def disable_user(db: Session, user: User) -> User:
    user.status = UserStatus.DISABLED
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user: User) -> bool:
    db.delete(user)
    db.commit()
    return True

def create_initial_admin(db: Session, email: str, password: str) -> User:
    """Create the initial admin user if it doesn't exist"""
    existing_admin = get_user_by_email(db, email)
    if existing_admin:
        return existing_admin
    
    admin_user = User(
        email=email,
        hashed_password=get_password_hash(password),
        full_name="System Administrator",
        role=UserRole.SUPER_ADMIN,
        status=UserStatus.ACTIVE
    )
    
    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)
    return admin_user