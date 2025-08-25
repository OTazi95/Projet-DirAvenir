import React from 'react';
import '../styles/Orientation.css';
import orientationImage from '../assets/orien.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importez le hook de traduction

function Orientation() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialisez le hook de traduction

  const startTest = () => {
    navigate('/orientation/test');
  };

  return (
    <div className="orientation-wrapper">
      <h1 className="orientation-title">
        {t('orientation.titlePart1')} <span className="highlight">{t('orientation.titlePart2')}</span>
      </h1>

      <div className="orientation-content">
        {/* BOUTONS À GAUCHE */}
        <div className="orientation-form">
          <div className="help-section">
            <p className="help-text">{t('orientation.helpText')}</p>
            <div className="buttons-container">
              <button className="btn-primary" onClick={startTest}>
                <span>{t('orientation.startButtonPart1')}</span>
                <span>{t('orientation.startButtonPart2')}</span>
              </button>
              <button className="btn-secondary" onClick={() => navigate('/programs')}>
                <span>{t('orientation.programsButtonPart1')}</span>
                <span>{t('orientation.programsButtonPart2')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* IMAGE À DROITE */}
        <div className="orientation-image">
          <img src={orientationImage} alt={t('orientation.imageAlt')} />
        </div>
      </div>
    </div>
  );
}

export default Orientation;