import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'aos/dist/aos.css';
import '../styles/AboutUs.css';
import { useTranslation } from 'react-i18next';

import photo2 from '../assets/aboutUS/aboutus1.jpg';
import photo3 from '../assets/aboutUS/aboutus2.jpg';
import photo5 from '../assets/aboutUS/aboutus4.jpg';

import nadiaboukdir from '../assets/aboutUS/Photo_equipe/NadiaBoukdir.jpeg';
import bouchralyass from '../assets/aboutUS/Photo_equipe/BouchraLyass.jpg';
import hamzaaomari from '../assets/aboutUS/Photo_equipe/HamzaAomari.jpg';
import wiamfarih from '../assets/aboutUS/Photo_equipe/WiamFarih.jpg';
import abdellahlouadi from '../assets/aboutUS/Photo_equipe/AbdellahLouadi.jpg';
import marouanezahid from '../assets/aboutUS/Photo_equipe/MarouaneZahid.jpg';
import meryemderni from '../assets/aboutUS/Photo_equipe/MeryemDerni.jpg';
import raniajamoudi from '../assets/aboutUS/Photo_equipe/RaniaJamaudi.jpg';

import ourstory from '../assets/aboutUS/ourstory.png';
import beleive from '../assets/aboutUS/beleive.png';
import honesty from '../assets/aboutUS/honesty.png';
import growthoriented from '../assets/aboutUS/growthoriented.png';
import studentsfocus from '../assets/aboutUS/studentsfocus.png';
import vision from '../assets/aboutUS/vision.png';
import mission from '../assets/aboutUS/mission.png';
import points from '../assets/aboutUS/points.png';
import circle from '../assets/aboutUS/Ellipse.png';

const memberImages = {
  meryemderni,
  nadiaboukdir,
  bouchralyass,
  raniajamoudi,
  abdellahlouadi,
  hamzaaomari,
  wiamfarih,
  marouanezahid,
};

const valueImages = {
  'Honnêteté': honesty,
  'Centré sur l\'étudiant': studentsfocus,
  'Axé sur la croissance': growthoriented,
  'Croyance': beleive,
  'Honesty': honesty,
  'Students Focus': studentsfocus,
  'Growth Oriented': growthoriented,
  'Believe': beleive
};

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // AJOUT : Gérer l'attribut lang pour le CSS conditionnel
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const teamMembers = t('about.teamMembers', { returnObjects: true });
  const values = t('about.values', { returnObjects: true });

  const prevMember = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const nextMember = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const visibleMembers = [];
  // Gérer le cas où le tableau est vide
  if (teamMembers && teamMembers.length > 0) {
    for (let i = 0; i < 3; i++) {
      const memberIndex = (currentIndex + i) % teamMembers.length;
      const member = teamMembers[memberIndex];
      const memberNameKey = member.name.toLowerCase().replace(/ /g, '');
      const memberImg = memberImages[memberNameKey];

      // Vérifiez si le membre et l'image existent avant de les ajouter
      if (member && memberImg) {
        visibleMembers.push({
          ...member,
          img: memberImg
        });
      }
    }
  }

  return (
    <div className="about-us">
      {/* Banner */}
      <section className="banner">
        <div className="banner-text">
          <h2 className="about-title" data-aos="fade-right">
            {t('about.bannerTitle').split(' ').map((word, wordIndex, wordArray) => (
              <React.Fragment key={wordIndex}>
                {word.split('').join(' ')}
                {wordIndex < wordArray.length - 1 && '\u00A0\u00A0'}
              </React.Fragment>
            ))}
          </h2>
          <h1 className="main-title" data-aos="fade-left">
            {t('about.mainTitle')} <br />
            <span className="subtitle">
              {t('about.subTitle')} <br />
              <span className="future-makers">{t('about.futureMakers')}</span>
            </span>
          </h1>
          <p className="banner-texts" data-aos="fade-up">
            <span className="trans">
              {t('about.bannerText')}
            </span>
          </p>
          <div className="parent-container" data-aos="zoom-in">
            <img src={points} alt="dots" className="dots" />
            <img src={points} alt="dots" className="dots" />
          </div>
        </div>
        <div className="banner-images">
          <img src={circle} alt="Circle" className="circle" data-aos="zoom-in" />
          <img src={photo3} alt="Banner 1" className="img-top" data-aos="fade-down" />
          <img src={photo5} alt="Banner 2" className="img-middle" data-aos="fade-up" />
          <img src={photo2} alt="Banner 3" className="img-bottom" data-aos="fade-up" />
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="story-image" data-aos="fade-left">
          <img src={ourstory} alt="Story" />
        </div>
        <div className="story-text" data-aos="fade-right">
          <h3>
            {t('about.ourStoryTitle').split(' ').map((word, index, array) => (
              <React.Fragment key={index}>
                {word.split('').join(' ')}
                {index < array.length - 1 && '\u00A0\u00A0'}
              </React.Fragment>
            ))}
          </h3>
          <h2 className="headline">
            {t('about.storyHeadline').split(' ').map((word, index) => (
              word === 'students' ? <span key={index} className="highlighted-word">{word}</span> : (word + (index === t('about.storyHeadline').split(' ').length - 1 ? '' : ' '))
            ))}
          </h2>
          <p>
            {t('about.storyParagraph1')}
            <br /><br />
            {t('about.storyParagraph2')}
            <br /><br />
            {t('about.storyParagraph3')}
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision">
        <div className="mission" data-aos="fade-up">
          <img src={mission} alt="Mission" />
          <h3><span className="our-text">{t('about.missionTitle').split(' ')[0]} </span><span className="highlight-yellow">{t('about.missionTitle').split(' ')[1]}</span></h3>
          <p className="mission-text">
            {t('about.missionText')}
          </p>
        </div>
        <div className="vision" data-aos="fade-up">
          <img src={vision} alt="Vision" />
          <h3><span className="our-text">{t('about.visionTitle').split(' ')[0]} </span><span className="highlight-yellow">{t('about.visionTitle').split(' ')[1]}</span></h3>
          <p className="vision-text">
            {t('about.visionText')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <h2 data-aos="fade-down">
          <span className="text-purple">{t('about.valuesTitle').split(' ')[0]} </span>
          <span className="text-yellow">{t('about.valuesTitle').split(' ')[1]}</span>
        </h2>
        <div className="values-list">
          {values.map((value, index) => (
            <div className="value" key={index} data-aos="zoom-in">
              <img src={valueImages[value.title]} alt={value.title} />
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="team">
        <h2 data-aos="fade-down">{t('about.teamTitle').split(' ')[0]} <span className="highlight-yellow">{t('about.teamTitle').split(' ')[1]}</span></h2>
        <div className="team-slider">
          <button className="arrow left-arrow" onClick={prevMember}>
            <FaChevronLeft size={30} />
          </button>
          <div className="team-members">
            {visibleMembers.map((member, index) => (
              <div className="team-member" key={index} data-aos="fade-up">
                <img className="team-photo" src={member.img} alt={member.name} />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
          <button className="arrow right-arrow" onClick={nextMember}>
            <FaChevronRight size={30} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;