from django.urls import path
from .views import RegisterView
from .views import list_logos

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("logos/", list_logos, name="list_logos"),
    
]
