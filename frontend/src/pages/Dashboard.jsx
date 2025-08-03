import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const [filieres, setFilieres] = useState([]);
const [selectedFiliere, setSelectedFiliere] = useState('');
const [selectedCountry, setSelectedCountry] = useState('');
const [universites, setUniversites] = useState([]);

  useEffect(() => {
    const prenomLocal = localStorage.getItem('prenom');
    const nomLocal = localStorage.getItem('nom');
    if (prenomLocal && nomLocal) {
      setPrenom(prenomLocal);
      setNom(nomLocal);
    }
  }, []);

  useEffect(() => {
  // Charger toutes les filières uniques
  axios.get('http://localhost:8000/api/get-programmes-universites/')
    .then(response => {
      const uniqueFilieres = [...new Set(response.data.map(item => item.filiere))];
      setFilieres(uniqueFilieres);
    });
}, []);

const handleSearch = () => {
  axios.get('http://localhost:8000/api/get-programmes-universites/', {
    params: { filiere: selectedFiliere, pays: selectedCountry }
  }).then(response => {
    setUniversites(response.data);
  });
};

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Bienvenue {prenom} {nom} dans votre espace DirAvenir</h1>
        <p>Nous ouvrons de nouveaux horizons aux jeunes, en leur offrant la possibilité de construire leurs bases académiques à l’étranger.</p>
      </div>

<div className="search-program-section">
  <h2>Trouvez le programme qui vous convient le plus !</h2>
  <div className="search-bar">
    <select value={selectedFiliere} onChange={e => setSelectedFiliere(e.target.value)}>
      <option value="">Sélectionner une filière</option>
      {filieres.map((filiere, index) => (
        <option key={index} value={filiere}>{filiere}</option>
      ))}
    </select>

    <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
      <option value="">Sélectionner un pays</option>
      <option value="China">Chine</option>
      <option value="Cyprus">Chypre</option>
      <option value="Romania">Roumanie</option>
    </select>

    <button onClick={handleSearch}>Chercher</button>
  </div>

  <div className="universities-grid">
    {universites.map((uni, index) => (
      <div key={index} className="university-card">
        <h3>{uni.universite}</h3>
        <p>{uni.description}</p>
        <button>Postuler</button>
      </div>
    ))}
  </div>
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

    <div className="how-it-works-section">
  <h2 className="section-title">Comment ça marche ?</h2>
  <div className="how-it-works-container">
    <div className="how-box">
      <img src="/images/program-seeker.png" alt="Program Seeker" />
      <p className="label">Chercheur de programme</p>
    </div>

    <div className="how-steps">
      <div className="how-step">
        <div className="step-number">01</div>
        <p>Tests et diagrammes d'aptitude à l'orientation</p>
      </div>
      <div className="how-step">
        <div className="step-number">02</div>
        <p>Les programmes les plus correspondants à votre profil</p>
      </div>
      <div className="how-step">
        <div className="step-number">03</div>
        <p>Sélection des opportunités dans les universités</p>
      </div>
      <div className="how-step">
        <div className="step-number">04</div>
        <p>Candidature à l'opportunité choisie</p>
      </div>
      <div className="how-step">
        <div className="step-number">05</div>
        <p>Suivi en temps réel de votre admission</p>
      </div>
      <div className="how-step">
        <div className="step-number">06</div>
        <p>Orientation et suivi des candidatures</p>
      </div>
    </div>

    <div className="how-box">
      <img src="/images/diravenir-scholar.png" alt="Diravenir Scholar" />
      <p className="label">Diravenir Scholar</p>
    </div>
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

<div className="reviews-section" id='review'>
  <h2>
    <span className="highlight-purple">Avis</span>{' '}
    <span className="highlight-yellow">des étudiants</span>
  </h2><br></br>
  <h3>
    <span className="highlight-purple">Ils étaient des réveurs</span>{' '}<br></br>
    <span className="highlight-yellow">Ils sont désormais des accomplisseurs et acteurs</span>
  </h3>
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
