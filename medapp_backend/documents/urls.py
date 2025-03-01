# medapp_backend/documents/urls.py
from django.urls import path
from .views import DocumentCreateView, DocumentListView, ServeDocumentView, DocumentDetailView
urlpatterns = [
    path('add/', DocumentCreateView.as_view(), name='document_add'),
    path('', DocumentListView.as_view(), name='document_list'),
    path('serve/<int:document_id>/', ServeDocumentView.as_view(), name='serve_document'),
    path('<int:pk>/', DocumentDetailView.as_view(), name='document_detail'),
]
