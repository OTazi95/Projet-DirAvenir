// --- Les 17 piliers (cahier des charges) ---
export const PILLAR_KEYS = [
  "Interet_Scientifique_Tech",
  "Interet_Artistique_Creatif",
  "Interet_Social_Humain",
  "Interet_Business_Gestion",
  "Interet_Logique_Analytique",
  "Competence_Resolution_Problemes",
  "Competence_Communication",
  "Competence_Organisation",
  "Competence_Manuel_Technique",
  "Valeur_Impact_Societal",
  "Valeur_Innovation_Challenge",
  "Valeur_Stabilite_Securite",
  "Valeur_Autonomie",
  "Pref_Travail_Equipe_Collab",
  "Pref_Travail_Autonome",
  "Pref_Pratique_Terrain",
  "Pref_Theorie_Recherche",
];

// --- Matrice de points par question/option (conforme aux tableaux du cahier des charges) ---
export const Q_MAPPING = {
  q1: {
    A: { Interet_Scientifique_Tech: 5, Interet_Artistique_Creatif: 3, Valeur_Innovation_Challenge: 4, Competence_Manuel_Technique: 2 },
    B: { Interet_Scientifique_Tech: 4, Interet_Logique_Analytique: 5, Competence_Resolution_Problemes: 4, Pref_Theorie_Recherche: 3 },
    C: { Interet_Social_Humain: 5, Valeur_Impact_Societal: 5, Competence_Communication: 4 },
    D: { Interet_Business_Gestion: 5, Competence_Organisation: 5, Pref_Travail_Equipe_Collab: 3 },
    E: { Interet_Artistique_Creatif: 5, Valeur_Innovation_Challenge: 2, Pref_Travail_Autonome: 3 },
  },
  q2: {
    // multiple (jusqu'à 3)
    tech: { Interet_Scientifique_Tech: 3, Valeur_Innovation_Challenge: 2 },
    art: { Interet_Artistique_Creatif: 3 },
    social: { Interet_Social_Humain: 3, Valeur_Impact_Societal: 2 },
    business: { Interet_Business_Gestion: 3 },
    organization: { Competence_Organisation: 3 },
    manual: { Competence_Manuel_Technique: 3 },
  },
  q3: {
    A: { Interet_Scientifique_Tech: 3, Competence_Manuel_Technique: 2 },
    B: { Interet_Logique_Analytique: 3, Pref_Theorie_Recherche: 2 },
    C: { Interet_Artistique_Creatif: 3 },
    D: { Interet_Social_Humain: 3 },
    E: { Interet_Business_Gestion: 3, Interet_Artistique_Creatif: 2 },
  },
  q4: {
    A: { Competence_Resolution_Problemes: 4, Interet_Logique_Analytique: 4 },
    B: { Interet_Scientifique_Tech: 3, Interet_Logique_Analytique: 3, Pref_Theorie_Recherche: 2 },
    C: { Interet_Artistique_Creatif: 4, Valeur_Innovation_Challenge: 4 },
    D: { Competence_Communication: 4, Pref_Travail_Equipe_Collab: 4, Interet_Social_Humain: 2 },
  },
  q5: {
    // ranking: 1er=+4, 2e=+3, 3e=+2 (appliqué aux piliers associés)
    budget: ["Interet_Business_Gestion", "Competence_Organisation", "Interet_Logique_Analytique"],
    event: ["Competence_Organisation", "Pref_Travail_Equipe_Collab", "Competence_Communication"],
    write: ["Competence_Communication", "Interet_Artistique_Creatif"],
    fix: ["Competence_Manuel_Technique", "Interet_Scientifique_Tech"],
    draw: ["Interet_Artistique_Creatif", "Competence_Manuel_Technique"],
    equation: ["Interet_Logique_Analytique", "Interet_Scientifique_Tech"],
    convince: ["Competence_Communication", "Interet_Business_Gestion"],
    counsel: ["Interet_Social_Humain", "Competence_Communication"],
  },
  q6: {
    A: { Pref_Theorie_Recherche: 4, Interet_Logique_Analytique: 3 },
    B: { Interet_Scientifique_Tech: 3 },
    C: { Competence_Manuel_Technique: 4, Pref_Pratique_Terrain: 4 },
    D: { Competence_Communication: 4, Pref_Travail_Equipe_Collab: 4 },
  },
  q7: {
    A: { Valeur_Impact_Societal: 5, Interet_Social_Humain: 4 },
    B: { Valeur_Innovation_Challenge: 4, Interet_Scientifique_Tech: 3 },
    C: { Interet_Artistique_Creatif: 5 },
    D: { Valeur_Impact_Societal: 5, Interet_Social_Humain: 3 },
  },
  q8: {
    A: { Pref_Theorie_Recherche: 4, Interet_Scientifique_Tech: 3 },
    B: { Pref_Travail_Equipe_Collab: 4, Interet_Business_Gestion: 2 },
    C: { Interet_Artistique_Creatif: 4, Competence_Manuel_Technique: 3 },
    D: { Pref_Pratique_Terrain: 4, Competence_Manuel_Technique: 3 },
    E: { Pref_Travail_Autonome: 4, Pref_Theorie_Recherche: 2 },
  },
  q9: {
    // sliders: valeurs directes 0..5
    sliders: {
      securite: "Valeur_Stabilite_Securite",
      innovation: "Valeur_Innovation_Challenge",
      autonomie: "Valeur_Autonomie",
      salaire: "Interet_Business_Gestion",
    },
  },
  q10: {
    A: { Interet_Logique_Analytique: 4, Competence_Resolution_Problemes: 3 },
    B: { Pref_Pratique_Terrain: 4, Competence_Resolution_Problemes: 3 },
    C: { Competence_Communication: 4, Pref_Travail_Equipe_Collab: 3 },
    D: { Valeur_Innovation_Challenge: 4, Interet_Scientifique_Tech: 3 },
  },
  q11: {
    A: { Pref_Travail_Autonome: 5, Valeur_Autonomie: 4 },
    B: { Pref_Travail_Equipe_Collab: 5 },
    C: { Valeur_Stabilite_Securite: 4, Competence_Organisation: 3 },
  },
  q12: {
    A: { Competence_Organisation: 4, Interet_Logique_Analytique: 3 },
    B: { Competence_Communication: 4, Interet_Artistique_Creatif: 3 },
    C: { Competence_Communication: 4, Interet_Social_Humain: 3, Pref_Travail_Equipe_Collab: 2 },
  },
  q13: {
    A: { Interet_Logique_Analytique: 5 },
    B: { Interet_Artistique_Creatif: 4, Pref_Travail_Autonome: 3 },
    C: { Interet_Social_Humain: 4, Pref_Travail_Equipe_Collab: 3 },
  },
  q14: {
    // multiple (2..3)
    sciences: { Interet_Scientifique_Tech: 4, Interet_Logique_Analytique: 4 },
    litterature: { Interet_Social_Humain: 3, Competence_Communication: 3 },
    shs: { Interet_Social_Humain: 4, Pref_Theorie_Recherche: 2 },
    arts: { Interet_Artistique_Creatif: 4 },
    tech: { Interet_Scientifique_Tech: 4, Interet_Logique_Analytique: 3 },
    gestion: { Interet_Business_Gestion: 4, Competence_Organisation: 3 },
  },
};

// ---- Accumulation des points bruts (answers -> rawScores) ----
export function computeRawScoresFromAnswers(answers, M = Q_MAPPING) {
  const scores = Object.fromEntries(PILLAR_KEYS.map((k) => [k, 0]));
  // Helper add
  const add = (obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      scores[k] = (scores[k] || 0) + v;
    });
  };

  // q1,3,4,6,7,8,10,11,12,13 : single
  ["q1","q3","q4","q6","q7","q8","q10","q11","q12","q13"].forEach((qid) => {
    const ans = answers[qid];
    if (ans && M[qid]?.[ans]) add(M[qid][ans]);
  });

  // q2, q14: multiple
  ["q2","q14"].forEach((qid) => {
    const arr = answers[qid];
    if (Array.isArray(arr)) {
      arr.forEach((key) => {
        const map = M[qid]?.[key];
        if (map) add(map);
      });
    }
  });

  // q5: ranking (pondérations 4/3/2)
  if (Array.isArray(answers.q5)) {
    const weights = [4, 3, 2];
    answers.q5.forEach((key, idx) => {
      const pillars = M.q5[key] || [];
      const w = weights[idx] || 0;
      pillars.forEach((p) => (scores[p] = (scores[p] || 0) + w));
    });
  }

  // q9: sliders
  if (answers.q9 && M.q9?.sliders) {
    const map = M.q9.sliders;
    Object.entries(answers.q9).forEach(([k, val]) => {
      const pillar = map[k];
      if (pillar) scores[pillar] = (scores[pillar] || 0) + Number(val || 0);
    });
  }

  return scores;
}

// ---- Calcul du score max théorique par pilier (normalisation) ----
export function computeMaxScoresTheoretical(questions = [], M = Q_MAPPING) {
  // On calcule, pour chaque question, la contribution max possible à chaque pilier
  // en respectant les contraintes (single: max d’une option ; multiple: somme des k meilleures ; ranking: 4+3+2 si l’option touche le pilier ; sliders: 5).
  const max = Object.fromEntries(PILLAR_KEYS.map((k) => [k, 0]));

  const add = (obj) => {
    Object.entries(obj).forEach(([k, v]) => (max[k] += v));
  };

  // Iterate questions
  questions.forEach((q) => {
    if (q.id === "q9") {
      // sliders: chaque curseur max 5
      add({
        Valeur_Stabilite_Securite: 5,
        Valeur_Innovation_Challenge: 5,
        Valeur_Autonomie: 5,
        Interet_Business_Gestion: 5,
      });
      return;
    }

    if (q.type === "single") {
      // pour chaque pilier: prendre le max parmi les options
      const localMax = Object.fromEntries(PILLAR_KEYS.map((k) => [k, 0]));
      const mapQ = M[q.id] || {};
      Object.values(mapQ).forEach((optMap) => {
        Object.entries(optMap).forEach(([p, v]) => {
          if (v > localMax[p]) localMax[p] = v;
        });
      });
      add(localMax);
      return;
    }

    if (q.type === "multiple") {
      const k = q.maxSelections || Object.keys(M[q.id] || {}).length;
      const mapQ = M[q.id] || {};
      // pour chaque pilier, prendre la somme des k meilleures contributions sur des options (si plusieurs options contribuent)
      const bucket = Object.fromEntries(PILLAR_KEYS.map((p) => [p, []]));
      Object.values(mapQ).forEach((optMap) => {
        Object.entries(optMap).forEach(([p, v]) => {
          bucket[p].push(v);
        });
      });
      const localMax = {};
      Object.entries(bucket).forEach(([p, arr]) => {
        arr.sort((a, b) => b - a);
        const topK = arr.slice(0, k);
        localMax[p] = topK.reduce((s, x) => s + x, 0);
      });
      add(localMax);
      return;
    }

    if (q.type === "ranking") {
      // On peut choisir 3 options, pondérations 4/3/2 ; une option contribue à 2 ou 3 piliers.
      // Max pour 1 pilier = somme 4+3+2 si trois options différentes impactent ce pilier, sinon moins.
      const mapQ = M[q.id] || {};
      const appearCount = Object.fromEntries(PILLAR_KEYS.map((p) => [p, 0]));
      Object.values(mapQ).forEach((pillars) => {
        pillars.forEach((p) => (appearCount[p] += 1));
      });
      const weights = [4, 3, 2];
      const localMax = {};
      Object.entries(appearCount).forEach(([p, c]) => {
        const usable = Math.min(c, 3); // au plus 3 choix
        localMax[p] = weights.slice(0, usable).reduce((s, x) => s + x, 0);
      });
      add(localMax);
      return;
    }
  });

  return max;
}

// ---- Normalisation 0..100 ----
export function normalizeScores0to100(raw, max) {
  const out = {};
  PILLAR_KEYS.forEach((p) => {
    const m = Math.max(1, max[p] || 1);
    out[p] = Math.round((100 * (raw[p] || 0)) / m);
    if (out[p] > 100) out[p] = 100;
    if (out[p] < 0) out[p] = 0;
  });
  return out;
}

// ---- Matching: distance euclidienne pondérée -> score% ----
export function weightedEuclideanMatchScores(userProfile100, MAJOR_PROFILES) {
  // Pour chaque majeure, poids = score idéal (cahier des charges)
  const res = {};
  Object.entries(MAJOR_PROFILES).forEach(([major, ideal]) => {
    let sumSq = 0;
    let sumSqMax = 0;
    PILLAR_KEYS.forEach((p) => {
      const w = Math.max(0, ideal[p] || 0); // poids
      const diff = Math.abs((userProfile100[p] || 0) - (ideal[p] || 0));
      sumSq += (diff * w) * (diff * w);
      // distance max si user=0 et ideal=100 (ou inverse): diffMax=100
      sumSqMax += (100 * w) * (100 * w);
    });
    const dist = Math.sqrt(sumSq);
    const distMax = Math.sqrt(sumSqMax) || 1;
    const score = 100 * (1 - dist / distMax);
    res[major] = Math.max(0, Math.min(100, score));
  });
  return res;
}

export function topKMatches(scoresObj, k = 3) {
  return Object.entries(scoresObj)
    .map(([major, score]) => ({ major, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
