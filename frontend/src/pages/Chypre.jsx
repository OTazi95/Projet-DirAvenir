import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Country.css';

function Chypre() {
  const navigate = useNavigate();

  return (
    <div className="country-page">
      <img src="/images/drapeau-chypre.png" alt="Drapeau Chypre" className="flag" />
      <img src="/images/Chypre.jpg" alt="Chypre" className="main-img" />
      <h2>Étudier en Chypre</h2>
      <p>
  Chypre est une destination idéale pour les étudiants souhaitant bénéficier d’un enseignement
  de qualité dans un environnement méditerranéen agréable.
  Avec des universités modernes, des programmes anglophones et des frais de scolarité compétitifs,
  Chypre attire chaque année des milliers d’étudiants internationaux.
  De plus, l’île offre un climat ensoleillé, des plages magnifiques
  et une qualité de vie exceptionnelle.
  Les diplômes chypriotes sont reconnus en Europe et à l’international.
</p>

      <button className="back-btn" onClick={() => navigate('/dashboard')}>Retour au Dashboard</button>
    </div>
  );
}

export default Chypre;
