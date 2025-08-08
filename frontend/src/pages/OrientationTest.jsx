import React, { useState } from 'react';
import '../styles/TestOrientation.css';

const questions = [
  {
    id: 1,
    text: "Tu préfères travailler...",
    options: [
      { label: "A", text: "Avec des chiffres ou des données" },
      { label: "B", text: "Avec des gens" },
      { label: "C", text: "Sur des projets artistiques ou créatifs" },
      { label: "D", text: "Dans un environnement technique" }
    ]
  },
  // ... Ajoute les autres questions du PDF
];

function TestOrientation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // TODO: calcul du résultat
      console.log("Réponses :", answers);
      // Rediriger vers la page résultat
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="test-wrapper">
      <h2 className="test-title">Test d'<span className="highlight">Orientation</span></h2>
      <div className="question-box">
        <p className="question-text">{question.text}</p>
        <div className="options">
          {question.options.map((opt) => (
            <button key={opt.label} className="option-btn" onClick={() => handleAnswer(opt.label)}>
              <strong>{opt.label}</strong> - {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}// frontend/src/pages/OrientationTest.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/Orientation.css"; // je fournis le CSS après
import { useNavigate } from "react-router-dom";

function OrientationTest() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    q1: "",
    q2: [],
    q3: "",
    q4: "",
    q5: [], // ordered top3
    q6: "",
    q7: "",
    q8: "",
    q9: { securite: 3, innovation: 3, autonomie: 3, salaire: 3 },
    q10: "",
    q11: "",
    q12: "",
    q13: "",
    q14: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // helpers
  const toggleMulti = (key, value) => {
    setAnswers(prev => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      const idx = arr.indexOf(value);
      if (idx === -1) arr.push(value);
      else arr.splice(idx, 1);
      return { ...prev, [key]: arr };
    });
  };

  const setSingle = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const setQ9Slider = (field, v) => {
    setAnswers(prev => ({ ...prev, q9: { ...prev.q9, [field]: Number(v) } }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/orientation/submit/", { answers });
      setLoading(false);
      // store result in localStorage then go to results page
      localStorage.setItem("orientation_result", JSON.stringify(res.data));
      navigate("/orientation/results");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Erreur lors de l'envoi du test.");
    }
  };

  return (
    <div className="orientation-wrapper">
      <h1 className="orientation-title">Test d'orientation <span className="highlight">DirAvenir</span></h1>
      <form className="orientation-form" onSubmit={onSubmit}>
        {/* Q1 */}
        <div className="question">
          <label className="q-title">1. Si le temps et l'argent n'étaient pas un problème, que choisiriez-vous ?</label>
          <div className="options-grid">
            {[
              ["A","Créer quelque chose de nouveau"],
              ["B","Comprendre comment les choses fonctionnent"],
              ["C","Interagir et aider les autres"],
              ["D","Organiser et gérer des projets"],
              ["E","Exprimer ma créativité"]
            ].map(([val, label]) => (
              <button key={val} type="button" onClick={() => setSingle("q1", val)}
                className={`option ${answers.q1===val ? "active": ""}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Q2 example multi (3 max) */}
        <div className="question">
          <label className="q-title">2. Quel type de contenu retient le plus votre attention ? (3 max)</label>
          <div className="options-grid">
            {[
              ["DecouvertesTech","Découvertes scientifiques, Tech"],
              ["ArtDesign","Art et design"],
              ["PersoSocial","Dév. personnel / Causes sociales"],
              ["EcoStrat","Actualités économiques / Stratégie"],
              ["OrgaGestion","Organisation / Travail"],
              ["SportBricolage","Sports / Bricolage"]
            ].map(([val,label]) => (
              <button key={val} type="button" onClick={() => toggleMulti("q2", val)}
                className={`option ${(answers.q2||[]).includes(val) ? "active": ""}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="question">
          <label className="q-title">3. Dans un magasin, vers quelle section êtes-vous attiré(e) ?</label>
          <div className="options-grid">
            {["A","B","C","D","E"].map(val => (
              <button key={val} type="button" onClick={() => setSingle("q3", val)}
                className={`option ${answers.q3===val ? "active": ""}`}>{val}</button>
            ))}
          </div>
        </div>

        {/* Q4 */}
        <div className="question">
          <label className="q-title">4. Face à un problème complexe, quelle est votre première réaction ?</label>
          <div className="options-grid">
            {["A","B","C","D"].map(val => (
              <button key={val} type="button" onClick={() => setSingle("q4", val)}
                className={`option ${answers.q4===val ? "active": ""}`}>{val}</button>
            ))}
          </div>
        </div>

        {/* Q5 drag-drop simplified: choose 3 in order (we'll let user click to stack) */}
        <div className="question">
          <label className="q-title">5. Choisissez vos 3 activités préférées (ordre)</label>
          <div className="options-grid">
            {[
              ["GererBudget","Gérer un budget"],
              ["OrganiserEvenement","Organiser un événement"],
              ["EcrireTexte","Écrire un texte clair"],
              ["Reparer","Réparer un appareil"],
              ["Dessiner","Dessiner / Peindre"],
              ["Equation","Résoudre une équation"],
              ["Convaincre","Convaincre quelqu'un"],
              ["EcouterConseiller","Écouter / Conseiller"]
            ].map(([val,label]) => {
              const idx = answers.q5.indexOf(val);
              return (
                <button key={val} type="button"
                  onClick={()=>{
                    setAnswers(prev=>{
                      const arr = [...prev.q5];
                      // if exists, remove; else append at end (max 3)
                      const ix = arr.indexOf(val);
                      if(ix>-1) arr.splice(ix,1);
                      else{
                        if(arr.length<3) arr.push(val);
                      }
                      return {...prev, q5: arr};
                    });
                  }}
                  className={`option ${(answers.q5||[]).includes(val) ? "active": ""}`}>
                  {label} { (answers.q5||[]).includes(val) ? `(${answers.q5.indexOf(val)+1})` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q6..Q8 (similar style) */}
        <div className="question">
          <label className="q-title">6. Quand vous devez apprendre, vous préférez :</label>
          {["A","B","C","D"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q6", val)}
              className={`option ${answers.q6===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        <div className="question">
          <label className="q-title">7. Quel impact voulez-vous avoir ?</label>
          {["A","B","C","D"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q7", val)}
              className={`option ${answers.q7===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        <div className="question">
          <label className="q-title">8. Environnement de travail idéal :</label>
          {["A","B","C","D","E"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q8", val)}
              className={`option ${answers.q8===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        {/* Q9 sliders */}
        <div className="question">
          <label className="q-title">9. Indiquez l'importance (0..5)</label>
          <div className="sliders">
            {[
              ["securite","Sécurité de l'emploi"],
              ["innovation","Possibilité d'innover"],
              ["autonomie","Autonomie"],
              ["salaire","Salaire"]
            ].map(([key,label])=>(
              <div key={key} className="slider-row">
                <label>{label}: {answers.q9[key]}</label>
                <input type="range" min="0" max="5" value={answers.q9[key]}
                  onChange={(e)=>setQ9Slider(key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        {/* Q10..Q14 */}
        <div className="question">
          <label className="q-title">10. Si vous deviez résoudre un grand problème, votre motivation principale ?</label>
          {["A","B","C","D"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q10", val)}
              className={`option ${answers.q10===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        <div className="question">
          <label className="q-title">11. Préférez-vous travailler :</label>
          {["A","B","C"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q11", val)}
              className={`option ${answers.q11===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        <div className="question">
          <label className="q-title">12. Lors d'une présentation, vous préférez :</label>
          {["A","B","C"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q12", val)}
              className={`option ${answers.q12===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        <div className="question">
          <label className="q-title">13. Quand vous prenez une décision importante, vous fiez-vous le plus à :</label>
          {["A","B","C"].map(val=>(
            <button key={val} type="button" onClick={()=>setSingle("q13", val)}
              className={`option ${answers.q13===val ? "active": ""}`}>{val}</button>
          ))}
        </div>

        <div className="question">
          <label className="q-title">14. Matières qui vous passionnaient (2-3 max)</label>
          {[
            ["Sciences","Sciences"],
            ["Litterature","Littérature / Langues"],
            ["SHS","Sc. Humaines"],
            ["Arts","Arts & Design"],
            ["TechnoInfo","Techno & Info"],
            ["GestionEco","Gestion & Éco"]
          ].map(([val,label])=>(
            <button key={val} type="button" onClick={()=>toggleMulti("q14", val)}
              className={`option ${(answers.q14||[]).includes(val) ? "active": ""}`}>{label}</button>
          ))}
        </div>

        <div className="submit-row">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "En cours..." : "Terminer & Voir mes résultats"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default OrientationTest;



