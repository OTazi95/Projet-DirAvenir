import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Programs.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 


function Programs() {
  const [programs, setPrograms] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]); // Tous les programmes pour l'onglet "Saved"
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filters, setFilters] = useState({ category: '', country: '' });
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();
  const totalPages = 77;
  const { isLoggedIn } = useContext(AuthContext); 

  // Charger les programmes sauvegardés depuis le localStorage au démarrage
  useEffect(() => {
    const savedProgramsFromStorage = localStorage.getItem('savedPrograms');
    if (savedProgramsFromStorage) {
      try {
        const parsed = JSON.parse(savedProgramsFromStorage);
        setSavedPrograms(parsed);
      } catch (error) {
        console.error('Erreur lors du parsing des programmes sauvegardés:', error);
      }
    }
  }, []);

  // Sauvegarder les programmes dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('savedPrograms', JSON.stringify(savedPrograms));
  }, [savedPrograms]);

  // Récupération des programmes quand on change de filtre ou page
  useEffect(() => {
    if (activeTab === 'All') {
      fetchPrograms(currentPage, filters.category, filters.country);
    }
  }, [currentPage, filters, activeTab]);

  // Récupération de tous les programmes pour l'onglet "Saved"
  useEffect(() => {
    if (activeTab === 'Saved') {
      fetchAllPrograms();
    }
  }, [activeTab]);

  const fetchPrograms = async (page, category = '', country = '') => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list-programmes-v2/`, {
        params: { page, category, country }
      });
      setPrograms(response.data.results);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes', error);
    }
  };

  const fetchAllPrograms = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list-programmes-v2/`, {
        params: { page: 1, per_page: 1000 }
      });
      setAllPrograms(response.data.results);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes sauvegardés', error);
    }
  };

  const applyFilters = () => {
    setFilters({
      category: searchCategory,
      country: selectedCountry
    });
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleProgramDetail = (programId) => {
    navigate(`/program-detail/${programId}`);
  };

  const handleApply = (programId) => {
        if (isLoggedIn) {
      // L'utilisateur est connecté, il peut passer le test directement
     navigate(`/application/${programId}`);
    } else {
      // L'utilisateur n'est pas connecté, redirection vers login avec redirect parameter
navigate(`/login?redirect=/application/${programId}`);
    }
  };

  const toggleSaveProgram = (programId) => {
    setSavedPrograms((prev) => {
      const newSavedPrograms = prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId];
      
      // La sauvegarde dans localStorage se fait automatiquement via useEffect
      return newSavedPrograms;
    });
  };

  // Fonction pour effacer tous les programmes sauvegardés 
  const clearAllSavedPrograms = () => {
    setSavedPrograms([]);
    localStorage.removeItem('savedPrograms');
  };

  const renderPagination = () => {
    const items = [];
    items.push(
      <button key="first" className={`pagination-nav ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(1)} disabled={currentPage === 1}>≪</button>
    );
    items.push(
      <button key="prev" className={`pagination-nav ${currentPage === 1 ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
    );

    let startPage, endPage;
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>{i}</button>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(<span key="dots" className="pagination-dots">...</span>);
      for (let i = totalPages - 1; i <= totalPages; i++) {
        items.push(
          <button key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>{i}</button>
        );
      }
    }

    items.push(
      <button key="next" className={`pagination-nav ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
    );
    items.push(
      <button key="last" className={`pagination-nav ${currentPage === totalPages ? 'disabled' : ''}`} onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>≫</button>
    );
    return items;
  };

  const displayedPrograms = activeTab === 'Saved'
    ? allPrograms.filter(program => savedPrograms.includes(program.id))
    : programs;

  return (
    <div className="programs-section">
    <div className="programs-container">
      <div className="programs-header">
        <h1>Programs <span className="programs-list">List</span></h1>
      </div>

      <div className="filters-container">
        <div className="tab-navigation">
          {['All', 'Saved'].map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
                if (tab === 'All') {
                  setSearchCategory('');
                  setSelectedCountry('');
                  setFilters({ category: '', country: '' });
                }
              }}
            >
              {tab} {tab === 'Saved' && savedPrograms.length > 0 && `(${savedPrograms.length})`}
            </button>
          ))}
        </div>

        {activeTab !== 'Saved' && (
          <>
            <input
              type="text"
              placeholder="Search The Program Here"
              value={searchCategory}
              onChange={handleSearchChange}
              className="program-search-input"
            />
            <button className="program-search-button" onClick={applyFilters}>Search</button>
          </>
        )}

        {/* Bouton pour effacer tous les programmes sauvegardés (optionnel) */}
        {activeTab === 'Saved' && savedPrograms.length > 0 && (
          <button className="clear-saved-button" onClick={clearAllSavedPrograms}>
            Clear All Saved Programs
          </button>
        )}
      </div>

      <div className="programs-grid">
        {displayedPrograms.length > 0 ? (
          displayedPrograms.map((program, index) => (
            <motion.div
              key={program.id || index}
              className="program-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="card-header">
                <div className="logo-container">
                  <img
                    src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : '/default-logo.png'}
                    alt={`${program.universities} logo`}
                    className="program-logo"
                  />
                </div>
              </div>
              <div className="card-content">
                <h3 className="program-title">{program.program}</h3>
                <p className="program-description">{program.description}</p>

                <div className="card-actions">
                  <div className="action-buttons-top">
                    <button className="more-infos-button" onClick={() => handleProgramDetail(program.id)}>
                      More Infos
                    </button>
                    <button
                      className={`save-this-button ${savedPrograms.includes(program.id) ? 'saved' : ''}`}
                      onClick={() => toggleSaveProgram(program.id)}
                    >
                      {savedPrograms.includes(program.id) ? 'Unsave' : 'Save This'}
                    </button>
                  </div>
                  <div className="bottom-action">
                    <button className="apply-now-button" onClick={() => handleApply(program.id)}>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-programs-saved">
            <div className="content">
              <div className="icon-section">
                {activeTab === 'Saved' ? (
                  savedPrograms.length === 0 ? (
                    <span className="icon">📚</span>
                  ) : (
                    <span className="icon">⏳</span>
                  )
                ) : (
                  <span className="icon">🔍</span>
                )}
              </div>
              
              <div className="separator"></div>
              
              <div className="text-section">
                {activeTab === 'Saved' ? (
                  savedPrograms.length === 0 ? (
                    <>
                      <div className="title">No programs saved yet</div>
                      <div className="subtitle">Go to 'All' tab to discover and save some amazing programs!</div>
                    </>
                  ) : (
                    <>
                      <div className="title">Loading your saved programs...</div>
                      <div className="subtitle">Please wait while we fetch your saved programs</div>
                    </>
                  )
                ) : (
                  <>
                    <div className="title">No programs found</div>
                    <div className="subtitle">Try adjusting your search criteria or filters</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {activeTab !== 'Saved' && (
        <div className="pagination">
          {renderPagination()}
        </div>
      )}
    </div>
    </div>
  );
}

export default Programs;