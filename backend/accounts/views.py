from rest_framework.decorators import api_view, authentication_classes, permission_classes, api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from .models import ProgrammesUniversites
from .serializers import ProgrammesUniversitesSerializer  

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




# views.py - Vues API Django
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
import json
import math

from .models import Major, OrientationTest, TestResult
from .serializers import MajorSerializer, OrientationTestSerializer, TestResultSerializer

# Configuration des scores selon le PDF
PILLAR_SCORING = {
    'q1': {
        'A': {'interet_scientifique_tech': 5, 'interet_artistique_creatif': 3, 'valeur_innovation_challenge': 4, 'competence_manuel_technique': 2},
        'B': {'interet_scientifique_tech': 4, 'interet_logique_analytique': 5, 'competence_resolution_problemes': 4, 'pref_theorie_recherche': 3},
        'C': {'interet_social_humain': 5, 'valeur_impact_societal': 5, 'competence_communication': 4},
        'D': {'interet_business_gestion': 5, 'competence_organisation': 5, 'pref_travail_equipe_collab': 3},
        'E': {'interet_artistique_creatif': 5, 'valeur_innovation_challenge': 2, 'pref_travail_autonome': 3}
    },
    'q2': {
        'tech': {'interet_scientifique_tech': 3, 'valeur_innovation_challenge': 2},
        'art': {'interet_artistique_creatif': 3},
        'social': {'interet_social_humain': 3, 'valeur_impact_societal': 2},
        'business': {'interet_business_gestion': 3},
        'organization': {'competence_organisation': 3},
        'manual': {'competence_manuel_technique': 3}
    },
    'q3': {
        'A': {'interet_scientifique_tech': 3, 'competence_manuel_technique': 2},
        'B': {'interet_logique_analytique': 3, 'pref_theorie_recherche': 2},
        'C': {'interet_artistique_creatif': 3},
        'D': {'interet_social_humain': 3},
        'E': {'interet_business_gestion': 3, 'interet_artistique_creatif': 2}
    },
    'q4': {
        'A': {'competence_resolution_problemes': 4, 'interet_logique_analytique': 4},
        'B': {'interet_scientifique_tech': 3, 'interet_logique_analytique': 3, 'pref_theorie_recherche': 2},
        'C': {'interet_artistique_creatif': 4, 'valeur_innovation_challenge': 4},
        'D': {'competence_communication': 4, 'pref_travail_equipe_collab': 4, 'interet_social_humain': 2}
    },
    'q5': {
        'budget': {'interet_business_gestion': 1, 'competence_organisation': 1, 'interet_logique_analytique': 1},
        'event': {'competence_organisation': 1, 'pref_travail_equipe_collab': 1, 'competence_communication': 1},
        'write': {'competence_communication': 1, 'interet_artistique_creatif': 1},
        'repair': {'competence_manuel_technique': 1, 'interet_scientifique_tech': 1},
        'draw': {'interet_artistique_creatif': 1, 'competence_manuel_technique': 1},
        'equation': {'interet_logique_analytique': 1, 'interet_scientifique_tech': 1},
        'convince': {'competence_communication': 1, 'interet_business_gestion': 1},
        'counsel': {'interet_social_humain': 1, 'competence_communication': 1}
    },
    'q6': {
        'A': {'pref_theorie_recherche': 4, 'interet_logique_analytique': 3},
        'B': {'interet_scientifique_tech': 3},
        'C': {'competence_manuel_technique': 4, 'pref_pratique_terrain': 4},
        'D': {'competence_communication': 4, 'pref_travail_equipe_collab': 4}
    },
    'q7': {
        'A': {'valeur_impact_societal': 5, 'interet_social_humain': 4},
        'B': {'valeur_innovation_challenge': 4, 'interet_scientifique_tech': 3},
        'C': {'interet_artistique_creatif': 5},
        'D': {'valeur_impact_societal': 5, 'interet_social_humain': 3}
    },
    'q8': {
        'A': {'pref_theorie_recherche': 4, 'interet_scientifique_tech': 3},
        'B': {'pref_travail_equipe_collab': 4, 'interet_business_gestion': 2},
        'C': {'interet_artistique_creatif': 4, 'competence_manuel_technique': 3},
        'D': {'pref_pratique_terrain': 4, 'competence_manuel_technique': 3},
        'E': {'pref_travail_autonome': 4, 'pref_theorie_recherche': 2}
    },
    'q9': {
        'security': {'valeur_stabilite_securite': 1},
        'innovation': {'valeur_innovation_challenge': 1},
        'autonomy': {'valeur_autonomie': 1},
        'salary': {'interet_business_gestion': 1}
    },
    'q10': {
        'A': {'interet_logique_analytique': 4, 'competence_resolution_problemes': 3},
        'B': {'pref_pratique_terrain': 4, 'competence_resolution_problemes': 3},
        'C': {'competence_communication': 4, 'pref_travail_equipe_collab': 3},
        'D': {'valeur_innovation_challenge': 4, 'interet_scientifique_tech': 3}
    },
    'q11': {
        'A': {'pref_travail_autonome': 5, 'valeur_autonomie': 4},
        'B': {'pref_travail_equipe_collab': 5},
        'C': {'valeur_stabilite_securite': 4, 'competence_organisation': 3}
    },
    'q12': {
        'A': {'competence_organisation': 4, 'interet_logique_analytique': 3},
        'B': {'competence_communication': 4, 'interet_artistique_creatif': 3},
        'C': {'competence_communication': 4, 'interet_social_humain': 3, 'pref_travail_equipe_collab': 2}
    },
    'q13': {
        'A': {'interet_logique_analytique': 5},
        'B': {'interet_artistique_creatif': 4, 'pref_travail_autonome': 3},
        'C': {'interet_social_humain': 4, 'pref_travail_equipe_collab': 3}
    },
    'q14': {
        'sciences': {'interet_scientifique_tech': 4, 'interet_logique_analytique': 4},
        'literature': {'interet_social_humain': 3, 'competence_communication': 3},
        'social_sciences': {'interet_social_humain': 4, 'pref_theorie_recherche': 2},
        'arts': {'interet_artistique_creatif': 4},
        'technology': {'interet_scientifique_tech': 4, 'interet_logique_analytique': 3},
        'management': {'interet_business_gestion': 4, 'competence_organisation': 3}
    }
}

MAX_SCORES = {
    'interet_scientifique_tech': 25,
    'interet_artistique_creatif': 21,
    'interet_social_humain': 20,
    'interet_business_gestion': 18,
    'interet_logique_analytique': 20,
    'competence_resolution_problemes': 15,
    'competence_communication': 16,
    'competence_organisation': 14,
    'competence_manuel_technique': 12,
    'valeur_impact_societal': 17,
    'valeur_innovation_challenge': 17,
    'valeur_stabilite_securite': 5,
    'valeur_autonomie': 14,
    'pref_travail_equipe_collab': 13,
    'pref_travail_autonome': 14,
    'pref_pratique_terrain': 8,
    'pref_theorie_recherche': 10
}

def calculate_user_profile(answers):
    """Calcule le profil utilisateur basé sur les réponses"""
    profile = {pillar: 0 for pillar in MAX_SCORES.keys()}
    
    for question_id, answer in answers.items():
        scoring = PILLAR_SCORING.get(question_id, {})
        
        if answer['type'] == 'single':
            scores = scoring.get(answer['value'], {})
            for pillar, points in scores.items():
                if pillar in profile:
                    profile[pillar] += points
                    
        elif answer['type'] == 'multiple':
            for selected_id in answer['value']:
                scores = scoring.get(selected_id, {})
                for pillar, points in scores.items():
                    if pillar in profile:
                        profile[pillar] += points
                        
        elif answer['type'] == 'ranking':
            for option_id, rank in answer['value'].items():
                scores = scoring.get(option_id, {})
                multiplier = 4 if rank == 1 else 3 if rank == 2 else 2
                for pillar, points in scores.items():
                    if pillar in profile:
                        profile[pillar] += points * multiplier
                        
        elif answer['type'] == 'slider':
            for option_id, value in answer['value'].items():
                scores = scoring.get(option_id, {})
                for pillar, points in scores.items():
                    if pillar in profile:
                        profile[pillar] += value
    
    # Normaliser sur 100
    for pillar in profile:
        max_score = MAX_SCORES.get(pillar, 20)
        profile[pillar] = min(100, max(0, round((profile[pillar] / max_score) * 100)))
    
    return profile

def calculate_major_matches(user_profile):
    """Calcule la correspondance avec toutes les majeures"""
    majors = Major.objects.all()
    results = []
    
    for major in majors:
        major_profile = {
            'interet_scientifique_tech': major.interet_scientifique_tech,
            'interet_artistique_creatif': major.interet_artistique_creatif,
            'interet_social_humain': major.interet_social_humain,
            'interet_business_gestion': major.interet_business_gestion,
            'interet_logique_analytique': major.interet_logique_analytique,
            'competence_resolution_problemes': major.competence_resolution_problemes,
            'competence_communication': major.competence_communication,
            'competence_organisation': major.competence_organisation,
            'competence_manuel_technique': major.competence_manuel_technique,
            'valeur_impact_societal': major.valeur_impact_societal,
            'valeur_innovation_challenge': major.valeur_innovation_challenge,
            'valeur_stabilite_securite': major.valeur_stabilite_securite,
            'valeur_autonomie': major.valeur_autonomie,
            'pref_travail_equipe_collab': major.pref_travail_equipe_collab,
            'pref_travail_autonome': major.pref_travail_autonome,
            'pref_pratique_terrain': major.pref_pratique_terrain,
            'pref_theorie_recherche': major.pref_theorie_recherche
        }
        
        # Calcul de la distance euclidienne pondérée
        total_distance = 0
        weight_sum = 0
        
        for pillar, ideal_score in major_profile.items():
            user_score = user_profile.get(pillar, 0)
            diff = abs(user_score - ideal_score)
            weight = ideal_score
            
            total_distance += (diff * weight) ** 2
            weight_sum += weight ** 2
        
        if weight_sum > 0:
            distance = math.sqrt(total_distance / weight_sum)
            match_percentage = max(0, round(100 - distance))
        else:
            match_percentage = 0
            
        results.append({
            'major': major,
            'percentage': match_percentage,
            'distance': distance if weight_sum > 0 else float('inf')
        })
    
    # Trier par pourcentage décroissant
    results.sort(key=lambda x: x['percentage'], reverse=True)
    
    return results

@csrf_exempt
@api_view(['POST'])
def submit_test(request):
    """Soumet un test d'orientation et retourne les résultats"""
    try:
        data = json.loads(request.body)
        answers = data.get('answers', {})
        session_id = data.get('session_id')
        
        # Calculer le profil utilisateur
        user_profile = calculate_user_profile(answers)
        
        # Créer l'objet test
        test = OrientationTest.objects.create(
            user=request.user if request.user.is_authenticated else None,
            answers=answers,
            session_id=session_id,
            **user_profile
        )
        
        # Calculer les correspondances avec les majeures
        matches = calculate_major_matches(user_profile)
        
        # Sauvegarder les résultats
        for i, match in enumerate(matches):
            TestResult.objects.create(
                test=test,
                major=match['major'],
                match_percentage=match['percentage'],
                rank=i + 1
            )
        
        # Préparer la réponse
        top_results = matches[:5]  # Top 5
        response_data = {
            'test_id': test.id,
            'user_profile': user_profile,
            'recommendations': [
                {
                    'major': result['major'].name,
                    'description': result['major'].description,
                    'percentage': result['percentage'],
                    'rank': i + 1
                }
                for i, result in enumerate(top_results)
            ]
        }
        
        return Response(response_data, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def get_majors(request):
    """Récupère toutes les majeures disponibles"""
    majors = Major.objects.all()
    serializer = MajorSerializer(majors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_test_results(request, test_id):
    """Récupère les résultats d'un test spécifique"""
    try:
        test = OrientationTest.objects.get(id=test_id)
        results = TestResult.objects.filter(test=test)[:5]  # Top 5
        
        user_profile = {
            'interet_scientifique_tech': test.interet_scientifique_tech,
            'interet_artistique_creatif': test.interet_artistique_creatif,
            'interet_social_humain': test.interet_social_humain,
            'interet_business_gestion': test.interet_business_gestion,
            'interet_logique_analytique': test.interet_logique_analytique,
            'competence_resolution_problemes': test.competence_resolution_problemes,
            'competence_communication': test.competence_communication,
            'competence_organisation': test.competence_organisation,
            'competence_manuel_technique': test.competence_manuel_technique,
            'valeur_impact_societal': test.valeur_impact_societal,
            'valeur_innovation_challenge': test.valeur_innovation_challenge,
            'valeur_stabilite_securite': test.valeur_stabilite_securite,
            'valeur_autonomie': test.valeur_autonomie,
            'pref_travail_equipe_collab': test.pref_travail_equipe_collab,
            'pref_travail_autonome': test.pref_travail_autonome,
            'pref_pratique_terrain': test.pref_pratique_terrain,
            'pref_theorie_recherche': test.pref_theorie_recherche
        }
        
        response_data = {
            'test_id': test.id,
            'user_profile': user_profile,
            'recommendations': TestResultSerializer(results, many=True).data
        }
        
        return Response(response_data)
        
    except OrientationTest.DoesNotExist:
        return Response(
            {'error': 'Test not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )



