from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    accounts_index,           # Default index view
    RegistrationView,         # Registration endpoint
    OTPVerificationView,      # OTP verification endpoint
    ProfileSetupView,         # Profile setup endpoint
    SavePushTokenView,        # Save push token endpoint
    AddFamilyMemberView,      # Add family member endpoint
    FamilyListView,           # List family members endpoint
    DoctorConnectionListView, # List connected patients (for doctors)
    PatientConnectionListView # List connected doctors (for patients)
)
from .ai_views import ChatbotQueryView  # Chatbot endpoint

urlpatterns = [
    path('', accounts_index, name='accounts_index'),
    path('register/', RegistrationView.as_view(), name='register'),
    path('otp-verify/', OTPVerificationView.as_view(), name='otp-verify'),
    path('profile-setup/', ProfileSetupView.as_view(), name='profile-setup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('save_push_token/', SavePushTokenView.as_view(), name='save_push_token'),
    path('chatbot/', ChatbotQueryView.as_view(), name='chatbot'),
    path('family/add/', AddFamilyMemberView.as_view(), name='family_add'),
    path('family/', FamilyListView.as_view(), name='family_list'),
    path('connections/doctor/', DoctorConnectionListView.as_view(), name='doctor_connections'),
    path('connections/patient/', PatientConnectionListView.as_view(), name='patient_connections'),
]
