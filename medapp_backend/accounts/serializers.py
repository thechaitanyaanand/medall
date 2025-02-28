# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser, OTPVerification, Profile

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ('username', 'mobile_number', 'password', 'confirm_password', 'role')
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(**validated_data)
        # Generate OTP – in production, use a secure random generator
        OTPVerification.objects.create(user=user, otp_code='123456')
        return user

class OTPVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTPVerification
        fields = ('user', 'otp_code')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('full_name', 'address', 'date_of_birth')

# accounts/serializers.py (append these serializers)
from .models import Family, Connection

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'

class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = '__all__'
