import React from 'react';
import { FaFacebookF, FaTiktok, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../styles/Footer.css';
import logo from '../assets/logoj.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src={logo} alt="DirAvenir Logo" className="footer-logo" />
          <p>
            {t('footer.description')}
          </p>
          <h3 className="yellow">{t('footer.subscribeTitle')}</h3>
          <div className="newsletter">
            <input type="email" placeholder={t('footer.emailPlaceholder')} />
            <button>➤</button>
          </div>
        </div>

        <div className="footer-section links">
          <h3>
  <span className="white">{t('footer.quickLinks').split(' ')[0]}</span>{' '}
  <span className="yellow">{t('footer.quickLinks').split(' ')[1]}</span>
</h3>
<ul>
  <li className='yellow'>
    <Link to="/dashboard">{t('footer.home')}</Link>
  </li>
  <li className='yellow'>
    <Link to="/programs">{t('footer.programs')}</Link>
  </li>
  <li className='yellow'>
    <Link to="/orientation">{t('footer.orientation')}</Link>
  </li>
  <li className='yellow'> 
    <Link to="/about">{t('footer.aboutUs')}</Link>
  </li>
  <li className='yellow'>
    <Link to="/contact">{t('footer.contactUs')}</Link>
  </li>
</ul>
        </div>

        <div className="footer-section contact">
          <h3>
  <span className="white">{t('footer.contactTitle').split(' ')[0]}</span>{' '}
  <span className="yellow">{t('footer.contactTitle').split(' ')[1]}</span>
</h3>
          <p><FaMapMarkerAlt className='yellow' /> {t('footer.address')}</p>
          <p><FaEnvelope className='yellow' /> contact@diravenir.com</p>
          <p><FaPhone className='yellow' /> +212 771 497 646</p>
          <div className="social-icons"><br />
            <h3>
  <span className="white">{t('footer.followUs').split(' ')[0]}</span>{' '}
  <span className="yellow">{t('footer.followUs').split(' ')[1]}</span>
</h3>
            <a href="https://web.facebook.com/people/Diravenir/61553731883991/?_rdc=1&_rdr#" id='white'><FaFacebookF /></a>
            <a href="https://www.instagram.com/diravenir/" id='white'><FaInstagram /></a>
            <a href="https://www.tiktok.com/@diravenir" id='white'><FaTiktok /></a>
            <a href="https://www.linkedin.com/company/diravenir/" id='white'><FaLinkedinIn /></a>
            <a href="https://www.youtube.com/@Diravenir" id='white'><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p> <Link to="/terms" className="terms-link" id='fot'>{t('footer.terms')}</Link> | <Link to="/privacy" className="privacy-link" id='fot'>{t('footer.privacy')}</Link></p>
        <p>&copy; 2025 <span className='yellow'>Dir</span>Avenir. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

export default Footer;