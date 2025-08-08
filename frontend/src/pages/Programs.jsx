import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Programs.css';
import { motion } from 'framer-motion';

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchFiliere, setSearchFiliere] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filters, setFilters] = useState({ filiere: '', pays: '' });

useEffect(() => {
  fetchPrograms(currentPage, filters.filiere, filters.pays);
}, [currentPage, filters]);


  const fetchPrograms = async (page, filiere = '', pays = '') => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list-programmes/`, {
        params: {
          page: page,
          filiere: filiere,
          pays: pays
        }
      });
      setPrograms(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 6));
    } catch (error) {
      console.error('Erreur lors du chargement des programmes', error);
    }
  };

  const applyFilters = () => {
  setFilters({
    filiere: searchFiliere,
    pays: selectedCountry
  });
  setCurrentPage(1);  // Remettre à la page 1 à chaque recherche
};

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  };

 const handleSearchChange = (e) => {
    setSearchFiliere(e.target.value);
    setCurrentPage(1);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="programs-container">
      <h2>Nos <span className='highlight-yellow'>Programmes</span></h2>
       {/* FILTRES */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher par filière..."
          value={searchFiliere}
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
    key={index}
    className="program-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <img 
      src={`http://localhost:8000${program.logo}`} 
      alt={`${program.universite} logo`} 
      className="program-logo"
    />
    <span className="program-filiere">{program.filiere}</span>
    <h3>{program.universite}</h3>
    <p className="program-description">{program.description}</p>
  </motion.div>
))}
      </div>

      <div className="pagination">
        {[...Array(Math.min(totalPages, 11))].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Programs;
