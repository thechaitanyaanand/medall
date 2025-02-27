from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

class Reminder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    medicine_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50, blank=True, null=True)
    timings = models.CharField(max_length=100, blank=True, null=True)
    tablet_count = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.medicine_name} for {self.user.username}"
