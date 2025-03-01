from django.contrib import admin
from .models import Reminder, Appointment

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'medicine_name', 'dosage', 'tabletCount', 'last_updated')
    search_fields = ('medicine_name', 'user__username')
    list_filter = ('last_updated',)
    ordering = ('-last_updated',)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'doctor_name', 'appointment_date')
    search_fields = ('doctor_name', 'user__username')
    list_filter = ('appointment_date',)
    ordering = ('-appointment_date',)
