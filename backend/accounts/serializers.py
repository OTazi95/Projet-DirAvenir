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
    logo_url = serializers.SerializerMethodField()
    class Meta:
        model = ProgrammesUniversites
        fields = '__all__'

        def get_logo_url(self, obj):
         request = self.context.get('request')
         if obj.logo:
            # suppose que obj.logo contient "logo/nom_du_fichier.png"
            return request.build_absolute_uri('/media/' + obj.logo)
         return None
         




