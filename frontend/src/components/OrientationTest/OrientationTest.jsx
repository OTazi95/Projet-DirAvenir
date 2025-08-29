import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import questions from "./questions";
import {
  PILLAR_KEYS,
  Q_MAPPING,
  computeRawScoresFromAnswers,
  computeMaxScoresTheoretical,
  normalizeScores0to100,
} from "./scoring";
import "./OrientationTest.css";

/**
 * UI/UX conforme au cahier de charges:
 * - single  : choix unique (boutons)
 * - multiple: multi-sélection avec limite max
 * - ranking : classement 3 choix (pondérations 4/3/2)
 * - sliders : 4 curseurs (Q9)
 *
 * Avec vérification d'authentification et sauvegarde des résultats
 */

export default function ProtectedOrientationTest() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // answers structure:
  // - single: answers[qId] = 'A' | 'B' ...
  // - multiple: answers[qId] = ['optKey','optKey',...]
  // - ranking: answers[qId] = ['optKey1','optKey2','optKey3']  // ordre = 1er,2e,3e
  // - sliders(Q9): answers[q9] = { securite:0-5, innovation:0-5, autonomie:0-5, salaire:0-5 }
  const [answers, setAnswers] = useState({});

  // Vérification de l'authentification au chargement
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = getAuthToken();
    const authUser = getAuthUser();
    
    if (!token || !authUser) {
      setIsAuthenticated(false);
      setIsLoading(false);
      // Rediriger vers login avec redirect pour revenir au test après connexion
      navigate('/login?redirect=/orientation-test');
      return;
    }

    setIsAuthenticated(true);
    setUserInfo(authUser);
    setIsLoading(false);
  };

  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const getAuthUser = () => {
    const localAuthUser = localStorage.getItem("auth_user");
    const sessionAuthUser = sessionStorage.getItem("auth_user");
    
    let userData = null;
    
    if (localAuthUser) {
      try {
        userData = JSON.parse(localAuthUser);
      } catch (error) {
        console.error('Erreur parsing localStorage auth_user:', error);
      }
    } else if (sessionAuthUser) {
      try {
        userData = JSON.parse(sessionAuthUser);
      } catch (error) {
        console.error('Erreur parsing sessionStorage auth_user:', error);
      }
    }
    
    return userData;
  };

  const q = questions[current];

  const handleSingle = (optId) => {
    setAnswers((prev) => ({ ...prev, [q.id]: optId }));
  };

  const toggleMulti = (optKey) => {
    const max = q.maxSelections || Infinity;
    setAnswers((prev) => {
      const cur = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      const exists = cur.includes(optKey);
      if (exists) {
        return { ...prev, [q.id]: cur.filter((x) => x !== optKey) };
      }
      if (cur.length >= max) return prev; // limite
      return { ...prev, [q.id]: [...cur, optKey] };
    });
  };

  // Ranking: simple boutons "↑/↓" + bouton "Choisir/Retirer"
  const addToRanking = (optKey) => {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      if (cur.includes(optKey)) return prev;
      if (cur.length >= 3) return prev;
      return { ...prev, [q.id]: [...cur, optKey] };
    });
  };
  const removeFromRanking = (optKey) => {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[q.id]) ? prev[q.id] : [];
      return { ...prev, [q.id]: cur.filter((x) => x !== optKey) };
    });
  };
  const moveRank = (index, dir) => {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[q.id]) ? [...prev[q.id]] : [];
      const j = index + dir;
      if (j < 0 || j >= cur.length) return prev;
      [cur[index], cur[j]] = [cur[j], cur[index]];
      return { ...prev, [q.id]: cur };
    });
  };

  // Sliders(Q9)
  const ensureQ9Init = () => {
    setAnswers((prev) => {
      if (prev[q.id]) return prev;
      return {
        ...prev,
        [q.id]: { securite: 0, innovation: 0, autonomie: 0, salaire: 0 },
      };
    });
  };

  const canGoNext = useMemo(() => {
    const a = answers[q.id];
    if (q.type === "single") return !!a;
    if (q.type === "multiple") {
      const min = q.minSelections || 1;
      return Array.isArray(a) && a.length >= min && a.length <= (q.maxSelections || 99);
    }
    if (q.type === "ranking") {
      return Array.isArray(a) && a.length === 3; // 3 choix exactement
    }
    if (q.type === "sliders") {
      return a && ["securite","innovation","autonomie","salaire"].every(k => typeof a[k] === "number");
    }
    return false;
  }, [answers, q]);

  const saveTestResults = async (testResults) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        'http://localhost:8000/api/orientation-test/save/',
        {
          answers: testResults.answers,
          raw_scores: testResults.raw,
          max_scores: testResults.max,
          normalized_scores: testResults.normalized,
          pillar_keys: testResults.PILLAR_KEYS
        },
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      console.log('Résultats du test sauvegardés:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error);
      throw error;
    }
  };

  const goNext = async () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      // Fin du test - calcul et sauvegarde des résultats
      setIsSaving(true);
      
      try {
        const raw = computeRawScoresFromAnswers(answers, Q_MAPPING);
        const max = computeMaxScoresTheoretical(questions, Q_MAPPING);
        const normalized = normalizeScores0to100(raw, max);

        const testResults = {
          answers,
          raw,
          max,
          normalized,
          PILLAR_KEYS
        };

        // Sauvegarder les résultats
        await saveTestResults(testResults);

        // Navigation vers les résultats
        navigate("/results", {
          state: testResults,
        });
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        // Même en cas d'erreur de sauvegarde, on affiche les résultats
        const raw = computeRawScoresFromAnswers(answers, Q_MAPPING);
        const max = computeMaxScoresTheoretical(questions, Q_MAPPING);
        const normalized = normalizeScores0to100(raw, max);

        navigate("/results", {
          state: { answers, raw, max, normalized, PILLAR_KEYS },
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));

  // Affichage de chargement pendant la vérification d'authentification
  if (isLoading) {
    return (
      <div className="orientation-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Vérification de votre authentification...</p>
        </div>
      </div>
    );
  }

  // Si non authentifié, cette partie ne devrait pas s'afficher car redirection
  if (!isAuthenticated) {
    return (
      <div className="orientation-container">
        <div className="auth-required">
          <h3>Authentification requise</h3>
          <p>Vous devez vous connecter pour passer le test d'orientation.</p>
          <button 
            className="nav-btn" 
            onClick={() => navigate('/login?redirect=/orientation-test')}
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orientation-container">
      <div className="orientation-header">
        <h2 className="orientation-title">Test d'Orientation</h2>
        <div className="progress">
          Question {current + 1} / {questions.length}
        </div>
        {userInfo && (
          <div className="user-info-test">
            Connecté: {userInfo.prenom} {userInfo.nom}
          </div>
        )}
      </div>

      <div className="question-card">
        <div className="question-meta">{q.category}</div>
        <h3 className="question-text">{q.question}</h3>

        {/* RENDER PAR TYPE */}
        {q.type === "single" && (
          <div className="options-grid">
            <div className="hint">Sélectionnez une seule option.</div>
            {q.options.map((opt) => {
              const active = answers[q.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  className={`option-btn ${active ? "active" : ""}`}
                  onClick={() => handleSingle(opt.id)}
                >
                  {opt.icon && <span className="option-icon">{opt.icon}</span>}
                  {opt.text}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "multiple" && (
          <>
            <div className="hint">
              Sélectionnez {q.minSelections || 1}
              {q.maxSelections ? ` à ${q.maxSelections}` : ""} options.
            </div>
            <div className="options-grid">
              {q.options.map((opt) => {
                const cur = Array.isArray(answers[q.id]) ? answers[q.id] : [];
                const checked = cur.includes(opt.key);
                const disabled =
                  !checked &&
                  q.maxSelections &&
                  cur.length >= q.maxSelections;
                return (
                  <button
                    key={opt.key}
                    className={`chip ${checked ? "chip-active" : ""} ${
                      disabled ? "chip-disabled" : ""
                    }`}
                    onClick={() => !disabled && toggleMulti(opt.key)}
                  >
                    {opt.icon && <span className="option-icon">{opt.icon}</span>}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {q.type === "ranking" && (
          <div className="ranking-wrap">
            <div className="ranking-left">
              <div className="hint">Choisissez et classez exactement 3 activités.</div>
              <ul className="list">
                {q.options.map((opt) => {
                  const cur = Array.isArray(answers[q.id]) ? answers[q.id] : [];
                  const selected = cur.includes(opt.key);
                  return (
                    <li key={opt.key} className={`list-item ${selected ? "selected" : ""}`}>
                      <div className="list-content">
                        {opt.icon && <span className="option-icon">{opt.icon}</span>}
                        {opt.label}
                      </div>
                      <div className="list-actions">
                        {!selected ? (
                          <button className="mini-btn" onClick={() => addToRanking(opt.key)}>
                            Choisir
                          </button>
                        ) : (
                          <button className="mini-btn" onClick={() => removeFromRanking(opt.key)}>
                            Retirer
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="ranking-right">
              <div className="hint">Ordre (pondération: 1er=+4, 2e=+3, 3e=+2)</div>
              <ol className="ordered">
                {(answers[q.id] || []).map((k, idx) => {
                  const item = q.options.find((o) => o.key === k);
                  return (
                    <li key={k} className="ordered-item">
                      <div className="ordered-content">
                        {item?.icon && <span className="option-icon">{item.icon}</span>}
                        {item?.label}
                      </div>
                      <div className="ordered-actions">
                        <button className="mini-btn" onClick={() => moveRank(idx, -1)}>↑</button>
                        <button className="mini-btn" onClick={() => moveRank(idx, +1)}>↓</button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        {q.type === "sliders" && (
          <div className="sliders" onMouseEnter={ensureQ9Init} onTouchStart={ensureQ9Init}>
            {["securite", "innovation", "autonomie", "salaire"].map((k) => (
              <div key={k} className="slider-row">
                <label className="slider-label">
                  {q.labels[k]}
                  <span className="slider-value">{answers[q.id]?.[k] ?? 0}/5</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  value={answers[q.id]?.[k] ?? 0}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [q.id]: { ...(prev[q.id] || {}), [k]: Number(e.target.value) },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className="nav-actions">
          <button className="nav-btn ghost" onClick={goPrev} disabled={current === 0 || isSaving}>
            Précédent
          </button>
          <button className="nav-btn" onClick={goNext} disabled={!canGoNext || isSaving}>
            {isSaving ? "Sauvegarde..." : (current === questions.length - 1 ? "Voir mes résultats" : "Suivant")}
          </button>
        </div>
      </div>
    </div>
  );
}