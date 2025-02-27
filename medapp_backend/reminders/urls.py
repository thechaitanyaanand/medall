from django.urls import path
from .views import ReminderListCreateView, ReminderDetailView

urlpatterns = [
    path('reminders/', ReminderListCreateView.as_view(), name='reminder_list_create'),
    path('reminders/<int:pk>/', ReminderDetailView.as_view(), name='reminder_detail'),
]
