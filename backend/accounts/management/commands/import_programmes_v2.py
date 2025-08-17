import csv
from django.core.management.base import BaseCommand
from accounts.models import ProgrammesUniversitesV2
import os

class Command(BaseCommand):
    help = 'Import intelligent des programmes universitaires - évite les doublons'

    def add_arguments(self, parser):
        parser.add_argument(
            '--csv-file',
            type=str,
            required=True,
            help='Chemin vers le fichier CSV'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Vider la table avant import'
        )
        parser.add_argument(
            '--update-existing',
            action='store_true',
            help='Mettre à jour les enregistrements existants'
        )

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        
        # Vérifier le fichier
        if not os.path.exists(csv_file):
            self.stdout.write(
                self.style.ERROR(f"Fichier non trouvé: {csv_file}")
            )
            return
        
        # Vider la table si demandé
        if options['clear']:
            count = ProgrammesUniversitesV2.objects.count()
            ProgrammesUniversitesV2.objects.all().delete()
            self.stdout.write(f"🗑️ Supprimé {count} anciens enregistrements")
        
        # Analyser et importer
        self.smart_import(csv_file, options['update_existing'])

    def smart_import(self, csv_file, update_existing=False):
        """Import intelligent qui évite les doublons"""
        
        # Lire d'abord toutes les données existantes
        existing_programs = {}
        for program in ProgrammesUniversitesV2.objects.all():
            # Créer une clé unique basée sur université + programme
            key = f"{program.universities}|{program.program}".lower().strip()
            existing_programs[key] = program
        
        self.stdout.write(f"📊 {len(existing_programs)} programmes déjà en base")
        
        # Lire le CSV
        batch_size = 100
        batch_new = []
        batch_updates = []
        
        new_count = 0
        updated_count = 0
        skipped_count = 0
        error_count = 0
        
        self.stdout.write("🚀 Début de l'import intelligent...")
        
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            # Afficher les en-têtes pour debug
            self.stdout.write("📋 Colonnes détectées:")
            for i, header in enumerate(reader.fieldnames, 1):
                self.stdout.write(f"   {i}. '{header}'")
            
            for row_num, row in enumerate(reader, 1):
                try:
                    # Extraire les données
                    universities = self.clean_field(row.get('Universities', ''))
                    program = self.clean_field(row.get('Program', ''))
                    
                    if not universities or not program:
                        self.stdout.write(f"⚠️  Ligne {row_num}: Université ou programme manquant")
                        skipped_count += 1
                        continue
                    
                    # Créer la clé unique
                    unique_key = f"{universities}|{program}".lower().strip()
                    
                    # Préparer les données du programme - NOMS EXACTS DU CSV
                    program_data = {
                        'campus_city': self.clean_field(row.get('Campus City', '')),
                        'universities': self.clean_field(row.get('Universities', '')),
                        'apply_before': self.clean_field(row.get('Apply before ', '')),  # ⭐ AVEC ESPACE !
                        'university_ranking': self.clean_field(row.get('University Ranking', '')),
                        'category': self.clean_field(row.get('Category ', '')),  # ⭐ AVEC ESPACE !
                        'program': self.clean_field(row.get('Program', '')),
                        'degree_type': self.clean_field(row.get('Degree Type', '')),
                        'tuition_fees': self.clean_field(row.get('Tuition Fees', '')),
                        'duration': self.clean_field(row.get('Duration', '')),
                        'language': self.clean_field(row.get('Language', '')),
                        'scholarship': self.clean_field(row.get('Scholarship', '')),
                        'description': self.clean_field(row.get('Description', '')),
                        'about_program': self.clean_field(row.get('About this Program', '')),
                        'why_program': self.clean_field(row.get('Why this Program', '')),
                        'about_university': self.clean_field(row.get('About The university', '')),
                    }
                    
                    # Debug pour les premières lignes
                    if row_num <= 3:
                        self.stdout.write(f"🔍 Ligne {row_num}:")
                        self.stdout.write(f"   Clé: '{unique_key}'")
                        self.stdout.write(f"   Category trouvé: '{row.get('category', 'VIDE')}' ou '{row.get('Category', 'VIDE')}'")
                        self.stdout.write(f"   Apply_before trouvé: '{row.get('apply_before', 'VIDE')}' ou '{row.get('Apply before', 'VIDE')}'")
                        self.stdout.write(f"   Toutes les clés disponibles: {list(row.keys())[:10]}")  # Première 10 colonnes
                    
                    if unique_key in existing_programs:
                        # Programme existe déjà
                        if update_existing:
                            # Mettre à jour l'existant SEULEMENT si les données du CSV ne sont pas vides
                            existing_program = existing_programs[unique_key]
                            updated = False
                            for field, value in program_data.items():
                                # Ne mettre à jour que si la nouvelle valeur n'est pas vide
                                # ET si elle est différente de l'actuelle
                                if value and getattr(existing_program, field) != value:
                                    setattr(existing_program, field, value)
                                    updated = True
                            
                            # N'ajouter au batch que si quelque chose a vraiment changé
                            if updated:
                                batch_updates.append(existing_program)
                                updated_count += 1
                            
                            if row_num <= 3:
                                self.stdout.write(f"   ✏️  → Sera mis à jour")
                        else:
                            # Ignorer
                            skipped_count += 1
                            if row_num <= 3:
                                self.stdout.write(f"   ⏭️  → Ignoré (existe déjà)")
                    else:
                        # Nouveau programme
                        new_program = ProgrammesUniversitesV2(**program_data)
                        batch_new.append(new_program)
                        new_count += 1
                        
                        if row_num <= 3:
                            self.stdout.write(f"   ✨ → Nouveau, sera ajouté")
                    
                    # Batch processing
                    if len(batch_new) >= batch_size:
                        ProgrammesUniversitesV2.objects.bulk_create(batch_new)
                        batch_new = []
                        self.stdout.write(f"✅ Créé {new_count} nouveaux programmes...")
                    
                    if len(batch_updates) >= batch_size:
                        ProgrammesUniversitesV2.objects.bulk_update(
                            batch_updates, 
                            ['campus_city', 'universities', 'apply_before', 'university_ranking', 
                             'category', 'program', 'degree_type', 'tuition_fees', 'duration', 
                             'language', 'scholarship', 'description', 'about_program', 
                             'why_program', 'about_university']
                        )
                        batch_updates = []
                        self.stdout.write(f"🔄 Mis à jour {updated_count} programmes...")
                
                except Exception as e:
                    error_count += 1
                    self.stdout.write(
                        self.style.ERROR(f"❌ Erreur ligne {row_num}: {str(e)}")
                    )
            
            # Traiter les derniers éléments
            if batch_new:
                ProgrammesUniversitesV2.objects.bulk_create(batch_new)
            
            if batch_updates:
                ProgrammesUniversitesV2.objects.bulk_update(
                    batch_updates, 
                    ['campus_city', 'universities', 'apply_before', 'university_ranking', 
                     'category', 'program', 'degree_type', 'tuition_fees', 'duration', 
                     'language', 'scholarship', 'description', 'about_program', 
                     'why_program', 'about_university']
                )
        
        # Résumé final
        final_count = ProgrammesUniversitesV2.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"\n🎉 Import intelligent terminé!\n"
                f"✨ Nouveaux programmes: {new_count}\n"
                f"🔄 Programmes mis à jour: {updated_count}\n"
                f"⏭️  Programmes ignorés (doublons): {skipped_count}\n"
                f"❌ Erreurs: {error_count}\n"
                f"📊 Total en base: {final_count}"
            )
        )

    def clean_field(self, value):
        """Nettoyer les valeurs"""
        if not value:
            return ''
        
        cleaned = str(value).strip()
        
        if cleaned.lower() in ['null', 'n/a', 'none', 'nan', '']:
            return ''
            
        return cleaned