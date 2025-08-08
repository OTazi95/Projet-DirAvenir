// frontend/src/pages/OrientationResults.jsx
import React, { useEffect, useState } from "react";
import "../styles/Orientation.css";
import { useNavigate } from "react-router-dom";

function OrientationResults() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("orientation_result");
    if (!raw) {
      navigate("/orientation"); // back to test
      return;
    }
    setData(JSON.parse(raw));
  }, [navigate]);

  if (!data) return null;

  const matches = data.matches || [];
  // top 3 highlighted
  const top3 = matches.slice(0,3);

  return (
    <div className="orientation-wrapper">
      <h1 className="orientation-title">Résultats de votre test <span className="highlight">DirAvenir</span></h1>
      <div className="results-summary">
        <h2>Top recommandations</h2>
        <div className="top-cards">
          {top3.map((m, idx) => (
            <div key={m.major} className={`top-card top-${idx}`}>
              <h3>{m.major}</h3>
              <div className="score">{m.score}%</div>
              <p>{m.description}</p>
            </div>
          ))}
        </div>

        <h2>Toutes les correspondances</h2>
        <div className="all-list">
          {matches.map(m => (
            <div className="match-row" key={m.major}>
              <div className="match-left">
                <strong>{m.major}</strong>
                <p className="muted">{m.description.slice(0,200)}{m.description.length>200?"...":""}</p>
              </div>
              <div className="match-right">
                <div className="progress-bar">
                  <div className="progress" style={{width: `${m.score}%`}} />
                </div>
                <div className="percent">{m.score}%</div>
              </div>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn-secondary" onClick={()=>{
            localStorage.removeItem("orientation_result");
            navigate("/");
          }}>Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
}

export default OrientationResults;
