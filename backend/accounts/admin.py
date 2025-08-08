from django.contrib import admin
from .models import ProgrammesUniversites

@admin.register(ProgrammesUniversites)
class ProgrammesUniversitesAdmin(admin.ModelAdmin):
    list_display = ('filiere', 'universite', 'pays', 'logo')
