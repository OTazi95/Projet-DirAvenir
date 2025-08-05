from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ProgrammesUniversites

class UpdateProfileSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    prenom = serializers.CharField(required=False)
    nom = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False)


class ProgrammesUniversitesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammesUniversites
        fields = '__all__'