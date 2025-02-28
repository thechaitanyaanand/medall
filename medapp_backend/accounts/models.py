# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Custom User Manager and Model (if not already defined)
class CustomUserManager(BaseUserManager):
    def create_user(self, username, mobile_number, password, role, **extra_fields):
        if not username:
            raise ValueError("Username is required")
        if not mobile_number:
            raise ValueError("Mobile number is required")
        user = self.model(username=username, mobile_number=mobile_number, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, mobile_number, password, role='doctor', **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, mobile_number, password, role, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    mobile_number = models.CharField(max_length=20, unique=True)
    role = models.CharField(max_length=20, choices=(('doctor', 'Doctor'), ('patient', 'Patient')))
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['mobile_number', 'role']

    def __str__(self):
        return self.username

# OTP Verification model
class OTPVerification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f'OTP for {self.user.username}'

# Profile model for additional user info
class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return f'Profile for {self.user.username}'

# accounts/models.py (add these models at the bottom)
class Family(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='family_owner')
    family_member = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='family_member')
    
    class Meta:
        unique_together = ('user', 'family_member')

    def __str__(self):
        return f"{self.user.username} - {self.family_member.username}"

class Connection(models.Model):
    connection_id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='doctor_connections')
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='patient_connections')
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Doctor: {self.doctor.username} - Patient: {self.patient.username}"
