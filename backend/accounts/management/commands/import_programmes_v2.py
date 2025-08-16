import csv
from django.core.management.base import BaseCommand
from accounts.models import ProgrammesUniversitesV2
import os

class Command(BaseCommand):
    help = 'Import des programmes universitaires dans la nouvelle base V2'

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
        
        # Analyser le CSV
        self.analyze_and_import(csv_file)

    def analyze_and_import(self, csv_file):
        """Analyser le CSV et proposer le mapping"""
        
        # Lire les en-têtes
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            headers = reader.fieldnames
            
            self.stdout.write("📊 Colonnes détectées dans le CSV:")
            for i, header in enumerate(headers, 1):
                self.stdout.write(f"   {i}. {header}")
        
        # Demander confirmation pour continuer
        response = input(f"\n✅ Colonnes OK ? Continuer l'import ? (oui/non): ")
        if response.lower() not in ['oui', 'yes', 'y']:
            self.stdout.write("Import annulé.")
            return
        
        # Import
        self.import_data(csv_file)

    def import_data(self, csv_file):
        """Import des données"""
        
        batch_size = 100
        batch = []
        success_count = 0
        error_count = 0
        
        self.stdout.write("🚀 Début de l'import...")
        
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row_num, row in enumerate(reader, 1):
                try:
                    # 🔧 PERSONNALISE CE MAPPING selon tes colonnes CSV exactes
                    programme = ProgrammesUniversitesV2(
                        campus_city=self.clean_field(row.get('Campus City', '')),  # ✏️ Nom exact dans CSV
                        universities=self.clean_field(row.get('Universities', '')),  # ✏️ Nom exact dans CSV
                        apply_before=self.clean_field(row.get('Apply before', '')),  # ✏️ Nom exact dans CSV
                        university_ranking=self.clean_field(row.get('University Ranking', '')),  # ✏️ Nom exact dans CSV
                        category=self.clean_field(row.get('Category', '')),  # ✏️ Nom exact dans CSV
                        program=self.clean_field(row.get('Program', '')),    # ✏️ Nom exact dans CSV
                        degree_type=self.clean_field(row.get('Degree Type', '')),  # ✏️ Nom exact dans CSV
                        tuition_fees=self.clean_field(row.get('Tuition Fees', '')),  # ✏️ Nom exact dans CSV
                        duration=self.clean_field(row.get('Duration', '')),  # ✏️ Nom exact dans CSV
                        language=self.clean_field(row.get('Language', '')),  # ✏️ Nom exact dans CSV
                        scholarship=self.clean_field(row.get('Scholarship', '')),  # ✏️ Nom exact dans CSV
                        description=self.clean_field(row.get('Description', '')),  # ✏️ Nom exact dans CSV
                        about_program=self.clean_field(row.get('About this Program', '')),  # ✏️ Nom exact dans CSV
                        why_program=self.clean_field(row.get('Why this Program', '')),  # ✏️ Nom exact dans CSV
                        about_university=self.clean_field(row.get('About The university', '')),  # ✏️ Nom exact dans CSV
                    )
                    
                    batch.append(programme)
                    success_count += 1
                    
                    # Batch insert
                    if len(batch) >= batch_size:
                        ProgrammesUniversitesV2.objects.bulk_create(batch)
                        batch = []
                        self.stdout.write(f"✅ Importé: {success_count} enregistrements...")
                
                except Exception as e:
                    error_count += 1
                    self.stdout.write(
                        self.style.ERROR(f"❌ Erreur ligne {row_num}: {str(e)}")
                    )
            
            # Derniers éléments
            if batch:
                ProgrammesUniversitesV2.objects.bulk_create(batch)
        
        # Résumé
        final_count = ProgrammesUniversitesV2.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"\n🎉 Import terminé!\n"
                f"✅ Succès: {success_count}\n"
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