import React, { useState } from 'react';
import '../styles/faq.css';
import faq_points from '../assets/faq_points.png';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Récupération des FAQ traduites depuis i18n
  const faqData = t('faq.questions', { returnObjects: true });

  return (
    <div className="faq-page">
      <div className="faq-banner">
        <h1 className="faq-title">{t('faq.title')}</h1>
      </div>

      <div className="faq-container">
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleQuestion(index)}
              >
                {item.question}
                <span className="plus">{activeIndex === index ? '–' : '+'}</span>
              </button>
              <div
                className={`faq-answer-wrapper ${activeIndex === index ? 'open' : ''}`}
              >
                <div className="faq-answer">
                  <span className="faq-answer-line"></span>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="faq-points-container">
        <img src={faq_points} alt="Decorative points" />
      </div>
    </div>
  );
};

export default FAQ;
