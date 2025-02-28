from django.db import models

# Create your models here.
# documents/models.py
from django.db import models
from django.conf import settings

class Document(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    document_name = models.CharField(max_length=150)
    document_type = models.CharField(max_length=50, blank=True, null=True)
    document_date = models.DateField()
    file_url = models.TextField()  # URL to file in cloud storage (e.g., AWS S3)

    def __str__(self):
        return f"{self.document_name} ({self.document_type})"
