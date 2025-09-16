from rest_framework.decorators import api_view, authentication_classes, permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
import json
from accounts.models import Profile, ProgrammesUniversitesV2, Application
from django.shortcuts import redirect
from django.contrib.auth import login as auth_login
from rest_framework.authtoken.models import Token
from django.contrib.auth import login as django_login
from rest_framework.permissions import AllowAny
from django.contrib.auth.decorators import login_required
import urllib.parse
from django.utils import timezone
import random
import string
from rest_framework import status
from django.core.paginator import Paginator
from django.db.models import Q, IntegerField
from django.db.models.functions import Cast
from .models import OrientationTest

def generate_application_id():
    """Génère un ID unique pour la candidature"""
    while True:
        app_id = ''.join(random.choices(string.digits, k=6))
        if not Application.objects.filter(application_id=app_id).exists():
            return app_id

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def submit_application(request):
    """
    Soumet une nouvelle candidature
    """
    try:
        data = request.data
        
        # Générer un ID unique pour la candidature
        app_id = data.get('formData', {}).get('applicationId', generate_application_id())
        
        # Créer la nouvelle candidature
        application = Application.objects.create(
            user=request.user,
            program=data.get('program', ''),
            university=data.get('university', ''),
            status='sent',
            form_data=data.get('formData', {}),
            application_id=str(app_id)
        )
        
        return Response({
            'message': 'Candidature soumise avec succès',
            'application': {
                'id': application.id,
                'application_id': application.application_id,
                'program': application.program,
                'university': application.university,
                'status': application.status,
                'submission_date': application.submission_date.isoformat(),
                'user_name': application.user_name,
                'user_email': application.user_email
            }
        }, status=201)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_applications(request):
    """
    Récupère toutes les candidatures de l'utilisateur connecté
    """
    try:
        applications = Application.objects.filter(user=request.user)
        
        applications_data = []
        for app in applications:
            applications_data.append({
                'id': app.id,
                'applicationId': app.application_id,
                'program': app.program,
                'university': app.university,
                'status': app.status,
                'submissionDate': app.submission_date.isoformat(),
                'formData': app.form_data,
                'files': app.form_data.get("files", {}),
                'userName': app.user_name,
                'userEmail': app.user_email,
                'userId': app.user.id
            })
        
        return Response(applications_data)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_applications(request):
    """
    Récupère toutes les candidatures (admin uniquement)
    """
    try:
        # Vérifier que l'utilisateur est admin
        from accounts.models import Profile
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        applications = Application.objects.all().select_related('user')
        
        applications_data = []
        for app in applications:
            applications_data.append({
                'id': app.id,
                'applicationId': app.application_id,
                'program': app.program,
                'university': app.university,
                'status': app.status,
                'submissionDate': app.submission_date.isoformat(),
                'formData': app.form_data,
                'files': app.form_data.get("files", {}),
                'userName': app.user_name,
                'userEmail': app.user_email,
                'userId': app.user.id,
                'reviewedBy': app.reviewed_by.get_full_name() if app.reviewed_by else None,
                'reviewedDate': app.reviewed_date.isoformat() if app.reviewed_date else None,
                'notes': app.notes
            })
        
        return Response(applications_data)
        
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_application_status(request, application_id):
    """
    Met à jour le statut d'une candidature (admin uniquement)
    """
    try:
        # Vérifier que l'utilisateur est admin
        from accounts.models import Profile
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        application = Application.objects.get(id=application_id)
        new_status = request.data.get('status')
        
        if new_status not in ['sent', 'reviewing', 'approved', 'rejected']:
            return Response({"error": "Statut invalide"}, status=400)
        
        application.status = new_status
        application.reviewed_by = request.user
        application.reviewed_date = timezone.now()
        
        # Ajouter des notes automatiques selon le statut
        status_notes = {
            'reviewing': 'Candidature en cours d\'examen',
            'approved': f'Candidature approuvée par {request.user.get_full_name()}',
            'rejected': f'Candidature rejetée par {request.user.get_full_name()}'
        }
        
        if new_status in status_notes:
            application.notes = status_notes[new_status]
        
        application.save()
        
        return Response({
            'message': 'Statut mis à jour avec succès',
            'application': {
                'id': application.id,
                'status': application.status,
                'reviewedBy': application.reviewed_by.get_full_name(),
                'reviewedDate': application.reviewed_date.isoformat(),
                'notes': application.notes
            }
        })
        
    except Application.DoesNotExist:
        return Response({"error": "Candidature introuvable"}, status=404)
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_application_detail(request, application_id):
    """
    Récupère les détails d'une candidature spécifique
    """
    try:
        # Vérifier que l'utilisateur est admin ou propriétaire de la candidature
        from accounts.models import Profile
        user_profile = Profile.objects.get(user=request.user)
        
        application = Application.objects.get(id=application_id)
        
        # Autoriser l'accès si admin ou si c'est sa propre candidature
        if user_profile.role not in ['admin', 'administrateur'] and application.user != request.user:
            return Response({"error": "Permission refusée"}, status=403)
        
        application_data = {
            'id': application.id,
            'applicationId': application.application_id,
            'program': application.program,
            'university': application.university,
            'status': application.status,
            'submissionDate': application.submission_date.isoformat(),
            'formData': application.form_data,
            'files': application.form_data.get("files", {}),
            'userName': application.user_name,
            'userEmail': application.user_email,
            'userId': application.user.id,
            'reviewedBy': application.reviewed_by.get_full_name() if application.reviewed_by else None,
            'reviewedDate': application.reviewed_date.isoformat() if application.reviewed_date else None,
            'notes': application.notes
        }
        
        return Response(application_data)
        
    except Application.DoesNotExist:
        return Response({"error": "Candidature introuvable"}, status=404)
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_application(request, application_id):
    """
    Supprime une candidature (admin uniquement)
    """
    try:
        # Vérifier que l'utilisateur est admin
        from accounts.models import Profile
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        application = Application.objects.get(id=application_id)
        application_info = f"#{application.application_id} - {application.user_name}"
        application.delete()
        
        return Response({
            'message': f'Candidature {application_info} supprimée avec succès'
        })
        
    except Application.DoesNotExist:
        return Response({"error": "Candidature introuvable"}, status=404)
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_application_statistics(request):
    """
    Récupère les statistiques des candidatures (admin uniquement)
    """
    try:
        # Vérifier que l'utilisateur est admin
        from accounts.models import Profile
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        from django.db.models import Count
        
        # Statistiques globales
        total_applications = Application.objects.count()
        status_counts = Application.objects.values('status').annotate(count=Count('status'))
        
        # Statistiques par mois
        from django.db.models.functions import TruncMonth
        monthly_stats = Application.objects.annotate(
            month=TruncMonth('submission_date')
        ).values('month').annotate(count=Count('id')).order_by('month')
        
        # Programmes les plus demandés
        popular_programs = Application.objects.values('program').annotate(
            count=Count('program')
        ).order_by('-count')[:5]
        
        statistics = {
            'total_applications': total_applications,
            'status_breakdown': {item['status']: item['count'] for item in status_counts},
            'monthly_applications': [
                {
                    'month': item['month'].strftime('%Y-%m'),
                    'count': item['count']
                } for item in monthly_stats
            ],
            'popular_programs': [
                {
                    'program': item['program'],
                    'count': item['count']
                } for item in popular_programs
            ]
        }
        
        return Response(statistics)
        
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@csrf_exempt
def register_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nom = data.get("nom")
            prenom = data.get("prenom")
            email = data.get("email")
            password = data.get("password")
            password2 = data.get("password2")

            # Vérifications
            if password != password2:
                return JsonResponse({"error": "Les mots de passe ne correspondent pas"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Cet email est déjà utilisé"}, status=400)

            # Créer l'utilisateur
            user = User.objects.create_user(
                username=email,  # Utiliser l'email comme username
                email=email,
                password=password,
                first_name=prenom,
                last_name=nom
            )

            # Vérifier que le profile a été créé
            profile, created = Profile.objects.get_or_create(user=user)
            if not created:
                profile.role = "etudiant"  # S'assurer que le rôle est correct
                profile.save()

            return JsonResponse({
                "message": "Inscription réussie",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "prenom": user.first_name,
                    "nom": user.last_name,
                    "role": profile.role
                }
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Méthode non autorisée"}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            print(f"=== DEBUG BACKEND LOGIN ===")
            print(f"Email reçu: {email}")
            print(f"Password reçu: {'***' if password else 'empty'}")

            if not email or not password:
                return JsonResponse({"error": "Email et mot de passe requis"}, status=400)

            # Authentifier l'utilisateur
            user = authenticate(username=email, password=password)
            
            if user is not None:
                print(f"Utilisateur authentifié: {user.email}")
                
                # Créer ou récupérer le token
                token, created = Token.objects.get_or_create(user=user)
                print(f"Token {'créé' if created else 'récupéré'}: {token.key[:10]}...")

                # Récupérer le rôle depuis le Profile
                try:
                    profile = Profile.objects.get(user=user)
                    role = profile.role
                    print(f"Rôle trouvé dans Profile: {role}")
                except Profile.DoesNotExist:
                    print("Profile n'existe pas, création avec rôle par défaut...")
                    profile = Profile.objects.create(user=user, role="etudiant")
                    role = "etudiant"

                # Préparer les données utilisateur
                user_data = {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "prenom": user.first_name,
                    "nom": user.last_name,
                    "role": role
                }

                print(f"Données utilisateur à envoyer: {user_data}")

                # Réponse avec toutes les données nécessaires
                response_data = {
                    "message": "Connexion réussie",
                    "token": token.key,
                    "user": user_data
                }

                print(f"Réponse complète: {response_data}")
                return JsonResponse(response_data)
            else:
                print("Authentification échouée - utilisateur non trouvé ou mot de passe incorrect")
                return JsonResponse({"error": "Email ou mot de passe incorrect"}, status=401)

        except json.JSONDecodeError as e:
            print(f"Erreur JSON: {str(e)}")
            return JsonResponse({"error": "Format JSON invalide"}, status=400)
        except Exception as e:
            print(f"Erreur dans login_view: {str(e)}")
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Méthode non autorisée"}, status=405)

# Fonctions pour la gestion admin
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verify_password(request):
    current_password = request.data.get('current_password')

    if not current_password:
        return Response({'error': 'Mot de passe manquant.'}, status=400)

    user = request.user

    if not user.check_password(current_password):
        return Response({'error': 'Mot de passe incorrect.'}, status=400)

    return Response({'message': 'Mot de passe vérifié avec succès.'})

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_student(request, student_id):
    try:
        # Vérifier que l'utilisateur connecté est admin
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        # Récupérer l'utilisateur à supprimer
        user_to_delete = User.objects.get(id=student_id)
        profile_to_delete = Profile.objects.get(user=user_to_delete)
        
        # Vérifier que c'est bien un étudiant
        if profile_to_delete.role != 'etudiant':
            return Response({"error": "Impossible de supprimer un administrateur via cette fonction"}, status=400)
        
        # Supprimer l'utilisateur (le profil sera supprimé automatiquement en cascade)
        user_to_delete.delete()
        return Response({"message": "Étudiant supprimé avec succès"})
        
    except User.DoesNotExist:
        return Response({"error": "Étudiant introuvable"}, status=404)
    except Profile.DoesNotExist:
        return Response({"error": "Profil étudiant introuvable"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# Supprimer un administrateur avec toutes les sécurités
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_admin(request, admin_id):
    try:
        # Vérifier que l'utilisateur connecté est admin
        current_user_profile = Profile.objects.get(user=request.user)
        if current_user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        # Récupérer l'administrateur à supprimer
        admin_to_delete = User.objects.get(id=admin_id)
        admin_profile = Profile.objects.get(user=admin_to_delete)
        
        # Vérifier que c'est bien un administrateur
        if admin_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Cet utilisateur n'est pas un administrateur"}, status=400)
        
        # Empêcher l'admin de se supprimer lui-même
        if admin_to_delete.id == request.user.id:
            return Response({"error": "Vous ne pouvez pas vous supprimer vous-même"}, status=400)
        
        # Vérifier qu'on ne supprime pas le dernier administrateur
        admin_count = Profile.objects.filter(role__in=['admin', 'administrateur']).count()
        if admin_count <= 1:
            return Response({"error": "Impossible de supprimer le dernier administrateur du système"}, status=400)
        
        # Supprimer l'administrateur
        admin_to_delete.delete()
        return Response({"message": "Administrateur supprimé avec succès"})
        
    except User.DoesNotExist:
        return Response({"error": "Administrateur introuvable"}, status=404)
    except Profile.DoesNotExist:
        return Response({"error": "Profil administrateur introuvable"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# Ajouter un admin avec vérifications
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_admin(request):
    try:
        # Vérifier que l'utilisateur connecté est admin
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        data = request.data
        email = data.get("email", "").strip()
        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        password = data.get("password", "")

        # Validation des champs requis
        if not email or not password:
            return Response({"error": "Email et mot de passe sont obligatoires"}, status=400)
        
        if len(password) < 6:
            return Response({"error": "Le mot de passe doit contenir au moins 6 caractères"}, status=400)

        # Vérifier si l'email existe déjà
        if User.objects.filter(email=email).exists():
            return Response({"error": "Un utilisateur avec cet email existe déjà"}, status=400)
        
        # Vérifier le format de l'email
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError
        try:
            validate_email(email)
        except ValidationError:
            return Response({"error": "Format d'email invalide"}, status=400)

        # Créer le nouvel administrateur
        new_admin = User.objects.create_user(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        
        # Créer ou mettre à jour le profil avec le rôle admin
        admin_profile, created = Profile.objects.get_or_create(user=new_admin)
        admin_profile.role = 'admin'
        admin_profile.save()

        return Response({
            "message": "Administrateur créé avec succès", 
            "admin": {
                "id": new_admin.id,
                "first_name": new_admin.first_name,
                "last_name": new_admin.last_name,
                "email": new_admin.email,
                "role": admin_profile.role
            }
        }, status=201)
        
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur actuel introuvable"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# Liste des étudiants avec vérification admin
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_students(request):
    try:
        # Vérifier que l'utilisateur connecté est admin
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        students = Profile.objects.filter(role='etudiant').select_related('user').values(
            'user__id', 'user__first_name', 'user__last_name', 'user__email'
        )
        return Response(list(students))
        
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# Liste des administrateurs avec vérification admin
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_admins(request):
    try:
        # Vérifier que l'utilisateur connecté est admin
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        admins = Profile.objects.filter(role__in=['admin', 'administrateur']).select_related('user').values(
            'user__id', 'user__first_name', 'user__last_name', 'user__email'
        )
        return Response(list(admins))
        
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Met à jour le profil de l'utilisateur connecté
    """
    try:
        user = request.user
        data = request.data
        
        # Récupérer les données du formulaire
        prenom = data.get('prenom', '').strip()
        nom = data.get('nom', '').strip()
        email = data.get('email', '').strip()
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '').strip()
        
        # Validation des champs obligatoires
        if not prenom or not nom or not email:
            return Response({'error': 'Prénom, nom et email sont obligatoires'}, status=400)
        
        if not current_password:
            return Response({'error': 'Le mot de passe actuel est requis'}, status=400)
        
        # Vérifier le mot de passe actuel
        if not user.check_password(current_password):
            return Response({'error': 'Mot de passe actuel incorrect'}, status=400)
        
        # Vérifier si l'email existe déjà pour un autre utilisateur
        if User.objects.filter(email=email).exclude(id=user.id).exists():
            return Response({'error': 'Cet email est déjà utilisé par un autre utilisateur'}, status=400)
        
        # Validation de l'email
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError
        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': 'Format d\'email invalide'}, status=400)
        
        # Mettre à jour les informations utilisateur
        user.first_name = prenom
        user.last_name = nom
        user.email = email
        user.username = email  # Utiliser l'email comme username
        
        # Mettre à jour le mot de passe si fourni
        if new_password:
            if len(new_password) < 6:
                return Response({'error': 'Le nouveau mot de passe doit contenir au moins 6 caractères'}, status=400)
            user.set_password(new_password)
        
        user.save()
        
        # Retourner les informations mises à jour
        return Response({
            'message': 'Profil mis à jour avec succès',
            'user': {
                'id': user.id,
                'prenom': user.first_name,
                'nom': user.last_name,
                'email': user.email,
                'username': user.username
            }
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_profile(request):
    """
    Supprime le compte de l'utilisateur connecté
    """
    try:
        user = request.user
        
        # Vérifier que l'utilisateur n'est pas un admin (sécurité supplémentaire)
        try:
            profile = Profile.objects.get(user=user)
            if profile.role in ['admin', 'administrateur']:
                return Response({
                    'error': 'Les administrateurs ne peuvent pas supprimer leur compte via cette méthode'
                }, status=403)
        except Profile.DoesNotExist:
            # Si pas de profil, créer un profil étudiant par défaut
            Profile.objects.create(user=user, role='etudiant')
        
        # Supprimer l'utilisateur (le profil sera supprimé automatiquement via CASCADE)
        user_email = user.email
        user.delete()
        
        return Response({
            'message': f'Compte {user_email} supprimé avec succès'
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """
    Récupère les informations du profil de l'utilisateur connecté
    """
    try:
        user = request.user
        
        # Récupérer le rôle depuis le Profile
        try:
            profile = Profile.objects.get(user=user)
            role = profile.role
        except Profile.DoesNotExist:
            # Créer un profil par défaut si inexistant
            profile = Profile.objects.create(user=user, role='etudiant')
            role = 'etudiant'
        
        return Response({
            'user': {
                'id': user.id,
                'prenom': user.first_name,
                'nom': user.last_name,
                'email': user.email,
                'username': user.username,
                'role': role
            }
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)


# Vue pour changer uniquement le mot de passe
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    """
    Change uniquement le mot de passe de l'utilisateur
    """
    try:
        user = request.user
        data = request.data
        
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        confirm_password = data.get('confirm_password', '')
        
        # Validation
        if not current_password or not new_password:
            return Response({
                'error': 'Mot de passe actuel et nouveau mot de passe sont requis'
            }, status=400)
        
        if new_password != confirm_password:
            return Response({
                'error': 'Le nouveau mot de passe et sa confirmation ne correspondent pas'
            }, status=400)
        
        if len(new_password) < 6:
            return Response({
                'error': 'Le nouveau mot de passe doit contenir au moins 6 caractères'
            }, status=400)
        
        # Vérifier le mot de passe actuel
        if not user.check_password(current_password):
            return Response({'error': 'Mot de passe actuel incorrect'}, status=400)
        
        # Changer le mot de passe
        user.set_password(new_password)
        user.save()
        
        return Response({'message': 'Mot de passe modifié avec succès'})
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_programmes_v2(request):
    """
    API pour lister les programmes de la nouvelle table programmes_universites_v2
    """
    try:
        # Récupération des paramètres de filtrage
        category = request.GET.get('category', '')
        country = request.GET.get('country', '')
        page_number = request.GET.get('page', 1)
        
        # Construction de la requête de base
        queryset = ProgrammesUniversitesV2.objects.filter(is_active=True).order_by('-university_ranking')
        
        # Application des filtres
        if category:
            queryset = queryset.filter(
                Q(category__icontains=category) | 
                Q(program__icontains=category)
            )
        
        if country:
            queryset = queryset.filter(campus_city__icontains=country)
        
        # Pagination
        paginator = Paginator(queryset, 20)  # 6 programmes par page
        page_obj = paginator.get_page(page_number)
        
        # Formatage des données pour le frontend
        programs_data = []
        for program in page_obj:
            programs_data.append({
                'id': program.id,
                'universities': program.universities,
                'campus_city': program.campus_city,
                'category': program.category,
                'program': program.program,
                'degree_type': program.degree_type,
                'duration': program.duration,
                'language': program.language,
                'tuition_fees': program.tuition_fees,
                'scholarship': program.scholarship,
                'description': program.description,
                'apply_before': program.apply_before,
                'university_ranking': program.university_ranking,
                'logo': program.logo,
                'about_program': program.about_program,
                'why_program': program.why_program,
                'about_university': program.about_university,
            })
        
        return Response({
            'results': programs_data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page_obj.number,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
        })
        
    except Exception as e:
        return Response({
            'error': f'Erreur serveur: {str(e)}',
            'results': [],
            'count': 0
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_program_detail_v2(request, program_id):
    """
    API pour récupérer les détails d'un programme spécifique
    """
    try:
        program = ProgrammesUniversitesV2.objects.get(id=program_id, is_active=True)
        
        program_data = {
            'id': program.id,
            'universities': program.universities,
            'campus_city': program.campus_city,
            'category': program.category,
            'program': program.program,
            'degree_type': program.degree_type,
            'duration': program.duration,
            'language': program.language,
            'tuition_fees': program.tuition_fees,
            'scholarship': program.scholarship,
            'description': program.description,
            'apply_before': program.apply_before,
            'university_ranking': program.university_ranking,
            'logo': program.logo,
            'about_program': program.about_program,
            'why_program': program.why_program,
            'about_university': program.about_university,
        }
        
        return Response(program_data)
        
    except ProgrammesUniversitesV2.DoesNotExist:
        return Response(
            {'error': 'Programme non trouvé'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': f'Erreur serveur: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def list_programmes_v2(request):
    """
    API pour lister les programmes de la nouvelle table programmes_universites_v2
    Triés par classement université (meilleur classement en premier)
    """
    try:
        # Récupération des paramètres de filtrage
        category = request.GET.get('category', '')
        country = request.GET.get('country', '')
        page_number = request.GET.get('page', 1)
        
        # Construction de la requête de base avec tri par classement
        # Convertir university_ranking en entier pour un tri numérique correct
        queryset = ProgrammesUniversitesV2.objects.filter(is_active=True)
        
        # Tri par classement (les plus petits chiffres = meilleur classement)
        # On utilise Cast pour convertir en integer pour un tri numérique
        from django.db.models import IntegerField
        from django.db.models.functions import Cast
        
        queryset = queryset.annotate(
            ranking_int=Cast('university_ranking', IntegerField())
        ).order_by('ranking_int', 'universities')
        
        # Application des filtres
        if category:
            queryset = queryset.filter(
                Q(category__icontains=category) | 
                Q(program__icontains=category)
            )
        
        if country:
            queryset = queryset.filter(campus_city__icontains=country)
        
        # Pagination
        paginator = Paginator(queryset, 20)  # 20 programmes par page
        page_obj = paginator.get_page(page_number)
        
        # Formatage des données pour le frontend
        programs_data = []
        for program in page_obj:
            programs_data.append({
                'id': program.id,
                'universities': program.universities,
                'campus_city': program.campus_city,
                'category': program.category,
                'program': program.program,
                'degree_type': program.degree_type,
                'duration': program.duration,
                'language': program.language,
                'tuition_fees': program.tuition_fees,
                'scholarship': program.scholarship,
                'description': program.description,
                'apply_before': program.apply_before,
                'university_ranking': program.university_ranking,
                'logo': program.logo,
                'about_program': program.about_program,
                'why_program': program.why_program,
                'about_university': program.about_university,
            })
        
        return Response({
            'results': programs_data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page_obj.number,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
        })
        
    except Exception as e:
        return Response({
            'error': f'Erreur serveur: {str(e)}',
            'results': [],
            'count': 0
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)









# AJOUTEZ cette nouvelle vue à votre views.py existant :

@api_view(['GET'])
@permission_classes([AllowAny])
def get_program_detail_with_similar(request, program_id):
    """
    API pour récupérer les détails d'un programme avec programmes similaires
    """
    try:
        # Récupérer le programme principal
        program = ProgrammesUniversitesV2.objects.get(id=program_id, is_active=True)
        
        # Récupérer les programmes similaires
        similar_programs = ProgrammesUniversitesV2.objects.filter(
            category=program.category,
            is_active=True
        ).exclude(id=program_id)[:6]
        
        # Formatage identique à votre vue existante
        program_data = {
            'id': program.id,
            'universities': program.universities,
            'campus_city': program.campus_city,
            'category': program.category,
            'program': program.program,
            'degree_type': program.degree_type,
            'duration': program.duration,
            'language': program.language,
            'tuition_fees': program.tuition_fees,
            'scholarship': program.scholarship,
            'description': program.description,
            'apply_before': program.apply_before,
            'university_ranking': program.university_ranking,
            'logo': program.logo,
            'about_program': program.about_program,
            'why_program': program.why_program,
            'about_university': program.about_university,
        }
        
        # Programmes similaires
        similar_programs_data = []
        for similar in similar_programs:
            similar_programs_data.append({
                'id': similar.id,
                'universities': similar.universities,
                'campus_city': similar.campus_city,
                'category': similar.category,
                'program': similar.program,
                'logo': similar.logo,
            })
        
        return Response({
            'program': program_data,
            'similar_programs': similar_programs_data
        })
        
    except ProgrammesUniversitesV2.DoesNotExist:
        return Response({'error': 'Programme non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Erreur serveur: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_orientation_test(request):
    """
    Sauvegarde les résultats d'un test d'orientation
    """
    try:
        data = request.data
        
        # Validation des données requises
        required_fields = ['answers', 'raw_scores', 'max_scores', 'normalized_scores', 'pillar_keys']
        for field in required_fields:
            if field not in data:
                return Response({'error': f'Le champ {field} est requis'}, status=400)
        
        # Créer ou mettre à jour le test d'orientation pour cet utilisateur
        orientation_test, created = OrientationTest.objects.update_or_create(
            user=request.user,
            defaults={
                'answers': data['answers'],
                'raw_scores': data['raw_scores'],
                'max_scores': data['max_scores'],
                'normalized_scores': data['normalized_scores'],
                'pillar_keys': data['pillar_keys'],
                'completed_at': timezone.now(),
            }
        )
        
        return Response({
            'message': 'Résultats du test sauvegardés avec succès',
            'test_id': orientation_test.id,
            'completed_at': orientation_test.completed_at.isoformat(),
            'created': created  # True si nouveau test, False si mise à jour
        }, status=201 if created else 200)
        
    except Exception as e:
        print(f"Erreur lors de la sauvegarde du test d'orientation: {e}")
        return Response({'error': 'Erreur lors de la sauvegarde des résultats'}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_orientation_test_results(request):
    """
    Récupère les derniers résultats du test d'orientation de l'utilisateur
    """
    try:
        # Chercher le dernier test de l'utilisateur
        orientation_test = OrientationTest.objects.filter(user=request.user).first()
        
        if not orientation_test:
            return Response({'message': 'Aucun test d\'orientation trouvé'}, status=404)
        
        test_data = {
            'id': orientation_test.id,
            'answers': orientation_test.answers,
            'raw_scores': orientation_test.raw_scores,
            'max_scores': orientation_test.max_scores,
            'normalized_scores': orientation_test.normalized_scores,
            'pillar_keys': orientation_test.pillar_keys,
            'completed_at': orientation_test.completed_at.isoformat(),
            'total_questions': orientation_test.total_questions,
            'is_recent': orientation_test.is_recent,
            'top_results': orientation_test.get_top_results(3)
        }
        
        return Response(test_data)
        
    except Exception as e:
        print(f"Erreur lors de la récupération des résultats: {e}")
        return Response({'error': 'Erreur lors de la récupération des résultats'}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_all_orientation_tests(request):
    """
    Récupère tous les tests d'orientation de l'utilisateur (historique)
    """
    try:
        tests = OrientationTest.objects.filter(user=request.user).order_by('-completed_at')
        
        tests_data = []
        for test in tests:
            tests_data.append({
                'id': test.id,
                'completed_at': test.completed_at.isoformat(),
                'total_questions': test.total_questions,
                'is_recent': test.is_recent,
                'top_results': test.get_top_results(3)
            })
        
        return Response({
            'tests': tests_data,
            'total_count': len(tests_data)
        })
        
    except Exception as e:
        print(f"Erreur lors de la récupération de l'historique: {e}")
        return Response({'error': 'Erreur lors de la récupération de l\'historique'}, status=500)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_orientation_test(request, test_id):
    """
    Supprime un test d'orientation spécifique
    """
    try:
        test = OrientationTest.objects.get(id=test_id, user=request.user)
        test.delete()
        
        return Response({
            'message': 'Test d\'orientation supprimé avec succès'
        })
        
    except OrientationTest.DoesNotExist:
        return Response({'error': 'Test d\'orientation introuvable'}, status=404)
    except Exception as e:
        print(f"Erreur lors de la suppression du test: {e}")
        return Response({'error': 'Erreur lors de la suppression du test'}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_orientation_test_stats(request):
    """
    Récupère les statistiques des tests d'orientation (admin uniquement)
    """
    try:
        # Vérifier que l'utilisateur est admin
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        from django.db.models import Count, Avg
        from django.db.models.functions import TruncMonth
        
        # Statistiques générales
        total_tests = OrientationTest.objects.count()
        total_users_tested = OrientationTest.objects.values('user').distinct().count()
        
        # Tests par mois
        monthly_tests = OrientationTest.objects.annotate(
            month=TruncMonth('completed_at')
        ).values('month').annotate(count=Count('id')).order_by('month')
        
        # Moyenne des questions répondues
        avg_questions = OrientationTest.objects.aggregate(
            avg_questions=Avg('total_questions')
        )['avg_questions'] or 0
        
        # Tests récents (derniers 30 jours)
        from datetime import timedelta
        recent_tests = OrientationTest.objects.filter(
            completed_at__gte=timezone.now() - timedelta(days=30)
        ).count()
        
        # Utilisateurs les plus actifs
        top_users = OrientationTest.objects.values(
            'user__first_name', 'user__last_name', 'user__email'
        ).annotate(
            test_count=Count('id')
        ).order_by('-test_count')[:10]
        
        stats = {
            'total_tests': total_tests,
            'total_users_tested': total_users_tested,
            'recent_tests': recent_tests,
            'average_questions_answered': round(avg_questions, 1),
            'monthly_breakdown': [
                {
                    'month': item['month'].strftime('%Y-%m'),
                    'count': item['count']
                } for item in monthly_tests
            ],
            'top_users': [
                {
                    'name': f"{item['user__first_name']} {item['user__last_name']}".strip() or item['user__email'],
                    'email': item['user__email'],
                    'test_count': item['test_count']
                } for item in top_users
            ]
        }
        
        return Response(stats)
        
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        print(f"Erreur lors de la récupération des statistiques: {e}")
        return Response({'error': 'Erreur lors de la récupération des statistiques'}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_orientation_history(request, user_id):
    """
    Récupère l'historique des tests d'orientation d'un utilisateur spécifique (admin uniquement)
    """
    try:
        # Vérifier que l'utilisateur est admin
        user_profile = Profile.objects.get(user=request.user)
        if user_profile.role not in ['admin', 'administrateur']:
            return Response({"error": "Permission refusée - Accès admin requis"}, status=403)
        
        from django.contrib.auth.models import User
        target_user = User.objects.get(id=user_id)
        
        tests = OrientationTest.objects.filter(user=target_user).order_by('-completed_at')
        
        tests_data = []
        for test in tests:
            tests_data.append({
                'id': test.id,
                'completed_at': test.completed_at.isoformat(),
                'total_questions': test.total_questions,
                'is_recent': test.is_recent,
                'top_results': test.get_top_results(3),
                'user_name': test.user_full_name
            })
        
        return Response({
            'user': {
                'id': target_user.id,
                'name': target_user.get_full_name() or target_user.username,
                'email': target_user.email
            },
            'tests': tests_data,
            'total_count': len(tests_data)
        })
        
    except User.DoesNotExist:
        return Response({"error": "Utilisateur introuvable"}, status=404)
    except Profile.DoesNotExist:
        return Response({"error": "Profil utilisateur introuvable"}, status=404)
    except Exception as e:
        print(f"Erreur lors de la récupération de l'historique utilisateur: {e}")
        return Response({'error': 'Erreur lors de la récupération de l\'historique'}, status=500)
    
@login_required
def google_auth_callback(request):
    """
    Handle Google OAuth callback and redirect to frontend with authentication data
    """
    user = request.user
    
    if user.is_authenticated:
        try:
            # Create or get authentication token
            token, created = Token.objects.get_or_create(user=user)
            
            # Create or get user profile
            profile, profile_created = Profile.objects.get_or_create(
                user=user, 
                defaults={'role': 'etudiant'}
            )
            
            # Get redirect path from session (set in frontend)
            redirect_path = request.session.get('google_redirect_path', '/welcome-etudiant')
            
            # Prepare user data for frontend
            user_data = {
                'token': token.key,
                'user_id': user.id,
                'email': user.email,
                'prenom': user.first_name or '',
                'nom': user.last_name or '',
                'role': profile.role,
                'redirect_path': redirect_path
            }
            
            # Build query parameters
            query_params = urllib.parse.urlencode(user_data)
            
            # Redirect to React callback page
            frontend_callback_url = f"http://localhost:3000/google-auth-callback?{query_params}"
            
            # Clear the redirect path from session
            if 'google_redirect_path' in request.session:
                del request.session['google_redirect_path']
                
            return redirect(frontend_callback_url)
            
        except Exception as e:
            # Handle any errors during authentication
            error_url = f"http://localhost:3000/login?error={urllib.parse.quote('Authentication failed. Please try again.')}"
            return redirect(error_url)
    
    # If user is not authenticated, redirect to login
    return redirect('http://localhost:3000/login?error=Authentication%20failed')


@api_view(['POST'])
@permission_classes([AllowAny])
def set_google_redirect_path(request):
    """
    API endpoint to set redirect path before Google OAuth
    """
    redirect_path = request.data.get('redirect_path', '/welcome-etudiant')
    request.session['google_redirect_path'] = redirect_path
    return JsonResponse({'success': True, 'redirect_path': redirect_path})
