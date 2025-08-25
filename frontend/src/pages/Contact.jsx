import React from 'react';
import '../styles/Contact.css';
import faq_points from '../assets/faq_points.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // Importez le hook de traduction

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="contact-container">
      <div className="body-animation">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="waves"></div>
      </div>

      <div className="contact-banner">
        <h1>{t('contact.bannerTitle')}</h1>
      </div>

      <div className="form-wrapper">
        <div className="form-circle"></div> 
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{t('contact.nameLabel')}</label>
              <input type="text" id="name" placeholder={t('contact.namePlaceholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.emailLabel')}</label>
              <input type="email" id="email" placeholder={t('contact.emailPlaceholder')} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">{t('contact.phoneLabel')}</label>
              <input type="text" id="phone" placeholder={t('contact.phonePlaceholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t('contact.subjectLabel')}</label>
              <select id="subject" required>
                <option>{t('contact.subjectOption1')}</option>
                <option>{t('contact.subjectOption2')}</option>
                <option>{t('contact.subjectOption3')}</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">{t('contact.messageLabel')}</label>
            <textarea id="message" rows="5" placeholder={t('contact.messagePlaceholder')} required></textarea>
          </div>
             <p>
                {t('contact.termsText')}
             </p>
          <button type="submit" className="send-btn">{t('contact.sendButton')}</button>
        </form>
      </div>

      <div className="contact-content">
        <div className="contact-info">
  <h2>{t('contact.infoTitle')}</h2>
  <p>
    <strong>📍 {t('contact.infoAddressLabel')} :</strong> {t('contact.infoAddressValue')}
  </p>
  <p>
    <strong>📞 {t('contact.infoPhoneLabel')} :</strong> <a href="tel:+212771497646">{t('contact.infoPhoneValue')}</a>
  </p>
  <p>
    <strong>📧 {t('contact.infoEmailLabel')} :</strong> {t('contact.infoEmailValue')}
  </p>
</div>

        <div className="contact-social">
          <h2>{t('contact.socialTitle')}</h2>
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
            title={t('contact.locationTitle')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.812241490366!2d-7.625511084791403!3d33.58678048073064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cdf879ae6a75%3A0xc48ea991a833390!2sBd%20de%20la%20R%C3%A9sistance%20179%2C%20Casablanca%2020250%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1721766481737!5m2!1sfr!2sma"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;