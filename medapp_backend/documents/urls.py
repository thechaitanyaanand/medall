# documents/urls.py
from django.urls import path
from .views import DocumentCreateView, DocumentListView

urlpatterns = [
    path('documents/add/', DocumentCreateView.as_view(), name='document_add'),
    path('documents/', DocumentListView.as_view(), name='document_list'),
]
