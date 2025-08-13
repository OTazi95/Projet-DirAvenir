from django.urls import path
from .views import verify_password, get_programmes_universites, list_programmes
from . import views

urlpatterns = [
    path('verify-password/', verify_password),
    path('get-programmes-universites/', get_programmes_universites),
    path('list-programmes/', list_programmes),
    path('api/orientation/submit/', views.submit_test, name='submit_test'),
    path('api/orientation/majors/', views.get_majors, name='get_majors'),
    path('api/orientation/results/<int:test_id>/', views.get_test_results, name='get_test_results'),

]


