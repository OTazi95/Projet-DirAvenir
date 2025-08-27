from rest_framework.decorators import api_view, authentication_classes, permission_classes, api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
import json
from accounts.models import Profile


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

# accounts/views.py

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.db.models import Q
from .models import ProgrammesUniversitesV2

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

# Gardez vos autres vues existantes ici...


from django.db.models import Q, IntegerField
from django.db.models.functions import Cast

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




