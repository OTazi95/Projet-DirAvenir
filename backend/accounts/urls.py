from django.urls import path
from .views import verify_password
from .views import get_programmes_universites
from .views import list_programmes

urlpatterns = [
    path('verify-password/', verify_password),
    path('get-programmes-universites/', get_programmes_universites),
    path('list-programmes/', list_programmes),
]
