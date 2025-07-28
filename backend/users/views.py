from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

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

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        if user is not None:
            return Response({
                'message': 'Connexion réussie',
                'nom': user.last_name,
                'prenom': user.first_name
            }, status=200)
        return Response({'error': 'Email ou mot de passe incorrect'}, status=400)