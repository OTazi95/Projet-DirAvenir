from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
import json

class Profile(models.Model):
    ROLE_CHOICES = [
        ("etudiant", "Étudiant"),
        ("admin", "Administrateur"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="etudiant")

    def __str__(self):
        return f"{self.user.username} - {self.role}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
     instance.profile.save()
    except Profile.DoesNotExist:
     Profile.objects.create(user=instance)

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


class ProgrammesUniversitesV2(models.Model):
    """Nouvelle base de données des programmes universitaires"""
    
    # Champs principaux
    campus_city = models.CharField(max_length=255, verbose_name="Campus/Ville")
    universities = models.CharField(max_length=255, verbose_name="Université")
    apply_before = models.CharField(max_length=100, verbose_name="Date limite candidature")
    university_ranking = models.CharField(max_length=100, verbose_name="Classement université")
    category = models.CharField(max_length=255, verbose_name="Catégorie")
    program = models.CharField(max_length=255, verbose_name="Programme")
    degree_type = models.CharField(max_length=100, verbose_name="Type de diplôme")
    tuition_fees = models.CharField(max_length=255, verbose_name="Frais de scolarité")
    duration = models.CharField(max_length=100, verbose_name="Durée")
    language = models.CharField(max_length=100, verbose_name="Langue")
    scholarship = models.CharField(max_length=255, verbose_name="Bourse")
    description = models.TextField(verbose_name="Description")
    about_program = models.TextField(verbose_name="À propos du programme")
    why_program = models.TextField(verbose_name="Pourquoi ce programme")
    about_university = models.TextField(verbose_name="À propos de l'université")
    logo = models.CharField(max_length=255, null=True, blank=True, verbose_name="Logo")
    
    # Métadonnées
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True, verbose_name="Actif")

    class Meta:
        db_table = 'programmes_universites_v2'
        verbose_name = "Programme Universitaire V2"
        verbose_name_plural = "Programmes Universitaires V2"
        indexes = [
            models.Index(fields=['universities', 'category']),    
            models.Index(fields=['campus_city']),               
            models.Index(fields=['degree_type']),                
            models.Index(fields=['is_active']),                  
        ]

    def __str__(self):
        return f"{self.program} - {self.universities} ({self.campus_city})"  

    @property
    def has_scholarship(self):
        return self.scholarship and self.scholarship.lower() not in ['no', 'none', 'n/a', 'non']
    

class Application(models.Model):
    STATUS_CHOICES = [
        ('sent', 'Envoyée'),
        ('reviewing', 'En cours d\'examen'),
        ('approved', 'Approuvée'),
        ('rejected', 'Rejetée'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    program = models.CharField(max_length=200)
    university = models.CharField(max_length=200)
    submission_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='sent')
    
    # Stockage des données du formulaire en JSON
    form_data = models.JSONField(default=dict)
    
    # Métadonnées additionnelles
    application_id = models.CharField(max_length=10, unique=True)
    notes = models.TextField(blank=True, null=True)
    reviewed_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='reviewed_applications'
    )
    reviewed_date = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-submission_date']
        
    def __str__(self):
        return f"Application {self.application_id} - {self.user.get_full_name()}"
    
    @property
    def user_name(self):
        return f"{self.user.first_name} {self.user.last_name}"
    
    @property
    def user_email(self):
        return self.user.email
    
class OrientationTest(models.Model):
    """
    Modèle pour stocker les résultats des tests d'orientation des utilisateurs
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orientation_tests')
    
    # Données du test
    answers = models.JSONField(help_text="Réponses complètes au test d'orientation")
    raw_scores = models.JSONField(help_text="Scores bruts calculés")
    max_scores = models.JSONField(help_text="Scores maximum théoriques")
    normalized_scores = models.JSONField(help_text="Scores normalisés de 0 à 100")
    pillar_keys = models.JSONField(help_text="Clés des piliers utilisés")
    
    # Métadonnées
    completed_at = models.DateTimeField(default=timezone.now, help_text="Date et heure de completion du test")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Champs calculés pour faciliter les requêtes
    total_questions = models.IntegerField(default=0, help_text="Nombre total de questions répondues")
    completion_time_seconds = models.IntegerField(null=True, blank=True, help_text="Temps de completion en secondes")
    
    class Meta:
        ordering = ['-completed_at']
        verbose_name = "Test d'orientation"
        verbose_name_plural = "Tests d'orientation"
    
    def __str__(self):
        return f"Test de {self.user.get_full_name() or self.user.username} - {self.completed_at.strftime('%d/%m/%Y %H:%M')}"
    
    @property
    def user_full_name(self):
        """Retourne le nom complet de l'utilisateur"""
        return self.user.get_full_name() or self.user.username
    
    @property
    def is_recent(self):
        """Vérifie si le test a été passé dans les 30 derniers jours"""
        from django.utils import timezone
        from datetime import timedelta
        return self.completed_at >= timezone.now() - timedelta(days=30)
    
    def get_top_results(self, limit=3):
        
        example_results = [
            {'major': 'Informatique', 'score': 85},
            {'major': 'Ingénierie', 'score': 78},
            {'major': 'Sciences', 'score': 72}
        ]
        return example_results[:limit]
    
    def save(self, *args, **kwargs):
        """Override save pour calculer automatiquement certains champs"""
        if self.answers and isinstance(self.answers, dict):
            self.total_questions = len(self.answers)
        super().save(*args, **kwargs)