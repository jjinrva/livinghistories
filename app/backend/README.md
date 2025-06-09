# Living Histories Backend

FastAPI backend for the Living Histories educational platform.

## Setup

1. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run the application:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## API Documentation

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## Features

- JWT Authentication
- User Management
- Email Invitations
- Role-based Access Control
- SQLite Database (easily migrate to PostgreSQL)
- Automatic API documentation

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/validate-invitation` - Validate invitation token
- `POST /api/v1/auth/complete-onboarding` - Complete user onboarding

### Users
- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `GET /api/v1/users/{user_id}` - Get user by ID (admin)
- `PUT /api/v1/users/{user_id}` - Update user by ID (admin)

### Admin
- `GET /api/v1/admin/users` - List all users with filtering
- `POST /api/v1/admin/invite-user` - Send user invitation
- `PATCH /api/v1/admin/users/{user_id}/activate` - Activate user
- `PATCH /api/v1/admin/users/{user_id}/disable` - Disable user
- `DELETE /api/v1/admin/users/{user_id}` - Delete user
- `GET /api/v1/admin/stats` - Get admin statistics

## Database Models

### User
- Personal information (name, email, school district, etc.)
- Authentication (password hash, tokens)
- Role and status management
- Invitation tracking

## Security

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Input validation with Pydantic