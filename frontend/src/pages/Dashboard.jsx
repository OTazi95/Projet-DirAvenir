import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Country.css';
import '../styles/Dashboard.css';
import partner1 from '../assets/Final-logo.png';
import partner2 from '../assets/Cyprus-logo.png';
import partner3 from '../assets/BAU-logo.png';
import participationImg from '../assets/participation-illustration.png';

function Dashboard() {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');

  useEffect(() => {
    const prenomLocal = localStorage.getItem('prenom');
    const nomLocal = localStorage.getItem('nom');
    if (prenomLocal && nomLocal) {
      setPrenom(prenomLocal);
      setNom(nomLocal);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Bienvenue {prenom} {nom} dans votre espace DirAvenir</h1>
        <p>Nous ouvrons de nouveaux horizons aux jeunes, en leur offrant la possibilité de construire leurs bases académiques à l’étranger.</p>
      </div>

         <div className="participation-container">
      <div className="participation-left">
        <h4 className="section-subtitle">QUI PEUT NOUS REJOINDRE</h4>
        <h1 className="section-title">
          Orientation professionnelle <br /> Des programmes pour tous
        </h1>

        <div className="participation-grid">
          <div className="participation-item">
            <div className="icon-number">01</div>
            <div>
              <h3>Collèges/Universités</h3>
            </div>
          </div>

          <div className="participation-item">
            <div className="icon-number">02</div>
            <div>
              <h3>Étudiants</h3>
            </div>
          </div>

          <div className="participation-item">
            <div className="icon-number">03</div>
            <div>
              <h3>Changeurs de carrière</h3>
            </div>
          </div>

          <div className="participation-item">
            <div className="icon-number">04</div>
            <div>
              <h3>Établissements d'enseignement</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="participation-right">
        <img src={participationImg} alt="Participation Illustration" />
      </div>
    </div>

<div className="achievements-section">
  <h2><span className="highlight-purple">Nos</span> <span className="highlight-yellow">Accomplissements</span></h2>
  <div className="achievements-content">
    <div className="achievement-image">
      <img src="/images/succes2.jpg" alt="Achievements Illustration" />
    </div>
    <div className="achievement-stats">
      <div className="stat-card">
        <h3>200</h3>
        <p>Étudiants à l'étranger</p>
      </div>
      <div className="stat-card large">
        <h3>70</h3>
        <p>Programmes disponibles</p>
      </div>
      <div className="stat-card">
        <h3>90%</h3>
        <p>Étudiants satisfaits <br />du programme choisi</p>
      </div>
    </div>
  </div>
</div>

<div className="reviews-section">
  <h2>
    <span className="highlight-purple">Avis</span>{' '}
    <span className="highlight-yellow">des étudiants</span>
  </h2>
  <div className="reviews-container">
    <div className="review-card">
      <p>"DirAvenir m'a vraiment aidé à trouver la bonne université à l'étranger. Merci à toute l'équipe !"</p>
      <h4>- Sarah B.</h4>
    </div>
    <div className="review-card">
      <p>"Grâce à leurs conseils personnalisés, j'ai pu intégrer un programme qui me correspond parfaitement."</p>
      <h4>- Mohamed A.</h4>
    </div>
    <div className="review-card">
      <p>"Excellent accompagnement pour les démarches administratives et un suivi impeccable."</p>
      <h4>- Yasmine K.</h4>
    </div>
  </div>
</div>


      <div className="destinations">
  <h2><span className="highlight-purple">Nos</span> <span className="highlight-yellow">Destignations</span></h2>
  <div className="destination-cards">
    <div className="card" onClick={() => navigate('/destination/chine')}>
      <img src="/images/chine.jpg" alt="Chine" />
      <h3>Chine</h3>
    </div>
    <div className="card" onClick={() => navigate('/destination/Roumanie')}>
      <img src="/images/roumanie.jpg" alt="Roumanie" />
      <h3>Roumanie</h3>
    </div>
    <div className="card" onClick={() => navigate('/destination/Chypre')}>
      <img src="/images/chypre.jpg" alt="Chypre" />
      <h3>Chypre</h3>
    </div>
  </div>
</div>

<div id="partners-section" className="partners-section">
  <h2><span className="highlight-purple">Nos</span> <span className="highlight-yellow">Partenaires</span></h2>
  <div className="partners-logos">
    <img src={partner1} alt="Final International University" onClick={() => navigate('/partner/final')} />
    <img src={partner2} alt="Cyprus International University" onClick={() => navigate('/partner/cyprus')} />
    <img src={partner3} alt="Bahcesehir University" onClick={() => navigate('/partner/bau')} />
  </div>
</div>
    </div>

  );
}

export default Dashboard;
