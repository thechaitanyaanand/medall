# medapp_backend/reminders/models.py
from django.db import models
from django.conf import settings

class Reminder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    medicine_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50, blank=True, null=True)
    timings = models.CharField(max_length=100, blank=True, null=True)
    tabletCount = models.IntegerField(default=0)  # Ensure this field is an integer
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.medicine_name} for {self.user.username}"


class Appointment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor_name = models.CharField(max_length=100)
    doctor_contact = models.CharField(max_length=20, blank=True, null=True)
    appointment_reason = models.TextField(blank=True, null=True)
    appointment_date = models.DateTimeField()

    def __str__(self):
        return f"Appointment with {self.doctor_name} on {self.appointment_date}"
