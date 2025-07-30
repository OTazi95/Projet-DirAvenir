import React from 'react';
import { FaFacebookF, FaTiktok, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCopy } from 'react-icons/fa';
import '../styles/Footer.css';
import { Link} from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">Dir<span>Avenir</span></h1>
          <p>
            Diravenir est une plateforme web qui accompagne les étudiants dans leur orientation scolaire et leurs démarches de candidature au Maroc et à l’étranger. Elle se distingue par une approche personnalisée basée sur des tests, des recommandations et un suivi avant toute demande.
          </p>
          <h3 className="logo-text">Abonnez-vous à notre Newsletter</h3>
          <div className="newsletter">
            <input type="email" placeholder="Votre adresse email" />
            <button>➤</button>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Liens <span>Rapide</span></h3>
          <ul>
           <li><Link to="/dashboard">Accueil</Link></li>
           <li><a href="#">Chercher une université</a></li>
           <li><a href="#">Orientation</a></li>
           <li><a href="#">Nos packs</a></li>
           <li><a href="#">Universités partenaires</a></li>
           <li><a href="#">About us</a></li>
           <li><a href="#">Avis des étudiants</a></li>
           <li><Link to="/contact">Nous contacter</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contactez <span>Nous</span></h3>
          <p><FaMapMarkerAlt /> BD la Résistance, 179, Angle des Boulevards de Londres, Av. Mers Sultan, Casablanca 20250</p>
          <p><FaEnvelope /> contact@diravenir.com</p>
          <p><FaPhone /> +212 771 497 646</p>
          <div className="social-icons"><br />
            <h3>Suivez <span>Nous</span></h3>
            <a href="https://web.facebook.com/people/Diravenir/61553731883991/?_rdc=1&_rdr#"><FaFacebookF /></a>
            <a href="https://www.instagram.com/diravenir/"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@diravenir"><FaTiktok /></a>
            <a href="https://www.linkedin.com/company/diravenir/"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@Diravenir"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Terms & Conditions | Privacy Policy</p>
        <p>&copy; 2025 DirAvenir. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
