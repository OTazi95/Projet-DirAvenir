from django.urls import path
from .views import verify_password
from . import views

urlpatterns = [
    path('verify-password/', verify_password),
    path('api/list-programmes-v2/', views.list_programmes_v2, name='list_programmes_v2'),
    path('api/program-detail-v2/<int:program_id>/', views.get_program_detail_v2, name='program_detail_v2'),    
    path('api/orientation/submit/', views.submit_test, name='submit_test'),
    path('api/orientation/majors/', views.get_majors, name='get_majors'),
    path('api/orientation/results/<int:test_id>/', views.get_test_results, name='get_test_results'),
    path('api/program-detail-with-similar/<int:program_id>/', views.get_program_detail_with_similar, name='program_detail_with_similar'),
]


