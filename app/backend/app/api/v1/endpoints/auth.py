from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.core.database import get_db
from app.schemas.auth import LoginRequest, TokenResponse, InvitationValidation, UserOnboardingComplete
from app.schemas.user import UserResponse  # Import UserResponse directly
from app.crud.user import authenticate_user, get_user_by_invitation_token, complete_user_onboarding
from app.auth.auth import create_access_token
from app.models.user import UserStatus
from app.core.config import settings

router = APIRouter()
security = HTTPBearer()

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse  # Use directly imported UserResponse

@router.post("/login", response_model=LoginResponse)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if user.status != UserStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account not activated"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(user)
    )

@router.post("/validate-invitation")
async def validate_invitation(
    validation: InvitationValidation,
    db: Session = Depends(get_db)
):
    user = get_user_by_invitation_token(db, validation.token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid invitation token"
        )
    
    if user.invitation_expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invitation expired"
        )
    
    return {"valid": True, "email": user.email}

@router.post("/complete-onboarding", response_model=LoginResponse)
async def complete_onboarding(
    onboarding_data: UserOnboardingComplete,
    db: Session = Depends(get_db)
):
    user = get_user_by_invitation_token(db, onboarding_data.token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid invitation token"
        )
    
    # Complete user registration
    user_data = complete_user_onboarding(db, user, onboarding_data)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(user_data)
    )