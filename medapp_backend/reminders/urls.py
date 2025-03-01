from django.urls import path
from .views import (
    ReminderListCreateView, ReminderDetailView,
    AppointmentListCreateView, AppointmentDetailView
)

urlpatterns = [
    path('reminders/', ReminderListCreateView.as_view(), name='reminder_list_create'),
    path('reminders/<int:pk>/', ReminderDetailView.as_view(), name='reminder_detail'),
    path('appointments/', AppointmentListCreateView.as_view(), name='appointment_list_create'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment_detail'),
]
