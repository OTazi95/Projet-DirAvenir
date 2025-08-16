import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Questions 
const questions = [
  {
    id: 'q1',
    category: 'Intérêts et Passions',
    question: "Si le temps et l'argent n'étaient pas un problème, quelle activité choisiriez-vous pour passer votre journée idéale ?",
    type: 'single',
    options: [
      { id: 'A', text: 'Créer quelque chose de nouveau (construire, coder, designer)', icon: '🔧' },
      { id: 'B', text: 'Comprendre comment les choses fonctionnent (expérimenter, analyser, résoudre des énigmes)', icon: '🔬' },
      { id: 'C', text: 'Interagir et aider les autres (conseiller, enseigner, soigner)', icon: '🤝' },
      { id: 'D', text: 'Organiser et gérer des projets (planifier, diriger, optimiser)', icon: '📋' },
      { id: 'E', text: 'Exprimer ma créativité (peindre, écrire, jouer de la musique, faire des vidéos)', icon: '🎨' }
    ]
  },
  {
    id: 'q2',
    category: 'Intérêts et Passions',
    question: "Quand vous naviguez sur internet ou regardez des vidéos, quel type de contenu retient le plus votre attention ?",
    type: 'multiple',
    maxSelections: 4,
    options: [
      { id: 'tech', text: 'Découvertes scientifiques, Technologie et innovation', icon: '🚀' },
      { id: 'art', text: 'Art et culture, Design et création', icon: '🎭' },
      { id: 'social', text: 'Développement personnel, Causes sociales et humanitaires', icon: '💖' },
      { id: 'business', text: 'Actualités économiques, Stratégies d\'entreprise', icon: '💼' },
      { id: 'organization', text: 'Organisation et méthodes de travail, Gestion de projets', icon: '📊' },
      { id: 'manual', text: 'Sports, Bricolage et artisanat', icon: '🔨' }
    ]
  },
  {
    id: 'q3',
    category: 'Intérêts et Passions',
    question: "Imaginez que vous êtes dans un magasin. Vers quelle section êtes-vous naturellement attiré(e) ?",
    type: 'single',
    options: [
      { id: 'A', text: 'Rayons d\'électronique, gadgets ou outils', icon: '📱' },
      { id: 'B', text: 'Livres de science, de philosophie ou documentaires', icon: '📚' },
      { id: 'C', text: 'Matériel d\'art, instruments de musique ou objets de décoration', icon: '🎪' },
      { id: 'D', text: 'Livres de développement personnel, jeux de société ou jeux vidéo', icon: '🎮' },
      { id: 'E', text: 'Vêtements, accessoires de mode ou articles de luxe', icon: '👔' }
    ]
  },
  {
    id: 'q4',
    category: 'Compétences et Aptitudes',
    question: "Face à un problème complexe, quelle est votre première réaction ?",
    type: 'single',
    options: [
      { id: 'A', text: 'Le décomposer en petites étapes logiques pour trouver la solution la plus efficace', icon: '🧩' },
      { id: 'B', text: 'Aller chercher les données et les faits pour comprendre la situation et trouver une solution', icon: '📊' },
      { id: 'C', text: 'Imaginer des solutions originales, même si elles semblent folles au début', icon: '💡' },
      { id: 'D', text: 'Chercher l\'avis des autres pour trouver une solution collective', icon: '👥' }
    ]
  },
  {
    id: 'q5',
    category: 'Compétences et Aptitudes',
    question: "Parmi ces activités, lesquelles vous viennent le plus naturellement ?",
    type: 'ranking',
    maxSelections: 3,
    options: [
      { id: 'budget', text: 'Gérer un budget', icon: '💰' },
      { id: 'event', text: 'Organiser un événement', icon: '🎉' },
      { id: 'write', text: 'Écrire un texte clair', icon: '✍️' },
      { id: 'repair', text: 'Réparer un appareil', icon: '🔧' },
      { id: 'draw', text: 'Dessiner ou peindre', icon: '🎨' },
      { id: 'equation', text: 'Résoudre une équation complexe', icon: '📐' },
      { id: 'convince', text: 'Convaincre quelqu\'un d\'une idée', icon: '🗣️' },
      { id: 'counsel', text: 'Écouter et conseiller un ami', icon: '👂' }
    ]
  },
  {
    id: 'q6',
    category: 'Compétences et Aptitudes',
    question: "Quand vous devez apprendre quelque chose de nouveau, comment préférez-vous le faire ?",
    type: 'single',
    options: [
      { id: 'A', text: 'Lire et prendre des notes détaillées', icon: '📝' },
      { id: 'B', text: 'Regarder des tutoriels vidéo ou des démonstrations', icon: '📹' },
      { id: 'C', text: 'Essayer par moi-même, pratiquer et faire des erreurs', icon: '⚡' },
      { id: 'D', text: 'Discuter avec d\'autres et échanger des idées', icon: '💬' }
    ]
  },
  {
    id: 'q7',
    category: 'Valeurs et Objectifs',
    question: "Quel type d'impact aimeriez-vous avoir dans le monde ?",
    type: 'single',
    options: [
      { id: 'A', text: 'Améliorer la vie des individus directement (bien-être, santé, éducation)', icon: '❤️' },
      { id: 'B', text: 'Créer des systèmes ou des produits qui rendent le monde plus efficace', icon: '⚙️' },
      { id: 'C', text: 'Contribuer à la beauté et à la culture (arts, design, histoire)', icon: '🎭' },
      { id: 'D', text: 'Défendre une cause ou promouvoir la justice sociale', icon: '⚖️' }
    ]
  },
  {
    id: 'q8',
    category: 'Valeurs et Objectifs',
    question: "Choisissez l'image qui représente le mieux l'environnement de travail dans lequel vous vous épanouiriez le plus.",
    type: 'single',
    options: [
      { id: 'A', text: 'Un laboratoire ou un centre de recherche', icon: '🔬' },
      { id: 'B', text: 'Un bureau ouvert et collaboratif', icon: '🏢' },
      { id: 'C', text: 'Un atelier ou un studio créatif', icon: '🎨' },
      { id: 'D', text: 'L\'extérieur, la nature, un chantier', icon: '🌲' },
      { id: 'E', text: 'Un environnement calme et individuel (bibliothèque, bureau privé)', icon: '📚' }
    ]
  },
  {
    id: 'q9',
    category: 'Valeurs et Objectifs',
    question: "Quand vous pensez à votre future carrière, qu'est-ce qui est le plus important pour vous ?",
    type: 'slider',
    options: [
      { id: 'security', text: 'La sécurité de l\'emploi et la stabilité', icon: '🛡️' },
      { id: 'innovation', text: 'La possibilité d\'innover et d\'être à la pointe', icon: '🚀' },
      { id: 'autonomy', text: 'L\'autonomie et la liberté de mes décisions', icon: '🗽' },
      { id: 'salary', text: 'Un salaire élevé et de bonnes opportunités financières', icon: '💰' }
    ]
  },
  {
    id: 'q10',
    category: 'Valeurs et Objectifs',
    question: "Si vous deviez résoudre un grand problème, quelle serait votre motivation principale ?",
    type: 'single',
    options: [
      { id: 'A', text: 'Comprendre la racine du problème pour une solution durable', icon: '🌱' },
      { id: 'B', text: 'Mettre en place rapidement une solution concrète', icon: '🔨' },
      { id: 'C', text: 'Rallier les gens autour de la solution', icon: '🤝' },
      { id: 'D', text: 'Développer une solution technologique avancée', icon: '🤖' }
    ]
  },
  {
    id: 'q11',
    category: 'Préférences de Travail',
    question: "Préférez-vous travailler :",
    type: 'single',
    options: [
      { id: 'A', text: 'Seul(e) sur un projet, en totale autonomie', icon: '🏠' },
      { id: 'B', text: 'En petite équipe, où chacun apporte sa pierre à l\'édifice', icon: '👥' },
      { id: 'C', text: 'Au sein d\'une grande structure, avec des rôles bien définis', icon: '🏢' }
    ]
  },
  {
    id: 'q12',
    category: 'Préférences de Travail',
    question: "Lors d'une présentation ou d'un exposé, vous préférez :",
    type: 'single',
    options: [
      { id: 'A', text: 'Préparer méticuleusement et présenter clairement les faits', icon: '📋' },
      { id: 'B', text: 'Raconter une histoire pour capter l\'attention', icon: '📖' },
      { id: 'C', text: 'Répondre aux questions du public et interagir spontanément', icon: '🗣️' }
    ]
  },
  {
    id: 'q13',
    category: 'Préférences de Travail',
    question: "Quand vous prenez une décision importante, vous vous fiez le plus à :",
    type: 'single',
    options: [
      { id: 'A', text: 'La logique et l\'analyse des faits', icon: '🧠' },
      { id: 'B', text: 'Votre intuition et vos sentiments', icon: '💭' },
      { id: 'C', text: 'L\'avis des personnes que vous respectez', icon: '👥' }
    ]
  },
  {
    id: 'q14',
    category: 'Matières Préférées',
    question: "Parmi ces groupes de matières, lesquels vous ont le plus passionné(e) durant votre parcours scolaire ?",
    type: 'multiple',
    maxSelections: 4,
    options: [
      { id: 'sciences', text: 'Sciences (Maths, Physique-Chimie, SVT)', icon: '🧪' },
      { id: 'literature', text: 'Littérature et Langues (Français, Langues étrangères, Philosophie)', icon: '📖' },
      { id: 'social_sciences', text: 'Sciences Sociales et Humaines (Histoire-Géo, SES, Psychologie)', icon: '🌍' },
      { id: 'arts', text: 'Arts et Design (Arts Plastiques, Musique, Design)', icon: '🎨' },
      { id: 'technology', text: 'Technologie et Informatique (NSI, STI2D, Sciences de l\'ingénieur)', icon: '💻' },
      { id: 'management', text: 'Gestion et Économie (Management, Droit)', icon: '📊' }
    ]
  }
];

// Système de scoring basé sur le cahier des charges
const PILLAR_SCORING = {
  q1: {
    A: { Interet_Scientifique_Tech: 5, Interet_Artistique_Creatif: 3, Valeur_Innovation_Challenge: 4, Competence_Manuel_Technique: 2 },
    B: { Interet_Scientifique_Tech: 4, Interet_Logique_Analytique: 5, Competence_Resolution_Problemes: 4, Pref_Theorie_Recherche: 3 },
    C: { Interet_Social_Humain: 5, Valeur_Impact_Societal: 5, Competence_Communication: 4 },
    D: { Interet_Business_Gestion: 5, Competence_Organisation: 5, Pref_Travail_Equipe_Collab: 3 },
    E: { Interet_Artistique_Creatif: 5, Valeur_Innovation_Challenge: 2, Pref_Travail_Autonome: 3 }
  },
  q2: {
    tech: { Interet_Scientifique_Tech: 3, Valeur_Innovation_Challenge: 2 },
    art: { Interet_Artistique_Creatif: 3 },
    social: { Interet_Social_Humain: 3, Valeur_Impact_Societal: 2 },
    business: { Interet_Business_Gestion: 3 },
    organization: { Competence_Organisation: 3 },
    manual: { Competence_Manuel_Technique: 3 }
  },
  q3: {
    A: { Interet_Scientifique_Tech: 3, Competence_Manuel_Technique: 2 },
    B: { Interet_Logique_Analytique: 3, Pref_Theorie_Recherche: 2 },
    C: { Interet_Artistique_Creatif: 3 },
    D: { Interet_Social_Humain: 3 },
    E: { Interet_Business_Gestion: 3, Interet_Artistique_Creatif: 2 }
  },
  q4: {
    A: { Competence_Resolution_Problemes: 4, Interet_Logique_Analytique: 4 },
    B: { Interet_Scientifique_Tech: 3, Interet_Logique_Analytique: 3, Pref_Theorie_Recherche: 2 },
    C: { Interet_Artistique_Creatif: 4, Valeur_Innovation_Challenge: 4 },
    D: { Competence_Communication: 4, Pref_Travail_Equipe_Collab: 4, Interet_Social_Humain: 2 }
  },
  q5: {
    budget: { Interet_Business_Gestion: 1, Competence_Organisation: 1, Interet_Logique_Analytique: 1 },
    event: { Competence_Organisation: 1, Pref_Travail_Equipe_Collab: 1, Competence_Communication: 1 },
    write: { Competence_Communication: 1, Interet_Artistique_Creatif: 1 },
    repair: { Competence_Manuel_Technique: 1, Interet_Scientifique_Tech: 1 },
    draw: { Interet_Artistique_Creatif: 1, Competence_Manuel_Technique: 1 },
    equation: { Interet_Logique_Analytique: 1, Interet_Scientifique_Tech: 1 },
    convince: { Competence_Communication: 1, Interet_Business_Gestion: 1 },
    counsel: { Interet_Social_Humain: 1, Competence_Communication: 1 }
  },
  q6: {
    A: { Pref_Theorie_Recherche: 4, Interet_Logique_Analytique: 3 },
    B: { Interet_Scientifique_Tech: 3 },
    C: { Competence_Manuel_Technique: 4, Pref_Pratique_Terrain: 4 },
    D: { Competence_Communication: 4, Pref_Travail_Equipe_Collab: 4 }
  },
  q7: {
    A: { Valeur_Impact_Societal: 5, Interet_Social_Humain: 4 },
    B: { Valeur_Innovation_Challenge: 4, Interet_Scientifique_Tech: 3 },
    C: { Interet_Artistique_Creatif: 5 },
    D: { Valeur_Impact_Societal: 5, Interet_Social_Humain: 3 }
  },
  q8: {
    A: { Pref_Theorie_Recherche: 4, Interet_Scientifique_Tech: 3 },
    B: { Pref_Travail_Equipe_Collab: 4, Interet_Business_Gestion: 2 },
    C: { Interet_Artistique_Creatif: 4, Competence_Manuel_Technique: 3 },
    D: { Pref_Pratique_Terrain: 4, Competence_Manuel_Technique: 3 },
    E: { Pref_Travail_Autonome: 4, Pref_Theorie_Recherche: 2 }
  },
  q9: {
    security: { Valeur_Stabilite_Securite: 1 },
    innovation: { Valeur_Innovation_Challenge: 1 },
    autonomy: { Valeur_Autonomie: 1 },
    salary: { Interet_Business_Gestion: 1 }
  },
  q10: {
    A: { Interet_Logique_Analytique: 4, Competence_Resolution_Problemes: 3 },
    B: { Pref_Pratique_Terrain: 4, Competence_Resolution_Problemes: 3 },
    C: { Competence_Communication: 4, Pref_Travail_Equipe_Collab: 3 },
    D: { Valeur_Innovation_Challenge: 4, Interet_Scientifique_Tech: 3 }
  },
  q11: {
    A: { Pref_Travail_Autonome: 5, Valeur_Autonomie: 4 },
    B: { Pref_Travail_Equipe_Collab: 5 },
    C: { Valeur_Stabilite_Securite: 4, Competence_Organisation: 3 }
  },
  q12: {
    A: { Competence_Organisation: 4, Interet_Logique_Analytique: 3 },
    B: { Competence_Communication: 4, Interet_Artistique_Creatif: 3 },
    C: { Competence_Communication: 4, Interet_Social_Humain: 3, Pref_Travail_Equipe_Collab: 2 }
  },
  q13: {
    A: { Interet_Logique_Analytique: 5 },
    B: { Interet_Artistique_Creatif: 4, Pref_Travail_Autonome: 3 },
    C: { Interet_Social_Humain: 4, Pref_Travail_Equipe_Collab: 3 }
  },
  q14: {
    sciences: { Interet_Scientifique_Tech: 4, Interet_Logique_Analytique: 4 },
    literature: { Interet_Social_Humain: 3, Competence_Communication: 3 },
    social_sciences: { Interet_Social_Humain: 4, Pref_Theorie_Recherche: 2 },
    arts: { Interet_Artistique_Creatif: 4 },
    technology: { Interet_Scientifique_Tech: 4, Interet_Logique_Analytique: 3 },
    management: { Interet_Business_Gestion: 4, Competence_Organisation: 3 }
  }
};

// Profils idéaux des majeures 
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

// Descriptions des majeures
const MAJOR_DESCRIPTIONS = {
  'Civil Engineering': {
    description: "Le Génie Civil est un domaine axé sur la conception et la construction d'infrastructures. Il combine la théorie scientifique avec l'application pratique pour donner vie aux ponts, routes et bâtiments qui façonnent notre environnement.",
    strengths: [
      {
        icon: '🔧',
        title: 'Passion Technique et Travail Manuel',
        description: 'Votre passion pour les défis techniques et votre aptitude pour le travail manuel vous donneront une longueur d\'avance dans ce domaine.'
      },
      {
        icon: '📋',
        title: 'Organisation et Rigueur Analytique',
        description: 'Votre sens de l\'organisation et votre rigueur analytique sont des atouts majeurs pour gérer des projets d\'envergure.'
      },
      {
        icon: '🌍',
        title: 'Impact Social Concret',
        description: 'Cette majeure correspond à votre désir d\'avoir un impact social concret en construisant les fondations du monde de demain.'
      }
    ]
  },

  'Mechanical Engineering': {
    description: "Le Génie Mécanique est le cœur de l'innovation industrielle. Il couvre la conception, l'analyse et la fabrication de systèmes mécaniques, des moteurs de voiture aux robots industriels, utilisant la physique et les mathématiques pour créer des solutions efficaces et durables.",
    strengths: [
      {
        icon: '🔬',
        title: 'Profil Analytique et Scientifique',
        description: 'Votre profil analytique et votre intérêt pour la science et la technologie vous permettront de résoudre les problèmes les plus complexes.'
      },
      {
        icon: '🛠',
        title: 'Talent Manuel et Technique',
        description: 'Votre talent pour le travail manuel et technique est essentiel pour donner vie à vos créations.'
      },
      {
        icon: '💡',
        title: 'Désir d\'Innovation',
        description: 'Votre désir d\'innover et votre esprit curieux sont les forces motrices qui vous aideront à exceller dans ce domaine.'
      }
    ]
  },

  'Architecture': {
    description: "L'Architecture est la discipline qui façonne notre environnement bâti. Elle combine la créativité artistique avec la rigueur de l'ingénierie pour concevoir des espaces fonctionnels, esthétiques et respectueux de l'environnement.",
    strengths: [
      {
        icon: '🎨',
        title: 'Créativité et Passion Artistique',
        description: 'Votre très forte créativité et votre passion pour l\'art sont au cœur de cette majeure.'
      },
      {
        icon: '🌟',
        title: 'Impact Social et Innovation',
        description: 'Votre désir d\'avoir un impact social et votre esprit innovant correspondent parfaitement avec la mission d\'architecte.'
      },
      {
        icon: '🏗',
        title: 'Autonomie et Organisation',
        description: 'Votre besoin d\'autonomie et votre sens de l\'organisation sont des atouts cruciaux pour mener à bien vos projets.'
      }
    ]
  },

  'International Business': {
    description: "Le Commerce International vous prépare à devenir un acteur des marchés mondiaux. Cette majeure se concentre sur les aspects économiques, juridiques et culturels du commerce transfrontalier, et vous apprend à opérer dans un environnement international complexe.",
    strengths: [
      {
        icon: '💬',
        title: 'Aisance Communicative et Négociation',
        description: 'Votre aisance en communication et votre talent pour la négociation sont des compétences fondamentales pour réussir dans le monde du commerce international.'
      },
      {
        icon: '📊',
        title: 'Esprit Analytique et Management',
        description: 'Votre esprit analytique et votre sens du management vous permettront de naviguer dans les défis complexes du commerce mondial.'
      },
      {
        icon: '🚀',
        title: 'Autonomie et Innovation',
        description: 'Votre besoin d\'autonomie et votre désir d\'innover s\'accordent bien avec la flexibilité et la vision stratégique requises dans ce domaine.'
      }
    ]
  },

  'Business Administration': {
    description: "L'Administration des Affaires est la majeure idéale pour diriger des organisations. Vous apprendrez les principes fondamentaux du management, de la finance, du marketing et des ressources humaines pour prendre des décisions stratégiques.",
    strengths: [
      {
        icon: '📈',
        title: 'Organisation et Gestion de Projets',
        description: 'Votre talent pour l\'organisation et votre désir de gérer des projets sont au cœur de ce domaine.'
      },
      {
        icon: '🤝',
        title: 'Communication et Leadership',
        description: 'Votre aisance en communication et votre capacité à travailler en équipe sont des atouts majeurs pour le leadership.'
      },
      {
        icon: '💼',
        title: 'Stratégies d\'Affaires et Impact',
        description: 'Votre intérêt pour les stratégies d\'affaires et votre désir d\'avoir un impact par le management correspondent parfaitement à cette majeure.'
      }
    ]
  },

  'International Economics and Trade': {
    description: "Cette majeure vous permet de comprendre les forces qui animent l'économie mondiale. Elle combine la théorie économique avec les réalités du commerce international pour résoudre des problèmes complexes à l'échelle planétaire.",
    strengths: [
      {
        icon: '🧮',
        title: 'Logique Forte et Actualités Économiques',
        description: 'Votre très forte logique et votre intérêt pour l\'actualité économique sont les fondements de cette majeure.'
      },
      {
        icon: '🌐',
        title: 'Impact Sociétal et Analyse',
        description: 'Votre désir d\'avoir un impact sociétal et votre capacité d\'analyse vous permettront de naviguer dans les défis du commerce mondial.'
      },
      {
        icon: '🔍',
        title: 'Recherche Théorique et Autonomie',
        description: 'Votre préférence pour la recherche théorique et votre esprit autonome sont des qualités essentielles pour la modélisation économique.'
      }
    ]
  },

  'Marketing and Management': {
    description: "Le Marketing et Management sont au cœur de la croissance des entreprises. Cette majeure vous apprend à comprendre le comportement des consommateurs, concevoir des campagnes percutantes et diriger des équipes.",
    strengths: [
      {
        icon: '🗣',
        title: 'Communication et Créativité',
        description: 'Votre aisance en communication et votre très forte créativité sont les forces motrices de ce domaine.'
      },
      {
        icon: '👥',
        title: 'Organisation et Travail d\'Équipe',
        description: 'Votre sens de l\'organisation et votre capacité à travailler en équipe sont des atouts majeurs pour gérer des projets et des équipes.'
      },
      {
        icon: '⚡',
        title: 'Innovation et Défis',
        description: 'Votre désir d\'innover et de relever des défis est un prérequis pour vous démarquer dans ce domaine dynamique.'
      }
    ]
  },

  'Computer Science': {
    description: "L'Informatique est la science qui étudie les ordinateurs et leurs applications. Cette majeure explore la programmation, l'intelligence artificielle et la sécurité réseau pour concevoir les technologies de demain.",
    strengths: [
      {
        icon: '💻',
        title: 'Esprit Logique et Technologie',
        description: 'Votre esprit logique et analytique et votre intérêt pour la technologie sont les piliers de ce domaine.'
      },
      {
        icon: '🧩',
        title: 'Résolution de Problèmes et Innovation',
        description: 'Votre talent pour la résolution de problèmes complexes et votre soif d\'innovation vous mèneront vers l\'excellence.'
      },
      {
        icon: '🔬',
        title: 'Autonomie et Recherche Théorique',
        description: 'Votre besoin d\'autonomie et votre goût pour la recherche théorique sont des qualités clés pour la programmation et la conception d\'algorithmes.'
      }
    ]
  },

  'Software Engineering': {
    description: "Le Génie Logiciel est l'art et la science de concevoir, développer et maintenir des logiciels de qualité. C'est la majeure idéale pour construire des systèmes informatiques fiables et efficaces.",
    strengths: [
      {
        icon: '⚙️',
        title: 'Esprit Logique et Technologie',
        description: 'Votre esprit logique et analytique combiné à votre intérêt pour la technologie fait de vous un candidat idéal.'
      },
      {
        icon: '🎯',
        title: 'Résolution de Problèmes et Organisation',
        description: 'Votre talent pour la résolution de problèmes et votre sens de l\'organisation sont essentiels pour gérer des projets de développement.'
      },
      {
        icon: '🤝',
        title: 'Collaboration et Communication',
        description: 'Votre forte préférence pour le travail d\'équipe et la communication sont des atouts majeurs dans un domaine qui repose sur la collaboration.'
      }
    ]
  },

  'Artificial Intelligence': {
    description: "L'Intelligence Artificielle est la frontière de l'innovation technologique. Cette majeure explore l'apprentissage automatique et l'apprentissage profond pour concevoir des systèmes capables de résoudre des problèmes complexes de manière autonome.",
    strengths: [
      {
        icon: '🧠',
        title: 'Esprit Logique Exceptionnel',
        description: 'Votre incroyable esprit logique et analytique est le fondement de cette discipline.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Défis',
        description: 'Votre soif d\'innovation et votre désir de relever des défis sont des atouts majeurs pour percer dans ce domaine.'
      },
      {
        icon: '📚',
        title: 'Recherche Théorique et Autonomie',
        description: 'Votre préférence pour la recherche théorique et le travail autonome vous permettront de vous plonger dans les concepts complexes de l\'IA.'
      }
    ]
  },

  'Tourism Management': {
    description: "La Gestion du Tourisme est une majeure qui combine l'aspect commercial avec un fort service client. Elle vous apprend à organiser des voyages et promouvoir des destinations pour créer des expériences mémorables pour autrui.",
    strengths: [
      {
        icon: '🌟',
        title: 'Communication et Interaction Sociale',
        description: 'Votre aisance en communication et votre intérêt pour l\'interaction sociale sont les piliers de cette majeure.'
      },
      {
        icon: '📋',
        title: 'Organisation et Gestion de Projets',
        description: 'Votre grand sens de l\'organisation et votre capacité à gérer des projets sont des compétences fondamentales.'
      },
      {
        icon: '💖',
        title: 'Impact Positif et Travail Pratique',
        description: 'Votre désir d\'avoir un impact positif sur les gens et votre préférence pour le travail pratique s\'alignent parfaitement avec la réalité du tourisme.'
      }
    ]
  },

  'Nursing': {
    description: "Les Soins Infirmiers sont une vocation. C'est une majeure pour ceux qui ont une empathie profonde et un désir d'aider autrui, travaillant en équipe pour assurer le bien-être des patients.",
    strengths: [
      {
        icon: '❤️',
        title: 'Interaction Humaine et Impact Social',
        description: 'Votre intérêt pour l\'interaction sociale et humaine et votre désir d\'avoir un impact social direct font de vous un candidat idéal.'
      },
      {
        icon: '🗣',
        title: 'Communication et Travail d\'Équipe',
        description: 'Votre aisance en communication et votre préférence pour le travail d\'équipe sont absolument essentielles dans le domaine médical.'
      },
      {
        icon: '🤲',
        title: 'Pratique Manuelle et Tâches Techniques',
        description: 'Votre goût pour la pratique manuelle et le travail manuel sont des qualités essentielles pour les tâches techniques quotidiennes.'
      }
    ]
  },

  'Pharmacy': {
    description: "La Pharmacie est la majeure pour les esprits scientifiques qui veulent contribuer à la santé des gens par la science du médicament. Elle explore la chimie, la biologie et les mécanismes d'action des médicaments.",
    strengths: [
      {
        icon: '🔬',
        title: 'Esprit Scientifique et Analytique',
        description: 'Votre esprit scientifique et analytique est la base de la pharmacie.'
      },
      {
        icon: '📊',
        title: 'Organisation et Rigueur',
        description: 'Votre fort sens de l\'organisation et votre rigueur sont indispensables pour la gestion d\'inventaire et l\'application de protocoles.'
      },
      {
        icon: '🤝',
        title: 'Impact Sociétal et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact sociétal et votre préférence pour le travail d\'équipe sont des qualités essentielles pour conseiller les patients et collaborer avec le personnel médical.'
      }
    ]
  },

  'Electrical Engineering': {
    description: "Le Génie Électrique est la force motrice de la technologie moderne. Cette majeure vous permet de concevoir des systèmes électriques et électroniques pour tout, des téléphones aux réseaux électriques.",
    strengths: [
      {
        icon: '⚡',
        title: 'Profil Scientifique et Logique',
        description: 'Votre profil scientifique et logique est un atout indéniable dans ce domaine.'
      },
      {
        icon: '🔧',
        title: 'Innovation et Travail Pratique',
        description: 'Votre désir d\'innover et votre goût pour le travail pratique vous mèneront à créer les technologies de demain.'
      },
      {
        icon: '👥',
        title: 'Résolution de Problèmes et Équipe',
        description: 'Votre talent pour la résolution de problèmes et votre préférence pour le travail d\'équipe sont des qualités clés pour réussir.'
      }
    ]
  },

  'Food Science and Engineering': {
    description: "La Science et Ingénierie Alimentaire est le point de rencontre entre la science et la gastronomie. Cette majeure vous permet de comprendre la composition des aliments et d'assurer leur sécurité et qualité, en développant de nouveaux produits et des méthodes de production durables.",
    strengths: [
      {
        icon: '🧪',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et votre logique sont essentiels pour comprendre les processus biologiques et chimiques des aliments.'
      },
      {
        icon: '🔬',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre goût pour le travail pratique sont des atouts majeurs pour le développement de produits et le contrôle qualité.'
      },
      {
        icon: '🌱',
        title: 'Impact Social Concret',
        description: 'Cette majeure correspond à votre désir d\'avoir un impact social concret en assurant une alimentation saine et durable pour tous.'
      }
    ]
  },

  'Finance': {
    description: "La Finance est la majeure pour les esprits analytiques et ambitieux. Ce domaine vous donne les clés pour comprendre et influencer le monde économique, en gérant des actifs et évaluant des risques.",
    strengths: [
      {
        icon: '💹',
        title: 'Logique Forte et Stratégies d\'Affaires',
        description: 'Votre très forte logique et votre intérêt pour les stratégies d\'affaires sont les fondements de ce domaine.'
      },
      {
        icon: '📈',
        title: 'Organisation et Rigueur',
        description: 'Votre excellent sens de l\'organisation et votre rigueur sont indispensables pour la gestion des risques et l\'analyse de données.'
      },
      {
        icon: '🎯',
        title: 'Défis et Autonomie',
        description: 'Votre désir de défis et votre besoin d\'autonomie sont des qualités qui vous feront exceller dans cet environnement.'
      }
    ]
  },

  'Mechanical Design, Manufacturing and Automation': {
    description: "Cette majeure est le point de rencontre entre créativité et production. Elle vous permet de concevoir des machines et systèmes, tout en maîtrisant les outils de CAO, la robotique et les processus de fabrication pour automatiser l'industrie.",
    strengths: [
      {
        icon: '🔧',
        title: 'Profil Scientifique et Travail Manuel',
        description: 'Votre profil scientifique et votre passion pour le travail manuel sont la base de cette majeure.'
      },
      {
        icon: '💡',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre désir d\'innover et de résoudre des problèmes complexes est la force motrice de ce domaine.'
      },
      {
        icon: '⚙️',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre préférence pour le travail pratique s\'alignent parfaitement avec ce domaine d\'ingénierie.'
      }
    ]
  },

  'Science of Law': {
    description: "La Science du Droit est le fondement de la justice. Elle exige une grande rigueur logique et une capacité d'analyse de textes complexes, vous préparant à défendre les droits et promouvoir la justice.",
    strengths: [
      {
        icon: '⚖️',
        title: 'Logique Forte et Capacité d\'Analyse',
        description: 'Votre très forte logique et votre capacité d\'analyse sont les piliers de cette discipline.'
      },
      {
        icon: '📚',
        title: 'Communication et Recherche Théorique',
        description: 'Votre aisance en communication et votre goût pour la recherche théorique vous permettront de maîtriser l\'interprétation des lois.'
      },
      {
        icon: '🌟',
        title: 'Justice Sociale et Autonomie',
        description: 'Votre motivation à promouvoir la justice sociale et votre besoin d\'autonomie s\'alignent parfaitement avec les responsabilités d\'un professionnel du droit.'
      }
    ]
  },

  'International Politics': {
    description: "La Politique Internationale est une majeure pour ceux qui veulent comprendre et influencer les relations entre nations. Elle vous donne les clés pour analyser les conflits, les politiques étrangères et les organisations internationales.",
    strengths: [
      {
        icon: '🌍',
        title: 'Humanités et Communication',
        description: 'Votre intérêt pour les humanités et votre aisance en communication sont des qualités essentielles dans ce domaine.'
      },
      {
        icon: '🧠',
        title: 'Esprit Analytique et Impact Social',
        description: 'Votre esprit analytique et votre désir d\'avoir un impact social sont des motivations puissantes pour étudier la politique mondiale.'
      },
      {
        icon: '👥',
        title: 'Travail d\'Équipe et Recherche Théorique',
        description: 'Votre préférence pour le travail d\'équipe et la recherche théorique vous aideront à comprendre les enjeux complexes du monde.'
      }
    ]
  },

  'MBBS (Bachelor of Medicine, Bachelor of Surgery)': {
    description: "Le MBBS est la voie vers la médecine. C'est un domaine exigeant qui vous prépare à diagnostiquer, traiter et prévenir les maladies, en vous consacrant à la santé et au bien-être d'autrui.",
    strengths: [
      {
        icon: '🩺',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est la base de ce domaine exigeant.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Direct et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact social direct et votre capacité à travailler en équipe sont des qualités humaines fondamentales pour la pratique de la médecine.'
      },
      {
        icon: '🎯',
        title: 'Rigueur et Résolution de Problèmes',
        description: 'Votre rigueur et votre talent pour la résolution de problèmes vous mèneront à exceller dans cette vocation.'
      }
    ]
  },

  'Public Relations': {
    description: "Les Relations Publiques sont l'art de construire et maintenir une bonne image. Cette majeure vous apprend à gérer la réputation d'une organisation, interagir avec les médias et créer des campagnes percutantes.",
    strengths: [
      {
        icon: '📢',
        title: 'Communication et Créativité',
        description: 'Votre aisance en communication et votre créativité sont les forces motrices de ce domaine.'
      },
      {
        icon: '🌟',
        title: 'Impact Social et Humanités',
        description: 'Votre désir d\'avoir un impact social et votre intérêt pour les humanités sont des atouts précieux.'
      },
      {
        icon: '🤝',
        title: 'Travail d\'Équipe et Organisation',
        description: 'Votre préférence pour le travail d\'équipe et votre sens de l\'organisation sont des qualités essentielles.'
      }
    ]
  },

  'Applied Chemistry': {
    description: "La Chimie Appliquée est la majeure pour les esprits scientifiques qui veulent transformer le monde physique. Elle utilise les principes de la chimie pour résoudre des problèmes pratiques, en développant de nouveaux médicaments, créant des matériaux innovants ou purifiant l'environnement.",
    strengths: [
      {
        icon: '🧪',
        title: 'Profil Scientifique et Passion Recherche',
        description: 'Votre profil scientifique et logique et votre passion pour la recherche sont les piliers de ce domaine.'
      },
      {
        icon: '💡',
        title: 'Innovation et Impact Social',
        description: 'Votre désir d\'innover et d\'avoir un impact social vous motivera à créer des solutions concrètes.'
      },
      {
        icon: '🔬',
        title: 'Travail Pratique et Manuel',
        description: 'Votre goût pour le travail pratique et manuel est un atout majeur pour les expérimentations en laboratoire.'
      }
    ]
  },

  'English': {
    description: "La majeure Anglais est pour ceux passionnés de littérature, langues et culture. Elle vous permet d'explorer la richesse de la langue et de la pensée pour développer une pensée critique et une communication persuasive.",
    strengths: [
      {
        icon: '✍️',
        title: 'Créativité et Communication',
        description: 'Votre forte créativité et votre aisance en communication sont au cœur de cette majeure.'
      },
      {
        icon: '📚',
        title: 'Humanités et Recherche Théorique',
        description: 'Votre intérêt pour les humanités et la recherche théorique vous permettront d\'approfondir la littérature et les cultures.'
      },
      {
        icon: '🎯',
        title: 'Autonomie et Esprit Analytique',
        description: 'Votre besoin d\'autonomie et votre esprit analytique sont des atouts essentiels pour les projets de recherche et d\'écriture.'
      }
    ]
  },

  'Dentistry': {
    description: "La Dentisterie est une science de la santé axée sur la bouche et les dents. Elle combine des connaissances scientifiques pointues avec une grande dextérité pour diagnostiquer et traiter les maladies buccodentaires.",
    strengths: [
      {
        icon: '🦷',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est indispensable pour la pratique de la dentisterie.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Direct et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact social direct et votre capacité à travailler en équipe sont des qualités humaines fondamentales.'
      },
      {
        icon: '🤲',
        title: 'Talent Manuel et Rigueur',
        description: 'Votre talent pour le travail manuel et votre rigueur sont essentiels pour la précision des tâches quotidiennes.'
      }
    ]
  },

  'New Energy Science and Engineering': {
    description: "Cette majeure est l'avenir de l'énergie. Elle vous prépare à concevoir, développer et implémenter des systèmes énergétiques durables pour un monde plus propre et plus efficace.",
    strengths: [
      {
        icon: '⚡',
        title: 'Profil Scientifique et Analytique',
        description: 'Votre profil scientifique et analytique est la base de ce domaine.'
      },
      {
        icon: '🌱',
        title: 'Impact Social Fort et Innovation',
        description: 'Votre désir d\'avoir un fort impact social et d\'innover pour un monde meilleur vous motivera chaque jour.'
      },
      {
        icon: '🔧',
        title: 'Travail Pratique et Résolution de Problèmes',
        description: 'Votre préférence pour le travail pratique et la résolution de problèmes est un atout majeur pour cette discipline.'
      }
    ]
  },

  'Hydraulic Engineering': {
    description: "Le Génie Hydraulique est la science de la gestion de l'eau. Cette majeure vous offre l'opportunité de résoudre des problèmes cruciaux pour la société, en concevant des barrages ou des systèmes de gestion d'eau pour l'irrigation et la production d'énergie.",
    strengths: [
      {
        icon: '💧',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est un atout indispensable pour cette majeure.'
      },
      {
        icon: '📋',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre goût pour le travail pratique sont des qualités essentielles pour gérer des projets sur le terrain.'
      },
      {
        icon: '🌍',
        title: 'Impact Social et Résolution de Problèmes',
        description: 'Votre désir d\'avoir un impact social et votre capacité à résoudre des problèmes complexes vous permettront de réussir.'
      }
    ]
  },

  'Transportation Engineering': {
    description: "Le Génie des Transports est une majeure essentielle pour le développement des villes. Elle vous apprend à concevoir des réseaux routiers, ferroviaires et aéroportuaires pour améliorer la mobilité et créer des infrastructures durables pour la population.",
    strengths: [
      {
        icon: '🚗',
        title: 'Esprit Logique et Organisation',
        description: 'Votre esprit logique et analytique et votre sens de l\'organisation sont des qualités fondamentales pour ce domaine.'
      },
      {
        icon: '🌆',
        title: 'Impact Social et Travail Pratique',
        description: 'Votre désir d\'avoir un impact social et votre préférence pour le travail pratique s\'alignent parfaitement avec les objectifs du domaine.'
      },
      {
        icon: '🤝',
        title: 'Résolution de Problèmes et Travail d\'Équipe',
        description: 'Votre capacité à résoudre des problèmes complexes et votre préférence pour le travail d\'équipe sont des atouts majeurs.'
      }
    ]
  },

  'Bioengineering': {
    description: "La Bioingénierie est la convergence de l'ingénierie et de la biologie. Elle applique les principes de l'ingénierie pour résoudre des problèmes médicaux et biologiques, en concevant des prothèses, implants médicaux ou de nouvelles technologies de traitement.",
    strengths: [
      {
        icon: '🧬',
        title: 'Profil Scientifique et Logique',
        description: 'Votre profil scientifique et logique est le cœur de cette discipline.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Fort et Innovation',
        description: 'Votre désir d\'avoir un fort impact social et d\'innover pour améliorer la santé humaine vous motivera chaque jour.'
      },
      {
        icon: '🔬',
        title: 'Pratique Manuelle et Recherche',
        description: 'Votre goût pour la pratique manuelle et la recherche est un atout majeur pour concevoir de nouvelles technologies médicales.'
      }
    ]
  },

  'Biotechnology': {
    description: "La Biotechnologie utilise des organismes vivants pour créer de nouveaux produits et technologies. Cette majeure est pour ceux qui veulent repousser les frontières de la science pour résoudre des problèmes globaux en génétique, microbiologie ou biochimie.",
    strengths: [
      {
        icon: '🧪',
        title: 'Esprit Scientifique et Passion Recherche',
        description: 'Votre esprit scientifique et logique et votre passion pour la recherche sont la base de ce domaine.'
      },
      {
        icon: '🌱',
        title: 'Innovation et Impact Social',
        description: 'Votre soif d\'innovation et d\'avoir un impact social vous pousseront à créer des solutions durables pour la santé et l\'environnement.'
      },
      {
        icon: '👥',
        title: 'Travail Pratique et Collaboration',
        description: 'Votre préférence pour le travail pratique et la collaboration en laboratoire sont des atouts essentiels.'
      }
    ]
  },

  'Materials Science and Engineering': {
    description: "La Science et Ingénierie des Matériaux est la discipline qui donne vie aux objets qui nous entourent. Cette majeure vous permet de comprendre la structure des matériaux et d'en concevoir de nouveaux, plus légers et plus efficaces, pour des applications en aérospatiale, médecine ou électronique.",
    strengths: [
      {
        icon: '⚗️',
        title: 'Profil Scientifique et Analytique',
        description: 'Votre profil scientifique et analytique est un atout indéniable dans ce domaine.'
      },
      {
        icon: '💡',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre goût pour l\'innovation et la résolution de problèmes vous mènera à concevoir les matériaux du futur.'
      },
      {
        icon: '🛠',
        title: 'Travail Pratique et Manuel',
        description: 'Votre talent pour le travail pratique et manuel est un avantage majeur pour la caractérisation et la création de nouveaux matériaux.'
      }
    ]
  },

  'E-Commerce': {
    description: "L'E-Commerce est le moteur du commerce moderne. Cette majeure vous donnera les clés pour créer et gérer des boutiques en ligne en maîtrisant le marketing digital, la logistique et l'analyse de données.",
    strengths: [
      {
        icon: '💻',
        title: 'Gestion d\'Affaires et Créativité',
        description: 'Votre intérêt pour la gestion d\'affaires et votre créativité sont au cœur de l\'e-commerce.'
      },
      {
        icon: '📊',
        title: 'Organisation et Résolution de Problèmes',
        description: 'Votre sens de l\'organisation et votre capacité à résoudre des problèmes sont essentiels pour le succès de vos projets.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Travail Autonome',
        description: 'Votre désir d\'innover et votre préférence pour le travail autonome s\'alignent parfaitement avec ce domaine en constante évolution.'
      }
    ]
  },

  'Robot Engineering': {
    description: "L'Ingénierie Robotique est la convergence de l'informatique, de la mécanique et de l'électronique. C'est la majeure pour les esprits créatifs et analytiques qui veulent concevoir et construire des robots intelligents.",
    strengths: [
      {
        icon: '🤖',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est la base de ce domaine.'
      },
      {
        icon: '🎨',
        title: 'Créativité et Travail Manuel',
        description: 'Votre goût pour la créativité et le travail manuel vous permettront de concevoir des robots de A à Z.'
      },
      {
        icon: '⚡',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre soif d\'innovation et votre talent pour la résolution de problèmes sont des atouts majeurs pour percer dans ce domaine tourné vers l\'avenir.'
      }
    ]
  },

  'Biomedical Engineering': {
    description: "L'Ingénierie Biomédicale est le lien entre l'ingénierie et la médecine. Elle applique les principes de l'ingénierie pour résoudre des problèmes cliniques et améliorer la santé humaine.",
    strengths: [
      {
        icon: '🏥',
        title: 'Esprit Scientifique et Technologie',
        description: 'Votre esprit scientifique et logique et votre intérêt pour la technologie sont les piliers de cette discipline.'
      },
      {
        icon: '💚',
        title: 'Impact Social Fort et Innovation',
        description: 'Votre désir d\'avoir un fort impact social et d\'innover pour la santé humaine vous motivera chaque jour.'
      },
      {
        icon: '👥',
        title: 'Recherche et Travail d\'Équipe',
        description: 'Votre préférence pour la recherche et le travail d\'équipe sont des atouts essentiels pour les projets collaboratifs.'
      }
    ]
  },

  'Data Science': {
    description: "La Science des Données est la discipline qui donne du sens aux masses d'informations. Cette majeure vous permet d'extraire des connaissances à partir de données pour prédire des tendances et prendre des décisions éclairées.",
    strengths: [
      {
        icon: '📈',
        title: 'Logique Forte et Esprit Scientifique',
        description: 'Votre très forte logique et votre esprit scientifique sont la base de la science des données.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Résolution de Problèmes',
        description: 'Votre soif d\'innovation et votre talent pour la résolution de problèmes vous mèneront à exceller dans ce domaine en pleine expansion.'
      },
      {
        icon: '🔍',
        title: 'Autonomie et Goût Théorique',
        description: 'Votre besoin d\'autonomie et votre goût pour la théorie sont des qualités essentielles pour l\'analyse et la modélisation.'
      }
    ]
  },

  'Economics': {
    description: "L'Économie est la science qui étudie la production, la distribution et la consommation des richesses. Elle vous donne les outils pour analyser les marchés et les politiques publiques, et résoudre des problèmes sociaux et économiques en utilisant les données et la logique.",
    strengths: [
      {
        icon: '💹',
        title: 'Logique Forte et Analyse',
        description: 'Votre très forte logique et votre capacité d\'analyse sont les fondements de la pensée économique.'
      },
      {
        icon: '🌍',
        title: 'Défense de Causes Sociales et Humanités',
        description: 'Votre motivation à défendre une cause sociale et votre intérêt pour les humanités sont des atouts majeurs.'
      },
      {
        icon: '📚',
        title: 'Autonomie et Recherche Théorique',
        description: 'Votre besoin d\'autonomie et votre préférence pour la recherche théorique correspondent parfaitement à ce domaine d\'étude.'
      }
    ]
  },

  'Chemical Engineering': {
    description: "Le Génie Chimique est la majeure qui transforme la science en production. Vous apprendrez à concevoir des processus pour produire des produits chimiques, carburants, plastiques ou médicaments à grande échelle.",
    strengths: [
      {
        icon: '⚗️',
        title: 'Esprit Scientifique et Analytique',
        description: 'Votre esprit scientifique et analytique est la base de ce domaine.'
      },
      {
        icon: '📊',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre goût pour le travail pratique sont des qualités essentielles pour gérer les processus industriels.'
      },
      {
        icon: '🤝',
        title: 'Innovation et Travail d\'Équipe',
        description: 'Votre désir d\'innover et votre préférence pour le travail d\'équipe sont des atouts majeurs.'
      }
    ]
  },

  'Petroleum Engineering': {
    description: "L'Ingénierie Pétrolière est la majeure qui vous plonge au cœur de l'industrie énergétique. Vous étudierez les techniques d'exploration, d'extraction et de traitement du pétrole et du gaz.",
    strengths: [
      {
        icon: '🛢',
        title: 'Esprit Scientifique et Travail Manuel',
        description: 'Votre esprit scientifique et logique et votre intérêt pour le travail manuel sont des qualités fondamentales pour ce domaine.'
      },
      {
        icon: '🏗',
        title: 'Organisation et Travail Pratique',
        description: 'Votre sens de l\'organisation et votre préférence pour le travail pratique sur le terrain sont des atouts majeurs.'
      },
      {
        icon: '⚖️',
        title: 'Autonomie et Stabilité',
        description: 'Votre désir d\'autonomie et de stabilité s\'aligne bien avec cette discipline exigeante.'
      }
    ]
  },

  'Electronic and Information Engineering': {
    description: "Cette majeure est au cœur de la révolution numérique. Elle vous permet de concevoir des puces électroniques, des systèmes de communication et des technologies de l'information pour créer les innovations de demain.",
    strengths: [
      {
        icon: '💻',
        title: 'Logique Forte et Profil Scientifique',
        description: 'Votre très forte logique et votre profil scientifique sont les piliers de cette discipline.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Défis',
        description: 'Votre désir d\'innover et de relever des défis est un puissant moteur pour créer les technologies de demain.'
      },
      {
        icon: '🔬',
        title: 'Travail Pratique et Recherche Théorique',
        description: 'Votre goût pour le travail pratique et la recherche théorique sont des qualités essentielles pour la conception de systèmes complexes.'
      }
    ]
  },

  'Safety Engineering': {
    description: "L'Ingénierie de Sécurité est la discipline qui protège les personnes et les biens. Cette majeure vous apprend à concevoir des systèmes et environnements sûrs en analysant les risques et développant des protocoles.",
    strengths: [
      {
        icon: '🛡',
        title: 'Esprit Logique et Organisation',
        description: 'Votre esprit logique et analytique et votre sens de l\'organisation sont les piliers de cette majeure.'
      },
      {
        icon: '🏥',
        title: 'Impact Social Fort et Stabilité',
        description: 'Votre désir d\'avoir un fort impact social et d\'assurer la stabilité est une motivation puissante.'
      },
      {
        icon: '👥',
        title: 'Travail Pratique et d\'Équipe',
        description: 'Votre préférence pour le travail pratique et d\'équipe est un atout majeur dans ce domaine.'
      }
    ]
  },

  'Mining Engineering': {
    description: "L'Ingénierie Minière est essentielle pour l'extraction des ressources terrestres. Elle vous apprend à concevoir des mines, gérer des opérations et assurer la sécurité dans des environnements exigeants.",
    strengths: [
      {
        icon: '⛏',
        title: 'Esprit Scientifique et Travail Manuel',
        description: 'Votre esprit scientifique et logique et votre intérêt pour le travail manuel sont des qualités fondamentales pour ce domaine.'
      },
      {
        icon: '🔧',
        title: 'Résolution de Problèmes et Travail Pratique',
        description: 'Votre goût pour la résolution de problèmes et votre préférence pour le travail pratique sur le terrain sont des atouts majeurs.'
      },
      {
        icon: '⚖️',
        title: 'Autonomie et Stabilité',
        description: 'Votre désir d\'autonomie et de stabilité s\'aligne bien avec cette discipline exigeante.'
      }
    ]
  },

  'Psychology': {
    description: "La Psychologie est l'étude de l'esprit et du comportement humain. Cette majeure vous apprend à analyser les comportements, mener des recherches et aider les individus à améliorer leur bien-être.",
    strengths: [
      {
        icon: '💭',
        title: 'Intérêt Social et Communication',
        description: 'Votre intérêt pour l\'interaction sociale et humaine et votre aisance en communication sont des qualités essentielles.'
      },
      {
        icon: '📚',
        title: 'Esprit Analytique et Recherche Autonome',
        description: 'Votre esprit analytique et votre préférence pour le travail autonome et la recherche théorique vous permettront d\'approfondir les concepts complexes de l\'esprit humain.'
      },
      {
        icon: '⚖️',
        title: 'Justice Sociale et Résolution de Problèmes',
        description: 'Votre motivation à promouvoir la justice sociale et votre capacité à résoudre des problèmes sont des atouts majeurs.'
      }
    ]
  },

  'Aeronautical Engineering': {
    description: "L'Ingénierie Aéronautique est la science du vol. Cette majeure vous prépare à concevoir, développer et tester des avions et hélicoptères, en appliquant les principes de mécanique, physique et électronique.",
    strengths: [
      {
        icon: '✈️',
        title: 'Profil Scientifique et Logique',
        description: 'Votre profil scientifique et logique est un atout indéniable dans ce domaine.'
      },
      {
        icon: '🚀',
        title: 'Innovation et Défis',
        description: 'Votre désir d\'innover et de relever des défis est un puissant moteur pour percer dans ce domaine.'
      },
      {
        icon: '🛠',
        title: 'Rigueur et Travail Manuel',
        description: 'Votre rigueur et votre talent pour le travail manuel sont des qualités essentielles pour la conception et la construction.'
      }
    ]
  },

  'Aerospace Engineering': {
    description: "L'Ingénierie Aérospatiale est la majeure pour ceux qui veulent explorer l'espace. C'est une discipline qui va au-delà de l'atmosphère terrestre, concevant des fusées, satellites et vaisseaux spatiaux.",
    strengths: [
      {
        icon: '🚀',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est la base de ce domaine.'
      },
      {
        icon: '⭐',
        title: 'Innovation et Défis Extraordinaires',
        description: 'Votre soif d\'innovation et votre désir de dépasser les défis existants vous pousseront vers les étoiles.'
      },
      {
        icon: '🎯',
        title: 'Rigueur et Résolution de Problèmes',
        description: 'Votre rigueur et votre talent pour la résolution de problèmes complexes sont des atouts essentiels pour les missions spatiales.'
      }
    ]
  },

  'Medicine': {
    description: "La Médecine est une voie noble pour ceux qui veulent consacrer leur vie à la santé et au bien-être d'autrui. Cette majeure vous donne une compréhension approfondie du corps humain et de ses maladies.",
    strengths: [
      {
        icon: '🩺',
        title: 'Esprit Scientifique et Logique',
        description: 'Votre esprit scientifique et logique est le fondement de ce domaine exigeant.'
      },
      {
        icon: '❤️',
        title: 'Impact Social Direct et Travail d\'Équipe',
        description: 'Votre désir d\'avoir un impact social direct et votre capacité à travailler en équipe sont des qualités humaines fondamentales pour la pratique de la médecine.'
      },
      {
        icon: '🎯',
        title: 'Rigueur et Résolution de Problèmes',
        description: 'Votre rigueur et votre talent pour la résolution de problèmes vous mèneront à exceller dans cette vocation.'
      }
    ]
  }
};

  // Normaliser les scores sur 100
  const maxScores = {
    Interet_Scientifique_Tech: 25,
    Interet_Artistique_Creatif: 21,
    Interet_Social_Humain: 20,
    Interet_Business_Gestion: 18,
    Interet_Logique_Analytique: 20,
    Competence_Resolution_Problemes: 15,
    Competence_Communication: 16,
    Competence_Organisation: 14,
    Competence_Manuel_Technique: 12,
    Valeur_Impact_Societal: 17,
    Valeur_Innovation_Challenge: 17,
    Valeur_Stabilite_Securite: 5,
    Valeur_Autonomie: 14,
    Pref_Travail_Equipe_Collab: 13,
    Pref_Travail_Autonome: 14,
    Pref_Pratique_Terrain: 8,
    Pref_Theorie_Recherche: 10
  };

// Fonction de calcul du profil utilisateur
const calculateProfile = (answers) => {
  const profile = {
    Interet_Scientifique_Tech: 0,
    Interet_Artistique_Creatif: 0,
    Interet_Social_Humain: 0,
    Interet_Business_Gestion: 0,
    Interet_Logique_Analytique: 0,
    Competence_Resolution_Problemes: 0,
    Competence_Communication: 0,
    Competence_Organisation: 0,
    Competence_Manuel_Technique: 0,
    Valeur_Impact_Societal: 0,
    Valeur_Innovation_Challenge: 0,
    Valeur_Stabilite_Securite: 0,
    Valeur_Autonomie: 0,
    Pref_Travail_Equipe_Collab: 0,
    Pref_Travail_Autonome: 0,
    Pref_Pratique_Terrain: 0,
    Pref_Theorie_Recherche: 0
  };

  // Calculer les scores bruts basés sur les réponses
  Object.entries(answers).forEach(([questionId, answer]) => {
    const scoring = PILLAR_SCORING[questionId];
    if (!scoring) return;

    if (answer.type === 'single') {
      const scores = scoring[answer.value];
      if (scores) {
        Object.entries(scores).forEach(([pillar, points]) => {
          if (profile[pillar] !== undefined) {
            profile[pillar] += points;
          }
        });
      }
    } else if (answer.type === 'multiple') {
      answer.value.forEach(selectedId => {
        const scores = scoring[selectedId];
        if (scores) {
          Object.entries(scores).forEach(([pillar, points]) => {
            if (profile[pillar] !== undefined) {
              profile[pillar] += points;
            }
          });
        }
      });
    } else if (answer.type === 'ranking') {
      Object.entries(answer.value).forEach(([optionId, rank]) => {
        const scores = scoring[optionId];
        if (scores) {
          const multiplier = rank === 1 ? 4 : rank === 2 ? 3 : 2;
          Object.entries(scores).forEach(([pillar, points]) => {
            if (profile[pillar] !== undefined) {
              profile[pillar] += points * multiplier;
            }
          });
        }
      });
    } else if (answer.type === 'slider') {
      Object.entries(answer.value).forEach(([optionId, value]) => {
        const scores = scoring[optionId];
        if (scores) {
          Object.entries(scores).forEach(([pillar, points]) => {
            if (profile[pillar] !== undefined) {
              profile[pillar] += value * points;
            }
          });
        }
      });
    }
  });



  Object.keys(profile).forEach(pillar => {
    const maxScore = maxScores[pillar] || 20;
    profile[pillar] = Math.round((profile[pillar] / maxScore) * 100);
    profile[pillar] = Math.min(100, Math.max(0, profile[pillar]));
  });

  return profile;
};

// Fonction de calcul des correspondances
const getTopMajors = (userProfile) => {
  const results = [];

  Object.entries(MAJOR_PROFILES).forEach(([majorName, idealProfile]) => {
    let totalDistance = 0;
    let weightSum = 0;

    Object.entries(idealProfile).forEach(([pillar, idealScore]) => {
      const userScore = userProfile[pillar] || 0;
      const diff = Math.abs(userScore - idealScore);
      const weight = idealScore;
      
      totalDistance += (diff * weight) * (diff * weight);
      weightSum += weight * weight ;
    });

    const distance = Math.sqrt(totalDistance / weightSum);
    const matchPercentage = Math.max(0, Math.round(100 - distance));

    results.push({
      major: majorName,
      percentage: matchPercentage,
      description: MAJOR_DESCRIPTIONS[majorName]?.description || 'Une excellente majeure qui offre de nombreuses opportunités de carrière.',
      strengths: MAJOR_DESCRIPTIONS[majorName]?.strengths || [
        { icon: '💪', title: 'Profil Compatible', description: 'Votre profil présente une forte compatibilité avec cette majeure.' }
      ]
    });
  });

  return results.sort((a, b) => b.percentage - a.percentage);
};

// Composant Question
const Question = ({ question, onAnswer, currentAnswer, onNext, onPrev, canGoNext, canGoPrev, isLastQuestion }) => {
  const [tempAnswer, setTempAnswer] = useState(currentAnswer || {});

  const handleSingleSelect = (optionId) => {
    const answer = { type: 'single', value: optionId };
    setTempAnswer(answer);
    onAnswer(question.id, answer);
  };

  const handleMultipleSelect = (optionId) => {
    const currentValues = tempAnswer.value || [];
    let newValues;
    
    if (currentValues.includes(optionId)) {
      newValues = currentValues.filter(id => id !== optionId);
    } else {
      if (currentValues.length < question.maxSelections) {
        newValues = [...currentValues, optionId];
      } else {
        return;
      }
    }
    
    const answer = { type: 'multiple', value: newValues };
    setTempAnswer(answer);
    onAnswer(question.id, answer);
  };

  const handleRanking = (optionId, rank) => {
    const currentRankings = tempAnswer.value || {};
    const newRankings = { ...currentRankings };
    
    Object.keys(newRankings).forEach(key => {
      if (newRankings[key] === rank) {
        delete newRankings[key];
      }
    });
    
    newRankings[optionId] = rank;
    
    const answer = { type: 'ranking', value: newRankings };
    setTempAnswer(answer);
    onAnswer(question.id, answer);
  };

  const handleSlider = (optionId, value) => {
    const currentValues = tempAnswer.value || {};
    const answer = { 
      type: 'slider', 
      value: { ...currentValues, [optionId]: value }
    };
    setTempAnswer(answer);
    onAnswer(question.id, answer);
  };

  const renderOptions = () => {
    switch (question.type) {
      case 'single':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginBottom: '30px' }}>
            {question.options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSingleSelect(option.id)}
                style={{
                  padding: '20px',
                  border: tempAnswer.value === option.id ? '2px solid #667eea' : '2px solid #e2e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  backgroundColor: tempAnswer.value === option.id ? '#f7fafc' : 'white',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: '120px'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{option.icon}</div>
                <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{option.text}</div>
              </div>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div>
            <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic' }}>
              Sélectionnez jusqu'à {question.maxSelections} options
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginBottom: '30px' }}>
              {question.options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleMultipleSelect(option.id)}
                  style={{
                    padding: '20px',
                    border: (tempAnswer.value || []).includes(option.id) ? '2px solid #667eea' : '2px solid #e2e8f0',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: (tempAnswer.value || []).includes(option.id) ? '#f7fafc' : 'white',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: '120px',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{option.icon}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{option.text}</div>
                  {(tempAnswer.value || []).includes(option.id) && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#667eea', fontSize: '20px' }}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'ranking':
        return (
          <div>
            <p style={{ color: '#666', marginBottom: '20px', fontStyle: 'italic' }}>
              Classez vos 3 préférences (1 = préféré)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              {question.options.map((option) => (
                <div key={option.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', border: '2px solid #e2e8f0', borderRadius: '12px', backgroundColor: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <div style={{ fontSize: '1.5rem' }}>{option.icon}</div>
                    <div>{option.text}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {[1, 2, 3].map(rank => (
                      <button
                        key={rank}
                        onClick={() => handleRanking(option.id, rank)}
                        style={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          border: (tempAnswer.value || {})[option.id] === rank ? '2px solid #667eea' : '2px solid #e2e8f0',
                          backgroundColor: (tempAnswer.value || {})[option.id] === rank ? '#667eea' : 'white',
                          color: (tempAnswer.value || {})[option.id] === rank ? 'white' : '#666',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        {rank}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'slider':
        return (
          <div style={{ marginBottom: '30px' }}>
            {question.options.map((option) => (
              <div key={option.id} style={{ marginBottom: '25px', padding: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                  <span style={{ fontWeight: 'bold' }}>{option.text}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '12px', color: '#666', minWidth: '80px' }}>Pas important</span>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={(tempAnswer.value || {})[option.id] || 0}
                    onChange={(e) => handleSlider(option.id, parseInt(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontSize: '12px', color: '#666', minWidth: '80px' }}>Très important</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: '#667eea' }}>
                  {(tempAnswer.value || {})[option.id] || 0}/5
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ color: '#667eea', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
          {question.category}
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0 }}>
          {question.question}
        </h2>
      </div>

      {renderOptions()}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={onPrev} 
          disabled={!canGoPrev}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: canGoPrev ? '#e2e8f0' : '#f7fafc',
            color: canGoPrev ? '#2d3748' : '#a0aec0',
            cursor: canGoPrev ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ← Retour
        </button>
        <button 
          onClick={onNext} 
          disabled={!canGoNext}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: canGoNext ? '#667eea' : '#e2e8f0',
            color: canGoNext ? 'white' : '#a0aec0',
            cursor: canGoNext ? 'pointer' : 'not-allowed',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {isLastQuestion ? 'Voir les résultats' : 'Suivant →'}
        </button>
      </div>
    </div>
  );
};

// Composant Results
const Results = ({ results, userProfile, onRestart }) => {
  const topRecommendations = results.slice(0, 3);
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
          🎉 Découvrez les majeures qui vous correspondent le mieux !
        </h1>
        <p style={{ fontSize: '16px', color: '#666' }}>
          Basé sur vos réponses, voici vos 3 meilleures correspondances :
        </p>
      </div>

      <div style={{ marginBottom: '50px' }}>
        {topRecommendations.map((rec, index) => (
          <div 
            key={rec.major} 
            style={{
              marginBottom: '30px',
              padding: '30px',
              border: index === 0 ? '3px solid #667eea' : '2px solid #e2e8f0',
              borderRadius: '16px',
              backgroundColor: 'white',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: index === 0 ? '#667eea' : '#e2e8f0',
                color: index === 0 ? 'white' : '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: '15px'
              }}>
                {index + 1}
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', margin: 0, flex: 1 }}>
                {rec.major}
              </h2>
              <div style={{
                backgroundColor: index === 0 ? '#667eea' : '#48bb78',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: 'bold'
              }}>
                {rec.percentage}% de correspondance
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <p style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.6' }}>
                {rec.description}
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginBottom: '15px' }}>
                Pourquoi cette majeure est faite pour vous :
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {rec.strengths.map((strength, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <span style={{ fontSize: '24px' }}>{strength.icon}</span>
                    <div>
                      <strong style={{ color: '#2d3748' }}>{strength.title}</strong>
                      <p style={{ color: '#666', margin: '5px 0 0 0' }}>{strength.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={onRestart} 
          style={{
            padding: '15px 30px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#667eea',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: '15px'
          }}
        >
          🔄 Refaire le test
        </button>
        <button 
          style={{
            padding: '15px 30px',
            borderRadius: '12px',
            border: '2px solid #667eea',
            backgroundColor: 'transparent',
            color: '#667eea',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }} onClick={() => navigate('/programs')}
        >
          🔍 Explorer tous les programmes
        </button>
      </div>
    </div>
  );
};

// Composant principal
const OrientationTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeTest();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeTest = () => {
    const profile = calculateProfile(answers);
    const recommendations = getTopMajors(profile);
    
    setUserProfile(profile);
    setResults(recommendations);
    setIsCompleted(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
    setUserProfile(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isCompleted && results) {
    return <Results results={results} userProfile={userProfile} onRestart={restartTest} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc', padding: '20px 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#e2e8f0', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
          <div 
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#667eea',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px', color: '#666', fontSize: '14px' }}>
          Question {currentQuestion + 1} sur {questions.length}
        </div>
      </div>

      <Question
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        currentAnswer={answers[questions[currentQuestion].id]}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        canGoNext={!!answers[questions[currentQuestion].id]}
        canGoPrev={currentQuestion > 0}
        isLastQuestion={currentQuestion === questions.length - 1}
      />
    </div>
  );
};

export default OrientationTest;