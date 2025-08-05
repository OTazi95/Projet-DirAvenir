from django.db import models

class ProgrammesUniversites(models.Model):
    filiere = models.CharField(max_length=255)
    universite = models.CharField(max_length=255)
    description = models.TextField()
    pays = models.CharField(max_length=100)

class Meta:
        db_table = 'programmes_universites'
