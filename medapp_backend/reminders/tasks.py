# reminders/tasks.py
from celery import shared_task
from datetime import datetime
from django.utils import timezone
from .models import Reminder
from .utils import send_medicine_notification  # We'll create this next
# reminders/tasks.py (update import)
from .utils.notification import send_medicine_notification

@shared_task
def check_and_send_reminder_notifications():
    """
    This task checks for reminders that are due and sends notifications.
    For simplicity, assume the Reminder model's 'timings' field is a comma‐separated list of times in HH:MM format (24-hour).
    """
    now = timezone.localtime(timezone.now())
    current_time_str = now.strftime("%H:%M")

    # Query all reminders (in production, you might narrow this query for efficiency)
    reminders = Reminder.objects.all()
    for reminder in reminders:
        # Assume reminder.timings is a comma-separated string like "08:00,20:00"
        times = [t.strip() for t in reminder.timings.split(',') if t.strip()]
        if current_time_str in times:
            # Send a notification for this reminder.
            # In production, you might add extra logic to ensure you don't send duplicate notifications.
            send_medicine_notification(reminder.user, reminder)
