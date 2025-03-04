"""
URL configuration for medapp_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include accounts endpoints with the "api/accounts/" prefix
    path('api/accounts/', include('accounts.urls')),
    # Include reminders endpoints with the "api/reminders/" prefix
    path('api/reminders/', include('reminders.urls')),
    # Include documents endpoints with the "api/documents/" prefix
    path('api/documents/', include('documents.urls')),
    path('', RedirectView.as_view(url='api/accounts/', permanent=False)),
    path('api/chatbot/', include('chatbot.urls')), 
]

# If you're in development and want to serve media files:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
