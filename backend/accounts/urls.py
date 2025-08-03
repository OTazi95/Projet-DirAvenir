from django.urls import path
from .views import verify_password
from .views import get_programmes_universites

urlpatterns = [
    path('verify-password/', verify_password),
    path('get-programmes-universites/', get_programmes_universites),
]
