from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import UpdateProfileSerializer

class UpdateProfileView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user = authenticate(username=request.user.username, password=data.get('current_password'))
        if user is None:
            return Response({'error': 'Mot de passe actuel incorrect'}, status=400)

        if 'prenom' in data:
            user.first_name = data['prenom']
        if 'nom' in data:
            user.last_name = data['nom']
        if 'email' in data:
            user.email = data['email']
            user.username = data['email']
        if 'password' in data and data['password']:
            user.set_password(data['password'])
        user.save()

        return Response({'message': 'Profil mis à jour'})

class DeleteAccountView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user = authenticate(username=request.user.username, password=data.get('current_password'))
        if user is None:
            return Response({'error': 'Mot de passe actuel incorrect'}, status=400)

        user.delete()
        return Response({'message': 'Compte supprimé'})
