import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/ProgramDetail.css';
import fleche from '../assets/fleche.png';
import { AuthContext } from '../context/AuthContext'; // Ajouter l'import

function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [similarPrograms, setSimilarPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext); // Ajouter le contexte

  useEffect(() => {
    fetchProgramDetail();
  }, [programId]);

  const fetchProgramDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/program-detail-with-similar/${programId}/`);
      setProgram(response.data.program);
      setSimilarPrograms(response.data.similar_programs);
    } catch (error) {
      console.error('Erreur lors du chargement du programme', error);
      navigate('/programs');
    } finally {
      setLoading(false);
    }
  };

  const handleSimilarProgramClick = (programId) => {
    navigate(`/program-detail/${programId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fonction modifiée pour gérer l'authentification
  const handleApply = (programId) => {
    if (isLoggedIn) {
      // L'utilisateur est connecté, aller directement au formulaire
      navigate(`/application/${programId}`);
    } else {
      // L'utilisateur n'est pas connecté, rediriger vers login avec le bon redirect
      navigate(`/login?redirect=/application/${programId}`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du programme...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="error-container">
        <h2>Programme non trouvé</h2>
        <button onClick={() => navigate('/programs')}>Retour aux programmes</button>
      </div>
    );
  }

  return (
    <div className="program-detail-container">
      {/* ==== HEADER ==== */}
      <motion.div className="program-header" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="program-logo-section">
          <img src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : '/default-logo.png'} alt="University logo" />
        </div>
        <div className="program-main-info">
          <h1 className="program-main-title">
            {program.degree_type} in <br />
            {program.program}:
          </h1>
          <p className="program-subtitle">
            Offered by {program.universities.split(" ")[0]} <br />
            {program.universities.split(" ").slice(1).join(" ")}
          </p>
        </div>
      </motion.div>

      {/* ==== ABOUT SECTIONS ET CARD ==== */}
      <motion.div 
        className="tabs-section" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Colonne gauche */}
        <div>
          <div className="tab-pane">
            <h2 className="section-title-tab">About The University</h2>
            <p>{program.about_university}</p>
          </div>
          <div className="tab-pane">
            <h2 className="section-title-tab">About The Program</h2>
            <p>{program.about_program}</p>
          </div>
          <div className="tab-pane">
            <h2 className="section-title-tab">Why This Program?</h2>
            <ul className="program-list">
              {program.why_program?.split('\n').map((item, index) => (
                <li key={index}>{item.replace(/^\s*-\s*/, '')}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Colonne droite */}
        <div className="program-card-info">
          <h2 className="section-title-info">About this Program</h2>
          <div className="info-item"><span className="info-label">Degree Type</span><span className="info-value">{program.degree_type}</span></div>
          <div className="info-item"><span className="info-label">Apply Before</span><span className="info-value">{program.apply_before}</span></div>
          <div className="info-item"><span className="info-label">Tuition Fees</span><span className="info-value">{program.tuition_fees}</span></div>
          <div className="info-item"><span className="info-label">Campus City</span><span className="info-value">{program.campus_city}</span></div>
          <div className="info-item"><span className="info-label">Duration</span><span className="info-value">{program.duration}</span></div>
          <div className="info-item"><span className="info-label">Language</span><span className="info-value">{program.language}</span></div>
          <div className="info-item"><span className="info-label">University Ranking</span><span className="info-value">Top {program.university_ranking}</span></div>
          <div className="info-item"><span className="info-label">Scholarship</span><span className="info-value scholarship">{program.scholarship}</span></div>
        </div>
      </motion.div>

      {/* ==== DOCUMENTS ==== */}
      <motion.div 
        className="documents-section" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="doc-title-container">
          <h2 className="section-title-doc">Documents Needed</h2>
          <div className="doc-title-line"></div>
        </div>
        
        <div className="documents-grid">
          {[
            "Valid Moroccan Passport",
            "High school Diploma",
            "Good Conduct Certificate",
            "Small Digital Photo",
            "Academic Transcript",
            "Application Form to Fill",
            "English Proficiency Certificate",
            "Academic Study Plan"
          ].map((doc, index) => (
            <div className="document-item" key={index}>
              <span className="doc-icon">
                <img src={fleche} alt="icon" className="doc-icon-img" />
              </span>
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ==== CTA ==== */}
      <motion.div 
        className="final-cta" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3>Interested in this<br/> program and ready <br/>to get started?</h3>
        <button className="final-apply-btn" onClick={() => handleApply(program.id)}>
          Apply Now
        </button>
      </motion.div>

      {/* ==== OTHER UNIVERSITIES ==== */}
      <motion.div className="similar-programs-section" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
        <div className="title-container">
          <h2 className="section-title-prog">Other Universities</h2>
          <div className="title-line"></div>
        </div>
        <div className="similar-programs-grid">
          {similarPrograms.map((sp) => (
            <div key={sp.id} className="similar-program-card" onClick={() => handleSimilarProgramClick(sp.id)}>
              <img 
                src={sp.logo ? `http://localhost:8000/media/logo/${sp.logo}` : '/default-logo.png'} 
                alt={`${sp.universities} logo`} 
                className="similar-program-logo" 
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ProgramDetail;