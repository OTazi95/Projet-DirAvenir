import React from 'react';
import '../styles/Contact.css';
import logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

function Contact() {
  return (
    <div className="contact-container">

   <div className="contact-header">
        <img src={logo} alt="Logo DirAvenir" className="contact-logo" />
        <h3 className="subtext">Nous sommes là pour vous aider à bâtir votre avenir !</h3><br />
      </div>

<div className="form-wrapper">
  <h2 className="form-title">Notre équipe est à votre écoute</h2>
  <form className="contact-form">
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="name">Nom complet*</label>
        <input type="text" id="name" placeholder="Veuillez saisir votre Nom et Prénom" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Adresse email*</label>
        <input type="email" id="email" placeholder="Veuillez saisir votre adresse mail" required />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="phone">Numéro téléphone*</label>
        <input type="text" id="phone" placeholder="Veuillez saisir votre numéro de téléphone" required />
      </div>
      <div className="form-group">
        <label htmlFor="subject">À propos*</label>
        <select id="subject" required>
          <option>Séléction le sujet de votre contact</option>
          <option>Orientation</option>
          <option>Payment Failure</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    <div className="form-group full-width">
      <label htmlFor="message">Votre message*</label>
      <textarea id="message" rows="5" placeholder="Tapez votre message...." required></textarea>
    </div>
   <p>En envoyant ce formumaire vous acceptez nos termes, conditons et politique de confidentialité 
    qui explique comment nous pouvons collecter, utiliser et divulguer vos informations personnelles, 
    y compris à des tiers.
   </p>
    <button type="submit" className="send-btn">Envoyé</button>
  </form>
</div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Nos coordonnées</h2>
          <p><strong>📍 Adresse :</strong> Bd de la Résistance, 179, Angle des Boulevards de Londres, Av. Mers Sultan, Casablanca 20250, Maroc</p>
          <p><strong>📞 Téléphone :</strong> 0771-497646</p>
          <p><strong>📧 Email :</strong> contact@diravenir.com</p>
        </div>

        <div className="contact-social">
          <h2>Suivez-nous sur nos réseaux sociaux !</h2>
          <div className="social-icons">
            <a href="https://www.instagram.com/diravenir/" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/diravenir/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://web.facebook.com/people/Diravenir/61553731883991/?_rdc=1&_rdr#" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://www.tiktok.com/@diravenir" target="_blank" rel="noreferrer"><FaTiktok /></a>
            <a href="https://www.youtube.com/@Diravenir" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>
        </div>
        <div>
              <iframe
    title="Localisation DirAvenir"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.812241490366!2d-7.625511084791403!3d33.58678048073064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cdf879ae6a75%3A0xc48ea991a833390!2sBd%20de%20la%20R%C3%A9sistance%20179%2C%20Casablanca%2020250%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1721766481737!5m2!1sfr!2sma"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    
  );
}

export default Contact;
