from django.urls import path
from .views import RegistrationView, OTPVerificationView, ProfileSetupView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .ai_views import ChatbotQueryView 

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('otp-verify/', OTPVerificationView.as_view(), name='otp-verify'),
    path('profile-setup/', ProfileSetupView.as_view(), name='profile-setup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]


urlpatterns += [
    path('chatbot/', ChatbotQueryView.as_view(), name='chatbot'),
]