from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import RegistrationSerializer, OTPVerificationSerializer, ProfileSerializer
from .models import CustomUser, OTPVerification, Profile
from django.conf import settings

# Registration Endpoint
class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

# OTP Verification Endpoint
class OTPVerificationView(generics.GenericAPIView):
    serializer_class = OTPVerificationSerializer

    def post(self, request, *args, **kwargs):
        otp_code = request.data.get('otp_code')
        username = request.data.get('username')
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
            return Response({"message": "Profile setup complete.", "profile": ProfileSerializer(profile).data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

OTP_SERVICE_CLASS = settings.OTP_SERVICE_CLASS

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def perform_create(self, serializer):
        # Create the user
        user = serializer.save()
        otp_code = '123456'  # Replace with secure OTP generation logic
        otp_obj = OTPVerification.objects.create(user=user, otp_code=otp_code)
        
        # Use the configured OTP service
        otp_service = OTP_SERVICE_CLASS()
        try:
            otp_service.send_otp(user.mobile_number, otp_code)
        except Exception as e:
            otp_obj.delete()
            return Response(
                {"error": "Failed to send OTP. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )