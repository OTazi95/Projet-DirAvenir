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


@csrf_exempt
def get_programmes_universites(request):
    if request.method == 'GET':
        filiere = request.GET.get('filiere', None)
        pays = request.GET.get('pays', None)

        query = "SELECT * FROM programmes_universites WHERE 1=1"
        params = []

        if filiere:
            query += " AND filiere = %s"
            params.append(filiere)

        if pays:
            query += " AND pays = %s"
            params.append(pays)

        with connection.cursor() as cursor:
            cursor.execute(query, params)
            rows = cursor.fetchall()

        result = []
        for row in rows:
            result.append({
                'id': row[0],
                'filiere': row[1],
                'universite': row[2],
                'description': row[3],
                'pays': row[4]
            })

        return JsonResponse(result, safe=False)
    
class ProgramPagination(PageNumberPagination):
    page_size = 12  # Nombre de programmes par page (ajuste selon ton design)
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET'])
@permission_classes([])
def list_programmes(request):
    paginator = PageNumberPagination()
    paginator.page_size = 12

    programmes = ProgrammesUniversites.objects.all()
    result_page = paginator.paginate_queryset(programmes, request)
    data = [
        {
            'id': prog.id,
            'filiere': prog.filiere,
            'universite': prog.universite,
            'description': prog.description,
            'pays': prog.pays
        }
        for prog in result_page
    ]
    return paginator.get_paginated_response(data)