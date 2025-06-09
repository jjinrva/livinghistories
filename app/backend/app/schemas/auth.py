from pydantic import BaseModel, EmailStr
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.user import UserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: "UserResponse"

class InvitationValidation(BaseModel):
    token: str

class UserOnboardingComplete(BaseModel):
    token: str
    full_name: str
    school_district: str
    location: str
    state: str
    subject: str
    position: str
    is_decision_maker: bool
    other_info: Optional[str] = None
    password: str