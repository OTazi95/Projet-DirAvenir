import React, { useState } from 'react';
import '../styles/faq.css';
import faq_points from '../assets/faq_points.png';

const faqData = [
  {
    question: "Who is eligible for orientation ?",
    answer: "Our orientation is open to students, career changers, and educational institutions. It’s designed to support anyone seeking academic or professional guidance."
  },
  {
    question: "What is Diravenir ?",
    answer: "Diravenir is an educational guidance platform that helps students, especially in Morocco, find study opportunities abroad. It offers personalized support in choosing programs, applying to universities, obtaining scholarships, and handling procedures such as visas and accommodation mainly in countries like China and Cyprus."
  },
  {
    question: "In which countries do you assist students ?",
    answer: "We assist students in exploring academic opportunities in Romania, Cyprus, and China. Whether it's for undergraduate or postgraduate studies, we provide guidance throughout the entire process from choosing the right program to securing a visa and finding accommodation."
  },
  {
    question: "What scholarships are available ?",
    answer: "We offer guidance on a variety of scholarship opportunities to support students on their academic journey. You can access merit-based awards, need-based grants, and destination-specific scholarships for programs in countries like Romania, Cyprus, and China."
  },
  {
    question: "What documents are required for registration ?",
    answer: "The documents required typically include: a valid passport or ID, academic transcripts, proof of language proficiency, recommendation letters, and a completed application form. Our team assists you in preparing and submitting all necessary paperwork."
  },
  {
    question: "Do I need to speak English ?",
    answer: "Not necessarily. English is often required depending on the program and country. Some programs may offer support in other languages, including French."
  },
  {
    question: "Do you assist with visa and housing arrangements ?",
    answer: "Yes, we assist with both visa applications and housing arrangements. Our team guides you through the entire process."
  },
  {
    question: "Have you worked with students before ?",
    answer: "Yes, we have successfully guided many students through their academic journeys."
  },
  {
    question: "How do I start the process ?",
    answer: "To start, you can contact us via WhatsApp or fill out our online registration form. Our team will guide you step-by-step."
  },
  {
    question: "How do I know which study program is right for me ?",
    answer: "We offer personalized counseling based on your interests, skills, and career goals to help you choose the best program for your future."
  },
  {
    question: "What is the best time to apply ?",
    answer: "It’s best to apply as soon as possible, ideally between March and July for the next academic year."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-page">
      <div className="faq-banner">
        <h1 className="faq-title">Frequently Asked Questions</h1>
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
              <div className={`faq-answer-wrapper ${activeIndex === index ? 'open' : ''}`}>
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
