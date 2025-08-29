const MAJOR_PROFILES = {
  'Civil Engineering': {
    Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 50, Interet_Business_Gestion: 60,
    Interet_Logique_Analytique: 90, Competence_Resolution_Problemes: 90,
    Competence_Communication: 75, Competence_Organisation: 90,
    Competence_Manuel_Technique: 85, Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 85, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 60
  },
  'Mechanical Engineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 30,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 65, Competence_Organisation: 80,
    Competence_Manuel_Technique: 90, Valeur_Impact_Societal: 70,
    Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 75,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 70
  },
  
  'Architecture': {
    Interet_Scientifique_Tech: 60, Interet_Artistique_Creatif: 90,
    Interet_Social_Humain: 70, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 80, Competence_Resolution_Problemes: 80,
    Competence_Communication: 85, Competence_Organisation: 85,
    Competence_Manuel_Technique: 85, Valeur_Impact_Societal: 85,
    Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 70,
    Pref_Theorie_Recherche: 60
  },
  
  'International Business': {
    Interet_Scientifique_Tech: 40, Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 80, Interet_Business_Gestion: 98,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 85,
    Competence_Communication: 95, Competence_Organisation: 90,
    Competence_Manuel_Technique: 20, Valeur_Impact_Societal: 60,
    Valeur_Innovation_Challenge: 85, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 70,
    Pref_Theorie_Recherche: 60
  },
  
  'Business Administration': {
    Interet_Scientifique_Tech: 30, Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 80, Interet_Business_Gestion: 98,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 85,
    Competence_Communication: 95, Competence_Organisation: 98,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 60,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 95,
    Pref_Travail_Autonome: 50, Pref_Pratique_Terrain: 60,
    Pref_Theorie_Recherche: 50
  },
  
  'International Economics and Trade': {
    Interet_Scientifique_Tech: 50, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 70, Interet_Business_Gestion: 95,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 90,
    Competence_Communication: 85, Competence_Organisation: 85,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 75,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 50,
    Pref_Theorie_Recherche: 85
  },
  
  'Marketing and Management': {
    Interet_Scientifique_Tech: 20, Interet_Artistique_Creatif: 80,
    Interet_Social_Humain: 90, Interet_Business_Gestion: 95,
    Interet_Logique_Analytique: 70, Competence_Resolution_Problemes: 80,
    Competence_Communication: 98, Competence_Organisation: 90,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 70,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 95,
    Pref_Travail_Autonome: 50, Pref_Pratique_Terrain: 60,
    Pref_Theorie_Recherche: 50
  },
  
  'Computer Science': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 30, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 80,
    Competence_Manuel_Technique: 50, Valeur_Impact_Societal: 60,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 85, Pref_Travail_Equipe_Collab: 70,
    Pref_Travail_Autonome: 80, Pref_Pratique_Terrain: 40,
    Pref_Theorie_Recherche: 80
  },
  
  'Software Engineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 45,
    Interet_Social_Humain: 30, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 80, Competence_Organisation: 90,
    Competence_Manuel_Technique: 40, Valeur_Impact_Societal: 65,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 85,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 50,
    Pref_Theorie_Recherche: 75
  },
  
  'Artificial Intelligence': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 30,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 70,
    Competence_Manuel_Technique: 30, Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 90, Pref_Travail_Equipe_Collab: 70,
    Pref_Travail_Autonome: 90, Pref_Pratique_Terrain: 40,
    Pref_Theorie_Recherche: 95
  },
  
  'Tourism Management': {
    Interet_Scientifique_Tech: 20, Interet_Artistique_Creatif: 60,
    Interet_Social_Humain: 95, Interet_Business_Gestion: 90,
    Interet_Logique_Analytique: 70, Competence_Resolution_Problemes: 80,
    Competence_Communication: 98, Competence_Organisation: 95,
    Competence_Manuel_Technique: 30, Valeur_Impact_Societal: 85,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 95,
    Pref_Travail_Autonome: 50, Pref_Pratique_Terrain: 80,
    Pref_Theorie_Recherche: 40
  },
  
  'Nursing': {
    Interet_Scientifique_Tech: 65, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 98, Interet_Business_Gestion: 20,
    Interet_Logique_Analytique: 70, Competence_Resolution_Problemes: 80,
    Competence_Communication: 98, Competence_Organisation: 90,
    Competence_Manuel_Technique: 70, Valeur_Impact_Societal: 98,
    Valeur_Innovation_Challenge: 60, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 50, Pref_Travail_Equipe_Collab: 98,
    Pref_Travail_Autonome: 40, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 60
  },
  
  'Pharmacy': {
    Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 80, Interet_Business_Gestion: 30,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 85,
    Competence_Communication: 90, Competence_Organisation: 95,
    Competence_Manuel_Technique: 60, Valeur_Impact_Societal: 90,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 85,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 85,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 70,
    Pref_Theorie_Recherche: 80
  },
  
  'Electrical Engineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 30, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 65, Competence_Organisation: 80,
    Competence_Manuel_Technique: 80, Valeur_Impact_Societal: 70,
    Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 75,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 80,
    Pref_Theorie_Recherche: 75
  },
  
  'Food Science and Engineering': {
    Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 50,
    Interet_Social_Humain: 40, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 85,
    Competence_Communication: 70, Competence_Organisation: 85,
    Competence_Manuel_Technique: 75, Valeur_Impact_Societal: 85,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 70
  },
  
  'Finance': {
    Interet_Scientifique_Tech: 40, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 50, Interet_Business_Gestion: 98,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 90,
    Competence_Communication: 85, Competence_Organisation: 98,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 40,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 85,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 50,
    Pref_Theorie_Recherche: 80
  },
  
  'Mechanical Design, Manufacturing and Automation': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 60,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 85,
    Competence_Manuel_Technique: 95, Valeur_Impact_Societal: 60,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 95,
    Pref_Theorie_Recherche: 60
  },
  
  'Science of Law': {
    Interet_Scientifique_Tech: 30, Interet_Artistique_Creatif: 30,
    Interet_Social_Humain: 80, Interet_Business_Gestion: 80,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 90,
    Competence_Communication: 95, Competence_Organisation: 90,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 90,
    Valeur_Innovation_Challenge: 60, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 50,
    Pref_Theorie_Recherche: 90
  },
  
  'International Politics': {
    Interet_Scientifique_Tech: 20, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 90, Interet_Business_Gestion: 70,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 80,
    Competence_Communication: 95, Competence_Organisation: 80,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 95,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 50,
    Pref_Theorie_Recherche: 85
  },
  
  'MBBS': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 98, Interet_Business_Gestion: 20,
    Interet_Logique_Analytique: 90, Competence_Resolution_Problemes: 95,
    Competence_Communication: 98, Competence_Organisation: 90,
    Competence_Manuel_Technique: 75, Valeur_Impact_Societal: 98,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 85,
    Valeur_Autonomie: 60, Pref_Travail_Equipe_Collab: 95,
    Pref_Travail_Autonome: 50, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 80
  },
  
  'Public Relations': {
    Interet_Scientifique_Tech: 10, Interet_Artistique_Creatif: 80,
    Interet_Social_Humain: 98, Interet_Business_Gestion: 90,
    Interet_Logique_Analytique: 60, Competence_Resolution_Problemes: 75,
    Competence_Communication: 98, Competence_Organisation: 90,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 85, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 98,
    Pref_Travail_Autonome: 50, Pref_Pratique_Terrain: 60,
    Pref_Theorie_Recherche: 40
  },
  
  'Applied Chemistry': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 30, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 60, Competence_Organisation: 85,
    Competence_Manuel_Technique: 85, Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 70,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 80
  },
  
  'English': {
    Interet_Scientifique_Tech: 10, Interet_Artistique_Creatif: 90,
    Interet_Social_Humain: 85, Interet_Business_Gestion: 30,
    Interet_Logique_Analytique: 80, Competence_Resolution_Problemes: 70,
    Competence_Communication: 98, Competence_Organisation: 70,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 75,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 50,
    Valeur_Autonomie: 85, Pref_Travail_Equipe_Collab: 70,
    Pref_Travail_Autonome: 85, Pref_Pratique_Terrain: 30,
    Pref_Theorie_Recherche: 90
  },
  
  'Dentistry': {
    Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 90, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 90,
    Competence_Communication: 95, Competence_Organisation: 90,
    Competence_Manuel_Technique: 95, Valeur_Impact_Societal: 98,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 95,
    Pref_Theorie_Recherche: 60
  },
  
  'New Energy Science and Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 40, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 85,
    Competence_Manuel_Technique: 80, Valeur_Impact_Societal: 95,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 80
  },
  
  'Hydraulic Engineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 50, Interet_Business_Gestion: 60,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 90,
    Competence_Manuel_Technique: 85, Valeur_Impact_Societal: 90,
    Valeur_Innovation_Challenge: 85, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 60
  },
  
  'Transportation Engineering': {
    Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 60, Interet_Business_Gestion: 70,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 90,
    Competence_Communication: 80, Competence_Organisation: 95,
    Competence_Manuel_Technique: 70, Valeur_Impact_Societal: 90,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 60
  },
  
  'Bioengineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 30,
    Interet_Social_Humain: 70, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 80,
    Competence_Manuel_Technique: 85, Valeur_Impact_Societal: 95,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 85,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 80
  },
  
  'Biotechnology': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 40, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 80,
    Competence_Manuel_Technique: 85, Valeur_Impact_Societal: 90,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 85
  },
  
  'Materials Science and Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 50,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 60, Competence_Organisation: 80,
    Competence_Manuel_Technique: 90, Valeur_Impact_Societal: 75,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 75, Pref_Travail_Equipe_Collab: 70,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 80
  },
  
  'E-Commerce': {
    Interet_Scientifique_Tech: 50, Interet_Artistique_Creatif: 70,
    Interet_Social_Humain: 70, Interet_Business_Gestion: 98,
    Interet_Logique_Analytique: 85, Competence_Resolution_Problemes: 85,
    Competence_Communication: 95, Competence_Organisation: 95,
    Competence_Manuel_Technique: 20, Valeur_Impact_Societal: 60,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 70,
    Pref_Theorie_Recherche: 60
  },
  
  'Robot Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 60,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 85,
    Competence_Manuel_Technique: 95, Valeur_Impact_Societal: 75,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 70,
    Valeur_Autonomie: 85, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 70
  },
  
  'Biomedical Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 70, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 80, Competence_Organisation: 85,
    Competence_Manuel_Technique: 80, Valeur_Impact_Societal: 95,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 80,
    Pref_Theorie_Recherche: 85
  },
  
  'Data Science': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 30, Interet_Business_Gestion: 70,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 80,
    Competence_Manuel_Technique: 30, Valeur_Impact_Societal: 70,
    Valeur_Innovation_Challenge: 95, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 85, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 40,
    Pref_Theorie_Recherche: 90
  },
  
  'Economics': {
    Interet_Scientifique_Tech: 40, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 80, Interet_Business_Gestion: 90,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 90,
    Competence_Communication: 85, Competence_Organisation: 80,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 85,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 40,
    Pref_Theorie_Recherche: 90
  },
  
  'Chemical Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 30, Interet_Business_Gestion: 50,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 90,
    Competence_Manuel_Technique: 80, Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 90, Valeur_Stabilite_Securite: 80,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 85,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 70
  },
  
  'Petroleum Engineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 60,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 90,
    Competence_Manuel_Technique: 90, Valeur_Impact_Societal: 50,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 90,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 95,
    Pref_Theorie_Recherche: 60
  },
  
  'Electronic and Information Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 20,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 85,
    Competence_Manuel_Technique: 80, Valeur_Impact_Societal: 75,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 75,
    Valeur_Autonomie: 85, Pref_Travail_Equipe_Collab: 80,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 80,
    Pref_Theorie_Recherche: 85
  },
  
  'Safety Engineering': {
    Interet_Scientifique_Tech: 90, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 70, Interet_Business_Gestion: 60,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 85, Competence_Organisation: 98,
    Competence_Manuel_Technique: 70, Valeur_Impact_Societal: 95,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 98,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 80,
    Pref_Theorie_Recherche: 60
  },
  
  'Mining Engineering': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 60,
    Interet_Logique_Analytique: 95, Competence_Resolution_Problemes: 95,
    Competence_Communication: 70, Competence_Organisation: 90,
    Competence_Manuel_Technique: 95, Valeur_Impact_Societal: 60,
    Valeur_Innovation_Challenge: 80, Valeur_Stabilite_Securite: 95,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 85,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 98,
    Pref_Theorie_Recherche: 60
  },
  
  'Psychology': {
    Interet_Scientifique_Tech: 50, Interet_Artistique_Creatif: 40,
    Interet_Social_Humain: 98, Interet_Business_Gestion: 30,
    Interet_Logique_Analytique: 80, Competence_Resolution_Problemes: 85,
    Competence_Communication: 98, Competence_Organisation: 70,
    Competence_Manuel_Technique: 10, Valeur_Impact_Societal: 95,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 60,
    Valeur_Autonomie: 70, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 70, Pref_Pratique_Terrain: 50,
    Pref_Theorie_Recherche: 90
  },
  
  'Aeronautical Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 50,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 90,
    Competence_Manuel_Technique: 90, Valeur_Impact_Societal: 75,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 95,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 80
  },
  
  'Aerospace Engineering': {
    Interet_Scientifique_Tech: 98, Interet_Artistique_Creatif: 50,
    Interet_Social_Humain: 20, Interet_Business_Gestion: 40,
    Interet_Logique_Analytique: 98, Competence_Resolution_Problemes: 98,
    Competence_Communication: 70, Competence_Organisation: 90,
    Competence_Manuel_Technique: 90, Valeur_Impact_Societal: 80,
    Valeur_Innovation_Challenge: 98, Valeur_Stabilite_Securite: 95,
    Valeur_Autonomie: 80, Pref_Travail_Equipe_Collab: 90,
    Pref_Travail_Autonome: 60, Pref_Pratique_Terrain: 85,
    Pref_Theorie_Recherche: 80
  },
  
  'Medicine': {
    Interet_Scientifique_Tech: 95, Interet_Artistique_Creatif: 10,
    Interet_Social_Humain: 98, Interet_Business_Gestion: 20,
    Interet_Logique_Analytique: 90, Competence_Resolution_Problemes: 95,
    Competence_Communication: 98, Competence_Organisation: 90,
    Competence_Manuel_Technique: 75, Valeur_Impact_Societal: 98,
    Valeur_Innovation_Challenge: 70, Valeur_Stabilite_Securite: 85,
    Valeur_Autonomie: 60, Pref_Travail_Equipe_Collab: 95,
    Pref_Travail_Autonome: 50, Pref_Pratique_Terrain: 90,
    Pref_Theorie_Recherche: 80
  }
};

export default MAJOR_PROFILES;