import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Country.css';

function Roumanie() {
  const navigate = useNavigate();

  return (
    <div className="country-page">
      <img src="/images/drapeau-roumanie.png" alt="Drapeau roumanie" className="flag" />
      <img src="/images/roumanie.jpg" alt="roumanie" className="main-img" />
      <h2>Étudier en Roumanie</h2>
      <p>
  La Roumanie, située en Europe de l'Est, séduit de nombreux étudiants grâce à ses formations
  reconnues en médecine, ingénierie et informatique. Les universités roumaines dispensent
  des cours en anglais, français et roumain, facilitant l'intégration des étudiants internationaux.
  Avec un coût de vie très abordable et un cadre de vie sécurisé,
  la Roumanie est idéale pour les étudiants souhaitant obtenir un diplôme européen
  tout en découvrant une culture riche et chaleureuse.
</p>


      <button className="back-btn" onClick={() => navigate('/dashboard')}>Retour au Dashboard</button>
    </div>
  );
}

export default Roumanie;
