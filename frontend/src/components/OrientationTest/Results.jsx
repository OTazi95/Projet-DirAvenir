import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MAJOR_PROFILES from "./profiles";
import MAJOR_DESCRIPTIONS from "./descriptions";
import {
  PILLAR_KEYS,
  computeRawScoresFromAnswers,
  computeMaxScoresTheoretical,
  normalizeScores0to100,
  weightedEuclideanMatchScores,
  topKMatches,
} from "./scoring";
import "./OrientationTest.css";

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const safeAnswers = state?.answers || {};

  // Recalcule (au cas où l’utilisateur arrive directement ici)
  const { normalizedUserProfile, ranked } = useMemo(() => {
    const raw = computeRawScoresFromAnswers(safeAnswers);
    const max = computeMaxScoresTheoretical();
    const normalized = normalizeScores0to100(raw, max);

    const matchScores = weightedEuclideanMatchScores(
      normalized,
      MAJOR_PROFILES
    );
    const rankedRes = topKMatches(matchScores, 3);
    return { normalizedUserProfile: normalized, ranked: rankedRes };
  }, [safeAnswers]);

  return (
    <div className="results-container">
      <h2 className="orientation-title">
        Découvrez les majeures qui vous correspondent le mieux !
      </h2>

      <div className="top3-grid">
        {ranked.map(({ major, score }) => {
          const desc = MAJOR_DESCRIPTIONS[major];
          return (
            <div key={major} className="result-card">
              <div className="result-head">
                <h3 className="result-major">{major}</h3>
                <div className="result-score">{Math.round(score)}%</div>
              </div>
              {desc?.description && (
                <p className="result-desc">{desc.description}</p>
              )}

              {/* Pourquoi c'est pour vous — piliers forts en commun */}
              <div className="why">
                <h4>Pourquoi cette majeure est faite pour vous</h4>
                <ul className="bullets">
                  {explainWhy(major, normalizedUserProfile).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="actions-bottom">
        <button
          className="nav-btn ghost"
          onClick={() => navigate("/orientation/test")}
        >
          Refaire le test
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate("/programs")}
        >
          Voir les programmes disponible
        </button>
      </div>
    </div>
  );
}

/** construit un petit texte dynamique basé sur les piliers les plus alignés */
function explainWhy(major, userProfile) {
  const ideal = MAJOR_PROFILES[major] || {};
  // Mesure d’alignement simple: (100 - |diff|)*poids
  const scored = Object.keys(ideal).map((p) => {
    const diff = Math.abs((userProfile[p] ?? 0) - ideal[p]);
    const weight = ideal[p]; // poids = score idéal (cahier de charges)
    const val = (100 - diff) * weight;
    return { pillar: p, val };
  });
  scored.sort((a, b) => b.val - a.val);
  const best = scored.slice(0, 3).map((x) => x.pillar);
  const human = {
    Interet_Scientifique_Tech: "intérêt scientifique et technologique",
    Interet_Artistique_Creatif: "créativité artistique",
    Interet_Social_Humain: "sens social et humain",
    Interet_Business_Gestion: "appétence business et gestion",
    Interet_Logique_Analytique: "logique et analyse",
    Competence_Resolution_Problemes: "capacité à résoudre des problèmes",
    Competence_Communication: "communication",
    Competence_Organisation: "organisation",
    Competence_Manuel_Technique: "habileté technique et manuelle",
    Valeur_Impact_Societal: "volonté d’impact sociétal",
    Valeur_Innovation_Challenge: "goût pour l’innovation et les défis",
    Valeur_Stabilite_Securite: "recherche de stabilité et sécurité",
    Valeur_Autonomie: "recherche d’autonomie",
    Pref_Travail_Equipe_Collab: "préférence pour le travail en équipe",
    Pref_Travail_Autonome: "préférence pour le travail autonome",
    Pref_Pratique_Terrain: "goût pour le terrain et la pratique",
    Pref_Theorie_Recherche: "intérêt pour la théorie et la recherche",
  };
  return best.map(
    (p) =>
      `Votre ${human[p]} est particulièrement aligné(e) avec cette majeure.`
  );
}
