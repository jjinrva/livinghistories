import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

def send_email(
    to_email: str,
    subject: str,
    html_content: str,
    text_content: Optional[str] = None
) -> bool:
    """Send email using SMTP"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f"{settings.EMAILS_FROM_NAME} <{settings.EMAILS_FROM_EMAIL}>"
        msg['To'] = to_email

        # Add text content if provided
        if text_content:
            text_part = MIMEText(text_content, 'plain')
            msg.attach(text_part)

        # Add HTML content
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)

        # Send email
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            if settings.SMTP_USER and settings.SMTP_PASSWORD:
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)

        logger.info(f"Email sent successfully to {to_email}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False

def send_invitation_email(email: str, token: str, inviter_name: str) -> bool:
    """Send invitation email to new user"""
    
    # Create invitation URL
    base_url = "https://history.jonestran.online"  # Update with your domain
    invitation_url = f"{base_url}/onboarding/{token}"
    
    subject = "Welcome to Living Histories - Complete Your Account Setup"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Living Histories</title>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #1a4d7a 0%, #2c5f8b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }}
            .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
            .button {{ display: inline-block; background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }}
            .button:hover {{ background: #ee5a24; }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
            .logo {{ font-size: 24px; font-weight: bold; margin-bottom: 10px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">📚 Living Histories</div>
                <h1>Welcome to Living Histories!</h1>
                <p>You've been invited to join our AI-powered historical education platform</p>
            </div>
            
            <div class="content">
                <h2>Hello!</h2>
                
                <p><strong>{inviter_name}</strong> has invited you to join Living Histories, where students can have authentic conversations with historical figures like Clara Barton, Frederick Douglass, and many others.</p>
                
                <p>To complete your account setup and start exploring our digital history library, please click the button below:</p>
                
                <div style="text-align: center;">
                    <a href="{invitation_url}" class="button">Complete Account Setup</a>
                </div>
                
                <p>This invitation will expire in 7 days. If you have any questions, please don't hesitate to reach out to our support team.</p>
                
                <h3>What you'll do next:</h3>
                <ol>
                    <li>Click the setup button above</li>
                    <li>Complete your profile information</li>
                    <li>Create a secure password</li>
                    <li>Start exploring historical characters</li>
                </ol>
                
                <p>We're excited to have you join our community of innovative educators!</p>
                
                <p>Best regards,<br>
                <strong>The Living Histories Team</strong></p>
            </div>
            
            <div class="footer">
                <p>This email was sent to {email}. If you didn't expect this invitation, you can safely ignore this email.</p>
                <p>&copy; 2025 Living Histories, Inc. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    Welcome to Living Histories!
    
    {inviter_name} has invited you to join Living Histories, where students can have authentic conversations with historical figures.
    
    To complete your account setup, visit: {invitation_url}
    
    This invitation expires in 7 days.
    
    Best regards,
    The Living Histories Team
    """
    
    return send_email(email, subject, html_content, text_content)