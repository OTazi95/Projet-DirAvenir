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

  const {ranked } = useMemo(() => {
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
  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
    {desc.strengths.map((strength, i) => (
      <li
        key={i}
        style={{
          marginBottom: "1rem",
        }}
      >
        {/* Ligne 1 : Check + Titre + Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1px",
            fontWeight: "bold",
          }}
        >
          <span className="check-icon">✓</span>
          <span style={{ textAlign: "left"}}>{strength.title}</span>
          <span>{strength.icon}</span>
        </div>

        <div className="major-description"
        style={{ textAlign: "left", marginLeft: "1.5rem"}}
        >
          {strength.description}
        </div>
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

