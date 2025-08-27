from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = [
        ("etudiant", "Étudiant"),
        ("admin", "Administrateur"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="etudiant")

    def __str__(self):
        return f"{self.user.username} - {self.role}"


from django.db.models.signals import post_save
from django.dispatch import receiver

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




# models.py - Modèles Django pour le système d'orientation
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





# Ajoute ce nouveau modèle à ton accounts/models.py

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
            models.Index(fields=['universities', 'category']),    # ✅ Utilise 'universities' au lieu de 'university'
            models.Index(fields=['campus_city']),                # ✅ Utilise 'campus_city' au lieu de 'city'
            models.Index(fields=['degree_type']),                # ✅ OK
            models.Index(fields=['is_active']),                  # ✅ OK
        ]

    def __str__(self):
        return f"{self.program} - {self.universities} ({self.campus_city})"  # ✅ Corrigé les noms

    @property
    def has_scholarship(self):
        return self.scholarship and self.scholarship.lower() not in ['no', 'none', 'n/a', 'non']