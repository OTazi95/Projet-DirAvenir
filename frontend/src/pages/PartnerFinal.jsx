import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Final-logo.png';
import logo1 from '../assets/Final.jpg';
import '../styles/PartnerDetail.css';

function PartnerFinal() {
  const navigate = useNavigate();

  return (
    <div className="partner-detail-page">
      <img src={logo} alt="Final International University" className="partner-logo" />
      <img src={logo1} alt="Final International University" className="partner-logo" />
      <h2>Final International University</h2>
      <p>
        Final International University (FIU) est située à Kyrenia, Chypre du Nord. Elle est réputée pour ses
        programmes en ingénierie, business, sciences sociales et tourisme. FIU met l’accent sur une éducation
        internationale de haute qualité et accueille des étudiants de divers pays.
      </p>
      <button onClick={() => navigate('/dashboard')} className="back-btn">Retour au Dashboard</button>
    </div>
  );
}

export default PartnerFinal;
