import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import MAJOR_PROFILES from "./profiles";
import MAJOR_DESCRIPTIONS from "./descriptions";
import {
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

  const { normalizedUserProfile, ranked } = useMemo(() => {
    const raw = computeRawScoresFromAnswers(safeAnswers);
    const max = computeMaxScoresTheoretical();
    const normalized = normalizeScores0to100(raw, max);
    const matchScores = weightedEuclideanMatchScores(normalized, MAJOR_PROFILES);
    const rankedRes = topKMatches(matchScores, 3);
    return { normalizedUserProfile: normalized, ranked: rankedRes };
  }, [safeAnswers]);

  return (
    <div className="results-container">
      <h2 className="orientation-title">
        Great, this is your <span className="highlight">major match</span>
      </h2>

      {ranked.map(({ major, score }) => {
        const desc = MAJOR_DESCRIPTIONS[major];
        
        // Skip rendering this major if no description is found
        if (!desc) {
          console.warn(`No description found for major: ${major}`);
          return null;
        }

        return (
          <section key={major} className="major-section">
            <div className="major-card">
              <div className="circle-score">
                <div className="score-text">
                  <strong>{Math.round(score)}%</strong>
                  <span>match with</span>
                  <span className="major-name">{major}</span>
                </div>
              </div>

              <h3 className="major-title">{major}</h3>
              <p className="compatibility-text">
                Your compatibility is: <span className="high-tag">HIGH</span>
              </p>

              {desc.description && (
                <p className="major-description">{desc.description}</p>
              )}

              {desc.strengths && desc.strengths.length > 0 && (
                <ul className="why-bullets">
                  {desc.strengths.map((strength, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span> {strength.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      {/* New CTA Design */}
      <motion.div 
        className="results-cta-container" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="results-cta-text" style={{
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: '2rem',
          lineHeight: '1.5',
          margin: 0,
          marginLeft: '50px',
          maxWidth: '40%',
          textAlign: 'left',
        }}>
          Interested in these<br />programs and ready<br />to get started?
        </h3>
        <button className="results-cta-button" onClick={() => navigate("/programs")}>
          Apply Now
        </button>
      </motion.div>
    </div>
  );
}

function explainWhy(major, userProfile) {
  const ideal = MAJOR_PROFILES[major] || {};
  const scored = Object.keys(ideal).map((p) => {
    const diff = Math.abs((userProfile[p] ?? 0) - ideal[p]);
    const weight = ideal[p];
    const val = (100 - diff) * weight;
    return { pillar: p, val };
  });

  scored.sort((a, b) => b.val - a.val);
  const best = scored.slice(0, 3).map((x) => x.pillar);

  const humanReadable = {
    Interet_Scientifique_Tech: "scientific and technological interest",
    Interet_Artistique_Creatif: "artistic creativity",
    Interet_Social_Humain: "social and human sense",
    Interet_Business_Gestion: "business and management aptitude",
    Interet_Logique_Analytique: "logic and analysis",
    Competence_Resolution_Problemes: "problem-solving ability",
    Competence_Communication: "communication",
    Competence_Organisation: "organization",
    Competence_Manuel_Technique: "technical and manual skill",
    Valeur_Impact_Societal: "desire for societal impact",
    Valeur_Innovation_Challenge: "taste for innovation and challenges",
    Valeur_Stabilite_Securite: "search for stability and security",
    Valeur_Autonomie: "search for autonomy",
    Pref_Travail_Equipe_Collab: "preference for teamwork and collaboration",
    Pref_Travail_Autonome: "preference for autonomous work",
    Pref_Pratique_Terrain: "taste for fieldwork and practice",
    Pref_Theorie_Recherche: "interest in theory and research",
  };

  return best.map(
    (p) => `Your ${humanReadable[p]} is particularly aligned with this major.`
  );
}