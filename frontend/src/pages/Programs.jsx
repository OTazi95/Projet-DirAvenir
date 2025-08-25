import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Programs.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 77;
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filters, setFilters] = useState({ category: '', country: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms(currentPage, filters.category, filters.country);
  }, [currentPage, filters]);

  const fetchPrograms = async (page, category = '', country = '') => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list-programmes-v2/`, {
        params: {
          page: page,
          category: category,
          country: country
        }
      });
      setPrograms(response.data.results);
    } catch (error) {
      console.error('Erreur lors du chargement des programmes', error);
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

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1);
  };

const handleProgramDetail = (programId) => {
    navigate(`/program-detail/${programId}`);
  };

const handleApply = (programId) => {
  navigate(`/application/${programId}`);
};

  // Fonction pour générer la pagination responsive et dynamique
  const renderPagination = () => {
    const items = [];
    
    // Bouton première page (<<)
    items.push(
      <button
        key="first"
        className={`pagination-nav ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && handlePageChange(1)}
        disabled={currentPage === 1}
        title="Première page"
      >
        ≪
      </button>
    );

    // Bouton page précédente (<)
    items.push(
      <button
        key="prev"
        className={`pagination-nav ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Page précédente"
      >
        ‹
      </button>
    );

    // Affichage des numéros de pages
   
      // Pagination dynamique intelligente
      let startPage, endPage;

      if (currentPage <= 3) {
        // Si on est au début (pages 1, 2, 3)
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        // Si on est à la fin (3 dernières pages)
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        // Au milieu : afficher la page courante au centre
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      // Afficher les pages calculées
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <button
            key={i}
            className={currentPage === i ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      // Ajouter les points de suspension et dernières pages si nécessaire
      if (endPage < totalPages - 1) {
        items.push(
          <span key="dots" className="pagination-dots">
            ...
          </span>
        );
        
        // Afficher les 2 dernières pages
        for (let i = totalPages - 1; i <= totalPages; i++) {
          items.push(
            <button
              key={i}
              className={currentPage === i ? 'active' : ''}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
      }
    

    // Bouton page suivante (>)
    items.push(
      <button
        key="next"
        className={`pagination-nav ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Page suivante"
      >
        ›
      </button>
    );

    // Bouton dernière page (>>)
    items.push(
      <button
        key="last"
        className={`pagination-nav ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Dernière page"
      >
        ≫
      </button>
    );

    return items;
  };

  return (
    <div className="programs-container">
      <div className="programs-header">
        <h1>Programs <span className="programs-list">List</span></h1>
      </div>

      {/* FILTRES */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher par catégorie..."
          value={searchCategory}
          onChange={handleSearchChange}
          className="filter-input"
        />
        <select value={selectedCountry} onChange={handleCountryChange} className="filter-select">
          <option value="">Tous les pays</option>
          <option value="Chine">Chine</option>
          <option value="Chypre">Chypre</option>
          <option value="Roumanie">Roumanie</option>
        </select>

        <button className="search-button" onClick={applyFilters}>
          Rechercher
        </button>
      </div>

      {/* PROGRAMMES */}
      <div className="programs-grid">
        {programs.map((program, index) => (
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
              <div className="program-meta">
              </div>
            </div>
            <div className="card-actions">
              <div className="action-buttons-top">
                <button 
                  className="more-infos-button"
                  onClick={() => handleProgramDetail(program.id)}
                >
                  <span className="icon">💬</span> More Infos
                </button>
                <button className="save-this-button">
                  <span className="icon">⭐</span> Save This
                </button>
              </div>
              <button 
                className="apply-now-button" 
                onClick={() => handleApply(program.id)}
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
}

export default Programs;