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

# accounts/urls.py (append to existing urlpatterns)
from .views import AddFamilyMemberView, FamilyListView, DoctorConnectionListView, PatientConnectionListView

urlpatterns += [
    path('family/add/', AddFamilyMemberView.as_view(), name='family_add'),
    path('family/', FamilyListView.as_view(), name='family_list'),
    path('connections/doctor/', DoctorConnectionListView.as_view(), name='doctor_connections'),
    path('connections/patient/', PatientConnectionListView.as_view(), name='patient_connections'),
]
