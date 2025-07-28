from django.urls import path
from .views import UpdateProfileView, DeleteAccountView

urlpatterns = [
    path('update-profile/', UpdateProfileView.as_view(), name='update-profile'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
]
