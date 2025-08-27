from django.urls import path
from .views import verify_password, login_view, register_view
from . import views

urlpatterns = [
    path('verify-password/', verify_password),
    path('api/login/', login_view, name='login'),
    path('api/register/', register_view, name='register'),  # Ajoutez cette ligne
    path('api/list-programmes-v2/', views.list_programmes_v2, name='list_programmes_v2'),
    path('api/list-programmes-v2/<int:program_id>/', views.get_program_detail_v2, name='get_program_detail_v2'),
    path('api/program-detail-v2/<int:program_id>/', views.get_program_detail_v2, name='program_detail_v2'),    
    path('api/program-detail-with-similar/<int:program_id>/', views.get_program_detail_with_similar, name='program_detail_with_similar'),
    path('api/students/', views.get_students, name='get_students'),
    path('api/students/<int:student_id>/delete/', views.delete_student, name='delete_student'),
    path('api/admins/add/', views.add_admin, name='add_admin'),
    path('api/admins/', views.get_admins, name='get_admins'),
    path('api/admins/<int:admin_id>/delete/', views.delete_admin, name='delete_admin'),
]


