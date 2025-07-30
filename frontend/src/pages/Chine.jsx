import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Country.css';

function Chine() {
  const navigate = useNavigate();

  return (
    <div className="country-page">
      <img src="/images/drapeau-chine.png" alt="Drapeau Chine" className="flag" />
      <img src="/images/Chine.jpg" alt="Chine" className="main-img" />
      <h2>Étudier en Chine</h2>
      <p>
  La Chine est devenue l'une des destinations les plus attractives pour les étudiants internationaux.
  Avec ses universités de renommée mondiale, comme l’Université Tsinghua et Peking University,
  le pays offre une éducation de qualité à un coût abordable.
  En plus de son riche patrimoine culturel, étudier en Chine permet d'apprendre le mandarin,
  langue de plus en plus influente dans le monde des affaires.
  La Chine offre également des bourses généreuses aux étudiants étrangers et des opportunités
  professionnelles dans un marché en plein essor.
</p>

      <button className="back-btn" onClick={() => navigate('/dashboard')}>Retour au Dashboard</button>
    </div>
  );
}

export default Chine;
