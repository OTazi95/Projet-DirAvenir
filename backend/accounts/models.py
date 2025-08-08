from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone




class ProgrammesUniversites(models.Model):
    filiere = models.CharField(max_length=255)
    universite = models.CharField(max_length=255)
    description = models.TextField()
    pays = models.CharField(max_length=100)
    logo = models.CharField(max_length=255, null=True, blank=True)

class Meta:
        db_table = 'programmes_universites'



