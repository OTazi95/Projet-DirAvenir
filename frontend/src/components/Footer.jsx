import React from 'react';
import { FaFacebookF, FaTiktok, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">Dir<span>Avenir</span></h1>
          <p>
            {t('footer.description')}
          </p>
          <h3 className="logo-text">{t('footer.subscribeTitle')}</h3>
          <div className="newsletter">
            <input type="email" placeholder={t('footer.emailPlaceholder')} />
            <button>➤</button>
          </div>
        </div>

        <div className="footer-section links">
          <h3>{t('footer.quickLinks')}</h3>
<ul>
  <li>
    <Link to="/dashboard">{t('footer.home')}</Link>
  </li>
  <li>
    <Link to="/programs">{t('footer.programs')}</Link>
  </li>
  <li>
    <Link to="/orientation">{t('footer.orientation')}</Link>
  </li>
  <li>
    <Link to="/packs">{t('footer.ourPacks')}</Link>
  </li>
  <li>
    <Link to="/about">{t('footer.aboutUs')}</Link>
  </li>
  <li>
    <Link to="/contact">{t('footer.contactUs')}</Link>
  </li>
</ul>
        </div>

        <div className="footer-section contact">
          <h3>{t('footer.contactTitle')}</h3>
          <p><FaMapMarkerAlt /> {t('footer.address')}</p>
          <p><FaEnvelope /> contact@diravenir.com</p>
          <p><FaPhone /> +212 771 497 646</p>
          <div className="social-icons"><br />
            <h3>{t('footer.followUs')}</h3>
            <a href="https://web.facebook.com/people/Diravenir/61553731883991/?_rdc=1&_rdr#"><FaFacebookF /></a>
            <a href="https://www.instagram.com/diravenir/"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@diravenir"><FaTiktok /></a>
            <a href="https://www.linkedin.com/company/diravenir/"><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@Diravenir"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footer.terms')} | {t('footer.privacy')}</p>
        <p>&copy; 2025 DirAvenir. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

export default Footer;