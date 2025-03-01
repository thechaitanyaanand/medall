import logging

logger = logging.getLogger(__name__)

def send_notification(user, message):
    # For demonstration, log the message.
    logger.info(f"Notification for {user.username}: {message}")
