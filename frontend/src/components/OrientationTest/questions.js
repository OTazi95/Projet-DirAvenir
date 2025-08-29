const questions = [
  // Catégorie 1 : Intérêts et Passions
  {
    id: "q1",
    category: "Intérêts et Passions",
    type: "single",
    question:
      "Si le temps et l'argent n'étaient pas un problème, quelle activité choisiriez-vous pour passer votre journée idéale ?",
    options: [
      { id: "A", text: "Créer quelque chose de nouveau (construire, coder, designer)", icon: "🔧" },
      { id: "B", text: "Comprendre comment les choses fonctionnent (expérimenter, analyser, résoudre des énigmes)", icon: "🔬" },
      { id: "C", text: "Interagir et aider les autres (conseiller, enseigner, soigner)", icon: "🤝" },
      { id: "D", text: "Organiser et gérer des projets (planifier, diriger, optimiser)", icon: "📋" },
      { id: "E", text: "Exprimer ma créativité (peindre, écrire, musique, vidéos)", icon: "🎨" },
    ],
  },
  {
    id: "q2",
    category: "Intérêts et Passions",
    type: "multiple",
    minSelections: 1,
    maxSelections: 3,
    question:
      "Quand vous naviguez sur internet ou regardez des vidéos, quel type de contenu retient le plus votre attention ?",
    options: [
      { key: "tech", label: "Découvertes scientifiques, Technologie, innovation", icon: "🚀" },
      { key: "art", label: "Art et culture, Design et création", icon: "🎭" },
      { key: "social", label: "Développement perso, Causes sociales", icon: "💖" },
      { key: "business", label: "Actualités économiques, Stratégies d'entreprise", icon: "💼" },
      { key: "organization", label: "Organisation, Gestion de projets", icon: "📊" },
      { key: "manual", label: "Sports, Bricolage et artisanat", icon: "🔨" },
    ],
  },
  {
    id: "q3",
    category: "Intérêts et Passions",
    type: "single",
    question: "Imaginez un magasin. Vers quelle section êtes-vous naturellement attiré(e) ?",
    options: [
      { id: "A", text: "Rayons d'électronique, gadgets ou outils", icon: "📡" },
      { id: "B", text: "Livres de science, de philosophie ou documentaires", icon: "📚" },
      { id: "C", text: "Matériel d'art, instruments de musique, objets de déco", icon: "🎸" },
      { id: "D", text: "Livres de développement personnel, jeux de société/vidéo", icon: "🧠" },
      { id: "E", text: "Vêtements, accessoires de mode, articles de luxe", icon: "👗" },
    ],
  },

  // Catégorie 2 : Compétences et Aptitudes
  {
    id: "q4",
    category: "Compétences et Aptitudes",
    type: "single",
    question: "Face à un problème complexe, quelle est votre première réaction ?",
    options: [
      { id: "A", text: "Le décomposer en petites étapes logiques", icon: "🧩" },
      { id: "B", text: "Chercher les données et les faits", icon: "📊" },
      { id: "C", text: "Imaginer des solutions originales", icon: "💡" },
      { id: "D", text: "Demander l’avis des autres et co-construire", icon: "👥" },
    ],
  },
  {
    id: "q5",
    category: "Compétences et Aptitudes",
    type: "ranking", // 3 choix, pondérés 4/3/2
    question: "Parmi ces activités, lesquelles vous viennent le plus naturellement ? (Classez 3)",
    options: [
      { key: "budget", label: "Gérer un budget", icon: "💰" },
      { key: "event", label: "Organiser un événement", icon: "🗂️" },
      { key: "write", label: "Écrire un texte clair", icon: "✍️" },
      { key: "fix", label: "Réparer un appareil", icon: "🛠️" },
      { key: "draw", label: "Dessiner ou peindre", icon: "🎨" },
      { key: "equation", label: "Résoudre une équation complexe", icon: "➗" },
      { key: "convince", label: "Convaincre quelqu'un d'une idée", icon: "🗣️" },
      { key: "counsel", label: "Écouter et conseiller un ami", icon: "🤗" },
    ],
  },
  {
    id: "q6",
    category: "Compétences et Aptitudes",
    type: "single",
    question: "Quand vous devez apprendre quelque chose de nouveau, comment préférez-vous le faire ?",
    options: [
      { id: "A", text: "Lire et prendre des notes détaillées", icon: "📖" },
      { id: "B", text: "Regarder des tutoriels vidéo/démonstrations", icon: "🎥" },
      { id: "C", text: "Essayer par moi-même et pratiquer", icon: "🧪" },
      { id: "D", text: "Discuter avec d'autres et échanger des idées", icon: "💬" },
    ],
  },

  // Catégorie 3 : Valeurs et Objectifs
  {
    id: "q7",
    category: "Valeurs et Objectifs",
    type: "single",
    question: "Quel type d'impact aimeriez-vous avoir dans le monde ?",
    options: [
      { id: "A", text: "Améliorer la vie des individus directement", icon: "❤️" },
      { id: "B", text: "Créer des systèmes / produits plus efficaces", icon: "🧠" },
      { id: "C", text: "Contribuer à la beauté et à la culture", icon: "🎭" },
      { id: "D", text: "Défendre une cause / promouvoir la justice sociale", icon: "⚖️" },
    ],
  },
  {
    id: "q8",
    category: "Valeurs et Objectifs",
    type: "single",
    question:
      "Choisissez l'image qui représente le mieux l'environnement de travail où vous vous épanouirez le plus.",
    options: [
      { id: "A", text: "Un laboratoire ou un centre de recherche", icon: "🏛️" },
      { id: "B", text: "Un bureau ouvert et collaboratif", icon: "🏢" },
      { id: "C", text: "Un atelier ou un studio créatif", icon: "🎙️" },
      { id: "D", text: "L'extérieur, la nature, un chantier", icon: "🏞️" },
      { id: "E", text: "Un environnement calme et individuel", icon: "📚" },
    ],
  },
  {
    id: "q9",
    category: "Valeurs et Objectifs",
    type: "sliders", // 4 curseurs 0..5
    question: "Quand vous pensez à votre future carrière, qu'est-ce qui est le plus important ?",
    labels: {
      securite: "Sécurité / Stabilité de l'emploi",
      innovation: "Innovation / Être à la pointe",
      autonomie: "Autonomie / Liberté de décision",
      salaire: "Salaire élevé / Opportunités",
    },
  },
  {
    id: "q10",
    category: "Valeurs et Objectifs",
    type: "single",
    question: "Si vous deviez résoudre un grand problème, quelle serait votre motivation principale ?",
    options: [
      { id: "A", text: "Comprendre la racine du problème", icon: "🔎" },
      { id: "B", text: "Mettre en place rapidement une solution concrète", icon: "⚙️" },
      { id: "C", text: "Rallier les gens autour de la solution", icon: "📣" },
      { id: "D", text: "Développer une solution technologique avancée", icon: "🤖" },
    ],
  },

  // Catégorie 4 : Préférences de Travail et Personnalité
  {
    id: "q11",
    category: "Préférences de Travail",
    type: "single",
    question: "Préférez-vous travailler :",
    options: [
      { id: "A", text: "Seul(e), en totale autonomie", icon: "🧍‍♀️" },
      { id: "B", text: "En petite équipe", icon: "👥" },
      { id: "C", text: "Dans une grande structure", icon: "🏛️" },
    ],
  },
  {
    id: "q12",
    category: "Préférences de Travail",
    type: "single",
    question: "Lors d'une présentation, vous préférez :",
    options: [
      { id: "A", text: "Présenter clairement les faits", icon: "📑" },
      { id: "B", text: "Raconter une histoire pour capter l'attention", icon: "📖" },
      { id: "C", text: "Répondre aux questions et interagir", icon: "🙋" },
    ],
  },
  {
    id: "q13",
    category: "Préférences de Travail",
    type: "single",
    question: "Quand vous prenez une décision importante, vous vous fiez le plus à :",
    options: [
      { id: "A", text: "La logique et l'analyse des faits", icon: "🧠" },
      { id: "B", text: "Votre intuition et vos sentiments", icon: "💙" },
      { id: "C", text: "L'avis des personnes que vous respectez", icon: "👨‍👩‍👧‍👦" },
    ],
  },

  // Catégorie 5 : Matières et Parcours Académiques
  {
    id: "q14",
    category: "Matières et Parcours",
    type: "multiple",
    minSelections: 2,
    maxSelections: 3,
    question:
      "Parmi ces groupes de matières, lesquels vous ont le plus passionné(e) ? (2 à 3 choix)",
    options: [
      { key: "sciences", label: "Sciences (Maths, Physique-Chimie, SVT)" },
      { key: "litterature", label: "Littérature et Langues" },
      { key: "shs", label: "Sciences Sociales et Humaines" },
      { key: "arts", label: "Arts et Design" },
      { key: "tech", label: "Technologie et Informatique" },
      { key: "gestion", label: "Gestion et Économie" },
    ],
  },
];

export default questions;
