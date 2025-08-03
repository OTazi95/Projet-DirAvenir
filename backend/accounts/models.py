from django.db import models

class ProgrammesUniversites(models.Model):
    filiere = models.CharField(max_length=255)
    universite = models.CharField(max_length=255)
    description = models.TextField()
    pays = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.universite} - {self.filiere}"
