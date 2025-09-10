import React, { useState } from 'react';
import '../styles/Contact.css';
import faq_points from '../assets/faq_points.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  
  // 📝 NOUVEAU : État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  // 📝 NOUVEAU : État pour gérer le statut d'envoi
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', ou null

  // 📝 NOUVEAU : Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // 📝 NOUVEAU : Fonction pour envoyer l'email via Formspree
  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mjkekkqq', {   // ici ou il faut changer le lien pour l'envoie de formulaire 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          // Infos supplémentaires pour Diravenir
          source: '🌐 Site Diravenir - Formulaire Contact',
          date: new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        })
      });

      if (response.ok) {
        // 🚀 NOUVEAU : Remonter en haut de page avec animation fluide
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        setSubmitStatus('success');
        // Réinitialiser le formulaire après succès
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('Erreur envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 📝 NOUVEAU : Fonction pour aller au dashboard
  const goToDashboard = () => {
    // Remplacez par votre route vers le dashboard
    window.location.href = '/dashboard';
    // OU si vous utilisez React Router :
    // navigate('/dashboard');
  };

  return (
    <div className="contact-container">
      {/* 🎨 VOTRE DESIGN RESTE IDENTIQUE */}
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
        
        {/* 📝 NOUVEAU : Message de succès PLEIN ÉCRAN */}
        {submitStatus === 'success' && (
          <div className="success-fullscreen-overlay">
            <div className="success-fullscreen-content">
              <div className="success-animation">
                <div className="checkmark-circle">
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark-circle-path" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
              </div>
              
              <h2>🎉 Message envoyé avec succès !</h2>
              <p>Merci <strong>{formData.name || 'pour votre message'}</strong> ! Votre demande a été transmise à l'équipe Diravenir.</p>
              <p>Nous vous répondrons dans les plus brefs délais à l'adresse : <strong>{formData.email}</strong></p>
              
              <div className="success-actions">
                <button onClick={goToDashboard} className="dashboard-btn">
                  📊 Aller au Dashboard
                </button>
                <button onClick={() => setSubmitStatus(null)} className="continue-btn">
                  📝 Nouveau message
                </button>
              </div>
              
              <div className="success-decoration">
                <div className="floating-icon">🌟</div>
                <div className="floating-icon">✨</div>
                <div className="floating-icon">💫</div>
              </div>
            </div>
          </div>
        )}
        
        {/* 📝 NOUVEAU : Message d'erreur amélioré */}
        {submitStatus === 'error' && (
          <div className="status-message error-message">
            <p>❌ Une erreur s'est produite. Veuillez réessayer ou contacter Diravenir directement.</p>
            <button onClick={() => setSubmitStatus(null)} className="retry-btn">
              🔄 Réessayer
            </button>
          </div>
        )}

        {/* 🔄 MODIFIÉ : Ajout de onSubmit et des valeurs contrôlées */}
        <form className="contact-form" onSubmit={sendEmail}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{t('contact.nameLabel')}</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('contact.namePlaceholder')} 
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.emailLabel')}</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('contact.emailPlaceholder')} 
                required 
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">{t('contact.phoneLabel')}</label>
              <input 
                type="text" 
                id="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t('contact.phonePlaceholder')} 
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t('contact.subjectLabel')}</label>
              <select 
                id="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              >
                <option value="">Choose your subject...</option>
                <option value={t('contact.subjectOption1')}>{t('contact.subjectOption1')}</option>
                <option value={t('contact.subjectOption2')}>{t('contact.subjectOption2')}</option>
                <option value={t('contact.subjectOption3')}>{t('contact.subjectOption3')}</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="message">{t('contact.messageLabel')}</label>
            <textarea 
              id="message" 
              rows="5" 
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t('contact.messagePlaceholder')} 
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          
<p>
  {t('contact.termsPrefix')}{' '}
  <a href="/terms" className="terms-link">
    {t('contact.termsLink')}
  </a>{' '}
  {t('contact.and')}{' '}
  <a href="/privacy" className="privacy-link">
    {t('contact.privacyLink')}
  </a>
  .
</p>

          
          {/* 🔄 MODIFIÉ : Bouton avec état de chargement */}
          <button 
            type="submit" 
            className={`send-btn ${isSubmitting ? 'sending' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Sending in progress...
              </>
            ) : (
              t('contact.sendButton')
            )}
          </button>
        </form>
      </div>

      {/* 🎨 VOTRE SECTION RESTE 100% IDENTIQUE */}
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