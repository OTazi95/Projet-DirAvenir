from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Major, OrientationTest, TestResult


class UpdateProfileSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    prenom = serializers.CharField(required=False)
    nom = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False)



         









# serializers.py - Serializers Django REST Framework


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'

class OrientationTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrientationTest
        fields = '__all__'

class TestResultSerializer(serializers.ModelSerializer):
    major_name = serializers.CharField(source='major.name', read_only=True)
    major_description = serializers.CharField(source='major.description', read_only=True)
    
    class Meta:
        model = TestResult
        fields = ['major', 'major_name', 'major_description', 'match_percentage', 'rank']