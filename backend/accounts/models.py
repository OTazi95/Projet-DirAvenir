from django.db import models

class ProgrammesUniversites(models.Model):
    filiere = models.CharField(max_length=255)
    universite = models.CharField(max_length=255)
    description = models.TextField()
    pays = models.CharField(max_length=100)
    logo = models.CharField(max_length=191, null=True, blank=True)

class Meta:
        db_table = 'programmes_universites'








# models.py - Modèles Django pour le système d'orientation
from django.db import models
from django.contrib.auth.models import User
import json

class Major(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    
    # Piliers d'Intérêts
    interet_scientifique_tech = models.IntegerField(default=0)
    interet_artistique_creatif = models.IntegerField(default=0)
    interet_social_humain = models.IntegerField(default=0)
    interet_business_gestion = models.IntegerField(default=0)
    interet_logique_analytique = models.IntegerField(default=0)
    
    # Piliers de Compétences
    competence_resolution_problemes = models.IntegerField(default=0)
    competence_communication = models.IntegerField(default=0)
    competence_organisation = models.IntegerField(default=0)
    competence_manuel_technique = models.IntegerField(default=0)
    
    # Piliers de Valeurs / Motivations
    valeur_impact_societal = models.IntegerField(default=0)
    valeur_innovation_challenge = models.IntegerField(default=0)
    valeur_stabilite_securite = models.IntegerField(default=0)
    valeur_autonomie = models.IntegerField(default=0)
    
    # Piliers de Préférence de Travail / Personnalité
    pref_travail_equipe_collab = models.IntegerField(default=0)
    pref_travail_autonome = models.IntegerField(default=0)
    pref_pratique_terrain = models.IntegerField(default=0)
    pref_theorie_recherche = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Majeure"
        verbose_name_plural = "Majeures"

class OrientationTest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    # Stocker les réponses au format JSON
    answers = models.JSONField(default=dict)
    
    # Profil calculé
    interet_scientifique_tech = models.IntegerField(default=0)
    interet_artistique_creatif = models.IntegerField(default=0)
    interet_social_humain = models.IntegerField(default=0)
    interet_business_gestion = models.IntegerField(default=0)
    interet_logique_analytique = models.IntegerField(default=0)
    competence_resolution_problemes = models.IntegerField(default=0)
    competence_communication = models.IntegerField(default=0)
    competence_organisation = models.IntegerField(default=0)
    competence_manuel_technique = models.IntegerField(default=0)
    valeur_impact_societal = models.IntegerField(default=0)
    valeur_innovation_challenge = models.IntegerField(default=0)
    valeur_stabilite_securite = models.IntegerField(default=0)
    valeur_autonomie = models.IntegerField(default=0)
    pref_travail_equipe_collab = models.IntegerField(default=0)
    pref_travail_autonome = models.IntegerField(default=0)
    pref_pratique_terrain = models.IntegerField(default=0)
    pref_theorie_recherche = models.IntegerField(default=0)
    
    # Métadonnées
    completed_at = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"Test - {self.user.username if self.user else self.session_id}"

    class Meta:
        verbose_name = "Test d'Orientation"
        verbose_name_plural = "Tests d'Orientation"

class TestResult(models.Model):
    test = models.ForeignKey(OrientationTest, on_delete=models.CASCADE, related_name='results')
    major = models.ForeignKey(Major, on_delete=models.CASCADE)
    match_percentage = models.IntegerField()
    rank = models.IntegerField()  # 1 = meilleur match, 2 = deuxième, etc.
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.test} - {self.major.name} ({self.match_percentage}%)"

    class Meta:
        verbose_name = "Résultat de Test"
        verbose_name_plural = "Résultats de Test"
        ordering = ['rank']