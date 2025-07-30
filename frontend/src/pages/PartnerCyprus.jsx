import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Cyprus-logo.png';
import logo1 from '../assets/Cyprus.jpg';
import '../styles/PartnerDetail.css';

function PartnerCyprus() {
  const navigate = useNavigate();

  return (
    <div className="partner-detail-page">
      <img src={logo} alt="Cyprus International University" className="partner-logo" />
      <img src={logo1} alt="Cyprus International University" className="partner-logo" />
      <h2>Cyprus International University</h2>
      <p>
         Cyprus International University (CIU), fondée en 1997, est l'une des principales 
         universités de Chypre du Nord, située à Nicosie. L'université accueille des étudiants 
         de plus de 100 nationalités différentes, créant un environnement multiculturel riche.
         CIU propose des programmes en anglais dans divers domaines tels que l’ingénierie, la santé, 
         l’architecture, le management, les technologies de l’information, l’environnement, etc.
         L’université se distingue par ses laboratoires de haute technologie, son centre de recherche écologique 
         et ses installations modernes.
         Avec un coût de vie abordable, des infrastructures de qualité et un encadrement académique rigoureux, 
         CIU est une destination privilégiée pour les étudiants souhaitant obtenir un diplôme reconnu internationalement.
      </p>
      <button onClick={() => navigate('/dashboard')} className="back-btn">Retour au Dashboard</button>
    </div>
  );
}

export default PartnerCyprus;
