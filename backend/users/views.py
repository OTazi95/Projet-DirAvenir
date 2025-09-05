from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
import os
from django.http import JsonResponse
from django.conf import settings

def list_logos(request):
    logos_dir = os.path.join(settings.MEDIA_ROOT, "logo")
    files = []
    if os.path.exists(logos_dir):
        files = [
            f"{file}"
            for file in os.listdir(logos_dir)
            if os.path.isfile(os.path.join(logos_dir, file))
        ]
    return JsonResponse({"logos": files})


class RegisterView(APIView):
   permission_classes = [AllowAny]

   def post(self, request):
        nom = request.data.get('nom')
        prenom = request.data.get('prenom')
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if not all([nom, prenom, email, password, password2]):
            return Response({'error': 'Tous les champs sont obligatoires'}, status=400)

        if password != password2:
            return Response({'error': 'Les mots de passe ne correspondent pas'}, status=400)

        if User.objects.filter(username=email).exists():
            return Response({'error': 'Cet utilisateur existe déjà'}, status=400)

        user = User.objects.create_user(username=email, email=email, password=password, first_name=prenom, last_name=nom)
        return Response({'message': 'Utilisateur créé avec succès'}, status=201)




