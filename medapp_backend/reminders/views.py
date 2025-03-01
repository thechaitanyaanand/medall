# reminders/views.py
from rest_framework import generics, permissions
from .models import Reminder, Appointment
from .serializers import ReminderSerializer, AppointmentSerializer
from django.db import transaction

class ReminderListCreateView(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReminderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reminder.objects.all()
    
    @transaction.atomic
    def patch(self, request, *args, **kwargs):
        # This will wrap the partial update in a transaction
        return super().patch(request, *args, **kwargs)
# Appointments: list and create
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Appointments: retrieve, update, delete
class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Appointment.objects.all()
