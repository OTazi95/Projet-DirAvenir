import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/BAU-logo.png';
import logo1 from '../assets/BAU.jpg';
import '../styles/PartnerDetail.css';

function PartnerBAU() {
  const navigate = useNavigate();

  return (
    <div className="partner-detail-page">
      <img src={logo} alt=" Bahcesehir University" className="partner-logo" />
      <img src={logo1} alt="Bahcesehir University" className="partner-logo" />
      <h2>Bahcesehir University</h2>
      <p>
        Bahcesehir University (BAU) est une université prestigieuse située à Istanbul,
        Turquie, reconnue pour son excellence académique et ses infrastructures modernes. 
        Elle propose un large éventail de programmes en ingénierie, médecine, sciences sociales, 
        design, business et technologies de l'information.
        Grâce à ses partenariats internationaux, BAU permet aux étudiants de participer à des échanges
        et stages dans de grandes entreprises à travers le monde. Son campus, situé au bord du Bosphore, 
        offre un cadre de vie unique au cœur d'Istanbul.
        BAU se distingue par son approche pédagogique innovante, axée sur la pratique professionnelle et
        la préparation des étudiants aux défis du marché global.
      </p>
      <button onClick={() => navigate('/dashboard')} className="back-btn">Retour au Dashboard</button>
    </div>
  );
}

export default PartnerBAU;
