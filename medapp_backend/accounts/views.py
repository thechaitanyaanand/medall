from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
from django.contrib.auth import get_user_model
import secrets

# Import your serializers and models
from .serializers import (
    RegistrationSerializer,
    OTPVerificationSerializer,
    ProfileSerializer,
    FamilySerializer,
    ConnectionSerializer,
    PushTokenSerializer
)
from .models import CustomUser, OTPVerification, Profile

User = get_user_model()

# Utility function to generate a secure OTP
def generate_otp(length=6):
    digits = "0123456789"
    return ''.join(secrets.choice(digits) for _ in range(length))

# Save Push Token View
class SavePushTokenView(generics.UpdateAPIView):
    """
    Update the current user's push token.
    """
    serializer_class = PushTokenSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# Registration Endpoint with OTP generation and sending
class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def perform_create(self, serializer):
        # Create the user
        user = serializer.save()
        
        # Generate a secure OTP
        otp_code = generate_otp()  # e.g., "483920"
        
        # Create an OTPVerification record for the user
        otp_obj = OTPVerification.objects.create(user=user, otp_code=otp_code)
        
        # Use the configured OTP service to send the OTP
        otp_service = settings.OTP_SERVICE_CLASS()  # This should be set in your settings.py
        try:
            otp_service.send_otp(user.mobile_number, otp_code)
        except Exception as e:
            # If sending fails, delete the OTP record
            otp_obj.delete()
            raise Exception("Failed to send OTP. Please try again later.")
        
        # For testing: log the generated OTP to the console
        print("Generated OTP:", otp_code)

# OTP Verification Endpoint
class OTPVerificationView(generics.GenericAPIView):
    serializer_class = OTPVerificationSerializer

    def post(self, request, *args, **kwargs):
        otp_code = request.data.get('otp_code')
        username = request.data.get('username')
        if not username or not otp_code:
            return Response({"error": "Both username and otp_code are required."},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        try:
            otp_obj = OTPVerification.objects.get(user=user, otp_code=otp_code, verified=False)
        except OTPVerification.DoesNotExist:
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
        otp_obj.verified = True
        otp_obj.save()
        return Response({"message": "OTP verified successfully."})

# Profile Setup Endpoint
class ProfileSetupView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save(user=request.user)
            return Response({
                "message": "Profile setup complete.",
                "profile": ProfileSerializer(profile).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Accounts Index View (Optional - to list available endpoints)
@api_view(['GET'])
def accounts_index(request):
    endpoints = {
        "register": "/api/accounts/register/",
        "otp-verify": "/api/accounts/otp-verify/",
        "profile-setup": "/api/accounts/profile-setup/",
        "token": "/api/accounts/token/",
        "token/refresh": "/api/accounts/token/refresh/",
        "save_push_token": "/api/accounts/save_push_token/",
        "chatbot": "/api/accounts/chatbot/",
        "family/add": "/api/accounts/family/add/",
        "family": "/api/accounts/family/",
        "connections/doctor": "/api/accounts/connections/doctor/",
        "connections/patient": "/api/accounts/connections/patient/",
    }
    return Response({
        "message": "Welcome to the Accounts API.",
        "endpoints": endpoints
    })

# Family & Connection Endpoints

# Add Family Member: Send OTP to add a family member
class AddFamilyMemberView(generics.CreateAPIView):
    serializer_class = FamilySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# List Family Members
class FamilyListView(generics.ListAPIView):
    serializer_class = FamilySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.family_owner.all()

# For doctors: List connected patients
class DoctorConnectionListView(generics.ListAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.doctor_connections.filter(verified=True)

# For patients: List connected doctors
class PatientConnectionListView(generics.ListAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.patient_connections.filter(verified=True)
