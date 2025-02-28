# reminders/utils/notification.py
import logging
# from aws_sns_utils import AWSSNSClient  # Uncomment if you have AWS SNS set up

logger = logging.getLogger(__name__)

def send_medicine_notification(user, reminder):
    """
    Send a notification to the user about their medicine reminder.
    For now, we'll simply log the notification. In production, integrate with AWS SNS, push notifications, etc.
    """
    message = f"Hi {user.username}, it's time to take your {reminder.medicine_name} ({reminder.dosage})."
    # If using AWS SNS:
    # sns_client = AWSSNSClient()
    # sns_client.send_otp(user.mobile_number, message)  # You could reuse the SNS client for SMS notifications
    logger.info(f"Notification sent to {user.username}: {message}")
