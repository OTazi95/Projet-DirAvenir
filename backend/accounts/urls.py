from django.urls import path
from .views import verify_password, get_programmes_universites, list_programmes

urlpatterns = [
    path('verify-password/', verify_password),
    path('get-programmes-universites/', get_programmes_universites),
    path('list-programmes/', list_programmes),
]
