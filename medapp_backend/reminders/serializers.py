# reminders/serializers.py
from rest_framework import serializers
from .models import Reminder, Appointment


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'medicine_name', 'dosage', 'timings', 'tabletCount', 'last_updated']
    
    def update(self, instance, validated_data):
        new_tablet_count = validated_data.get('tabletCount', instance.tabletCount)
        if new_tablet_count < 0:
            raise serializers.ValidationError("Tablet count cannot be negative.")
        return super().update(instance, validated_data)

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
