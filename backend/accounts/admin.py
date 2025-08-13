from django.contrib import admin
from .models import ProgrammesUniversites

@admin.register(ProgrammesUniversites)
class ProgrammesUniversitesAdmin(admin.ModelAdmin):
    list_display = ('filiere', 'universite', 'pays', 'logo')



# admin.py - Interface d'administration
from django.contrib import admin
from .models import Major, OrientationTest, TestResult

@admin.register(Major)
class MajorAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name', 'description']
    list_filter = ['created_at']
    
    fieldsets = (
        ('Informations Générales', {
            'fields': ('name', 'description')
        }),
        ('Piliers d\'Intérêts', {
            'fields': (
                'interet_scientifique_tech',
                'interet_artistique_creatif',
                'interet_social_humain',
                'interet_business_gestion',
                'interet_logique_analytique'
            )
        }),
        ('Piliers de Compétences', {
            'fields': (
                'competence_resolution_problemes',
                'competence_communication',
                'competence_organisation',
                'competence_manuel_technique'
            )
        }),
        ('Piliers de Valeurs / Motivations', {
            'fields': (
                'valeur_impact_societal',
                'valeur_innovation_challenge',
                'valeur_stabilite_securite',
                'valeur_autonomie'
            )
        }),
        ('Piliers de Préférence de Travail', {
            'fields': (
                'pref_travail_equipe_collab',
                'pref_travail_autonome',
                'pref_pratique_terrain',
                'pref_theorie_recherche'
            )
        })
    )

@admin.register(OrientationTest)
class OrientationTestAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'session_id', 'completed_at']
    list_filter = ['completed_at']
    search_fields = ['user__username', 'session_id']
    readonly_fields = ['completed_at']

@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ['test', 'major', 'match_percentage', 'rank']
    list_filter = ['major', 'rank']
    search_fields = ['major__name']