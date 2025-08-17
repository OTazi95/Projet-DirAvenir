import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/ProgramDetail.css';

function ProgramDetail() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [similarPrograms, setSimilarPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchProgramDetail();
  }, [programId]);

 const fetchProgramDetail = async () => {
  try {
    setLoading(true);
    
    // CHANGER CETTE URL SI VOUS UTILISEZ L'OPTION 2 :
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

  const handleApplyNow = () => {
    // Logique pour postuler
    alert('Redirection vers le formulaire de candidature...');
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
      {/* Header avec logo et informations principales */}
      <motion.div 
        className="program-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="program-logo-section">
            <img
              src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : '/default-logo.png'}
              alt={`${program.universities} logo`}
              className="program-main-logo"
            />
          </div>
          
          <div className="program-main-info">
            <div className="program-category-badge">{program.category}</div>
            <h1 className="program-main-title">{program.program}</h1>
            <p className="program-subtitle">Offered by {program.universities}</p>
            
            {/* Informations rapides */}
            <div className="quick-info">
              <div className="info-item">
                <span className="info-label">Degree Type</span>
                <span className="info-value">{program.degree_type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Apply Before</span>
                <span className="info-value">{program.apply_before}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tuition Fees</span>
                <span className="info-value">{program.tuition_fees}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Campus City</span>
                <span className="info-value">{program.campus_city}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Duration</span>
                <span className="info-value">{program.duration}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Language</span>
                <span className="info-value">{program.language}</span>
              </div>
              <div className="info-item">
                <span className="info-label">University Ranking</span>
                <span className="info-value">Top {program.university_ranking}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Scholarship</span>
                <span className="info-value">{program.scholarship}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bouton CTA */}
        <div className="cta-section">
          <button className="apply-now-btn" onClick={handleApplyNow}>
            Apply Now
          </button>
        </div>
      </motion.div>

      {/* Section Documents Needed */}
      <motion.div 
        className="documents-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="section-title">
          <span className="title-icon">📄</span>
          Documents Needed
        </h2>
        <div className="documents-grid">
          <div className="document-item">
            <span className="doc-icon">🎓</span>
            <span className="doc-text">Valid Admission Request</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">📋</span>
            <span className="doc-text">High school Transcripts</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">📝</span>
            <span className="doc-text">Good Conduct Certificate</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">💾</span>
            <span className="doc-text">Scanned Digital Documents</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">📚</span>
            <span className="doc-text">Academic Certificates</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">📖</span>
            <span className="doc-text">Application Documents</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">🏆</span>
            <span className="doc-text">English Language Certificate</span>
          </div>
          <div className="document-item">
            <span className="doc-icon">📋</span>
            <span className="doc-text">Academic Certificates</span>
          </div>
        </div>
      </motion.div>

      {/* Onglets pour les détails */}
      <motion.div 
        className="tabs-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About Program
          </button>
          <button 
            className={`tab-btn ${activeTab === 'why' ? 'active' : ''}`}
            onClick={() => setActiveTab('why')}
          >
            Why This Program
          </button>
          <button 
            className={`tab-btn ${activeTab === 'university' ? 'active' : ''}`}
            onClick={() => setActiveTab('university')}
          >
            About University
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="tab-pane">
              <p>{program.about_program}</p>
            </div>
          )}
          {activeTab === 'why' && (
            <div className="tab-pane">
              <p>{program.why_program}</p>
            </div>
          )}
          {activeTab === 'university' && (
            <div className="tab-pane">
              <p>{program.about_university}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Section CTA finale */}
      <motion.div 
        className="final-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="cta-content">
          <h3>Interested in this program and ready to get started?</h3>
          <button className="final-apply-btn" onClick={handleApplyNow}>
            Apply Now
          </button>
        </div>
      </motion.div>

      {/* Programmes similaires */}
      <motion.div 
        className="similar-programs-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="section-title">Other Universities</h2>
        <div className="similar-programs-grid">
          {similarPrograms.map((similarProgram) => (
            <div 
              key={similarProgram.id} 
              className="similar-program-card"
              onClick={() => handleSimilarProgramClick(similarProgram.id)}
            >
              <img
                src={similarProgram.logo ? `http://localhost:8000/media/logo/${similarProgram.logo}` : '/default-logo.png'}
                alt={`${similarProgram.universities} logo`}
                className="similar-program-logo"
              />
              <div className="similar-program-info">
                <h4>{similarProgram.program}</h4>
                <p>{similarProgram.universities}</p>
                <span className="similar-program-location">{similarProgram.campus_city}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ProgramDetail;