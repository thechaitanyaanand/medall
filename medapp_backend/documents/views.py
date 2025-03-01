from django.shortcuts import render

# Create your views here.
# documents/views.py
from rest_framework import generics, permissions, parsers
from .models import Document
from .serializers import DocumentSerializer

# Endpoint to add a document
class DocumentCreateView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Endpoint to list/view documents sorted by date (latest first)
class DocumentListView(generics.ListAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user).order_by('-document_date')

class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
# medapp_backend/documents/views.py
from django.shortcuts import get_object_or_404
from django.http import FileResponse, Http404
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
import os
from .models import Document

@method_decorator(login_required, name='dispatch')
class ServeDocumentView(View):
    """
    Serves a document file if the logged-in user has permission to access it.
    """
    def get(self, request, document_id, *args, **kwargs):
        # Ensure that the document exists and belongs to the user
        document = get_object_or_404(Document, id=document_id, user=request.user)
        file_path = document.file.path  # Local file system path

        if not os.path.exists(file_path):
            raise Http404("File not found.")

        # Serve the file using Django's FileResponse
        response = FileResponse(open(file_path, 'rb'), content_type='application/octet-stream')
        response['Content-Disposition'] = f'inline; filename="{os.path.basename(file_path)}"'
        return response
