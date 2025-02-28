from django.shortcuts import render

# Create your views here.
# documents/views.py
from rest_framework import generics, permissions
from .models import Document
from .serializers import DocumentSerializer

# Endpoint to add a document
class DocumentCreateView(generics.CreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Endpoint to list/view documents sorted by date (latest first)
class DocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user).order_by('-document_date')
