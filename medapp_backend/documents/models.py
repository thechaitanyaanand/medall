from django.db import models
from django.conf import settings

class Document(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    document_name = models.CharField(max_length=150)
    document_type = models.CharField(max_length=50, blank=True, null=True)
    document_date = models.DateField()
    file = models.FileField(upload_to='documents/')  # Files stored in media/documents/

    def __str__(self):
        return f"{self.document_name} ({self.document_type})"
