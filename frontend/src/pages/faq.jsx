import React, { useState } from 'react';
import '../styles/faq.css';

const faqData = [
  {
    question: "Who is eligible for orientation ?",
    answer: "Our orientation is open to students, career changers, and educational institutions. It’s designed to support anyone seeking academic or professional guidance."
  },
  {
    question: "What is Diravenir ?",
    answer: "Diravenir is an educational guidance platform that helps students, especially in Morocco, find study opportunities abroad. It offers personalized support in choosing programs, applying to universities, obtaining scholarships, and handling procedures such as visas and accommodation mainly in countries like China and Cyprus"
  },
  {
    question: "In which countries do you assist students ?",
    answer: "We assist students in exploring academic opportunities in Romania, Cyprus, and China. Whether it's for undergraduate or postgraduate studies, we provide guidance throughout the entire process from choosing the right program to securing a visa and finding accommodation. assist students globally, with a focus on Morocco and international studies."
  },
  {
    question: "What scholarships are available ?",
    answer: "We offer guidance on a variety of scholarship opportunities based We offer a variety of scholarship options to support students on their academic journey.You can access merit-based awards, need-based grants, and destination-specific scholarships for programs in countries like Romania, Cyprus, and China. Each opportunity includes full guidance on eligibility, application requirements, and deadlines. merit and need."
  },
  {
    question: "What documents are required for registration ?",
    answer: "Commonly required The documents required for registration typically include: A valid passport or ID, academic transcripts, proof of language proficiency, recommendation letters, and a completed application form. Other documents may also be required, and the entire Diravenir team will assist you in preparing and submitting all necessary paperwork. documents required for registration typically include: A valid passport or ID, academic transcripts, proof of language proficiency, recommendation letters, and a completed application form. Other documents may also be required, and the entire Diravenir team will assist you in preparing and submitting all necessary paperwork. include transcripts, ID, and motivation letters."
  },
  {
    question: "Do I need to speak English ?",
    answer: "Not necessarily. We Speaking English is often required, depending on the program and country. However, some programs may offer support in other languages. assistance in both French and English."
  },
  {
    question: "Do you assist with visa and housing arrangements ?",
    answer: "Yes, we help Yes, we assist with both visa applications and housing arrangements. Our team guides you through the entire process to ensure a smooth transition to your study destination. administrative support including visa and accommodation guidance."
  },
  {
    question: "Have you worked with students before ?",
    answer: "Yes, we have successfully worked with hundreds of students before and continue to support many throughout their academic journeys. guided many students through academic orientation."
  },
  {
    question: "How do I start the process ?",
    answer: "You can start To start the process, you can contact us via WhatsApp or fill out our online registration form. Our team will then guide you step-by-step through the next stages. creating an account and filling out our orientation form."
  },
  {
    question: "How do I know which study program is right for me ?",
    answer: "Our orientation test To find the right study program for you, we offer personalized counseling based on your interests, skills, and career goals. Our experts help you explore options and choose the best fit for your future. identify programs suited to your profile."
  },
  {
    question: "What is the best time to apply ?",
    answer: "We recommend It’s best to apply as soon as possible to secure your admission and scholarship. Starting early gives you the best chance to complete all requirements on time. between March and July for the next academic year."
  }
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
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
              <div className="faq-answer">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;