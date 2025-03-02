# chatbot/urls.py
from django.urls import path
from .views import ChatbotQueryView

urlpatterns = [
    path('', ChatbotQueryView.as_view(), name='chatbot_query'),
]
