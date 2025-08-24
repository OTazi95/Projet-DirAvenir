import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'aos/dist/aos.css';
import '../styles/AboutUs.css';

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
import raniajamaudi from '../assets/aboutUS/Photo_equipe/RaniaJamaudi.jpg';

import ourstory from '../assets/aboutUS/ourstory.png';
import beleive from '../assets/aboutUS/beleive.png';
import honesty from '../assets/aboutUS/honesty.png';
import growthoriented from '../assets/aboutUS/growthoriented.png';
import studentsfocus from '../assets/aboutUS/studentsfocus.png';
import vision from '../assets/aboutUS/vision.png';
import mission from '../assets/aboutUS/mission.png';
import points from '../assets/aboutUS/points.png';
import circle from '../assets/aboutUS/Ellipse.png';

const teamMembers = [
  { img: meryemderni, name: 'Meryem Derni', role: 'Co-Founder' },
  { img: nadiaboukdir, name: 'Nadia Boukdir', role: 'Co-Founder' },
  { img: bouchralyass, name: 'Bouchra Lyass', role: 'Marketing Coordinator ' },
  { img: raniajamaudi, name: 'Rania Jamoudi', role: 'Admission Coordinator' },
  { img: abdellahlouadi, name: 'Abdellah Louadi ', role: 'Educational Consultant' },
  { img: hamzaaomari, name: 'Hamza Aomari', role: 'Educational Consultant' },
  { img: wiamfarih, name: 'Wiam Farih', role: 'Educational Consultant' },
  { img: marouanezahid, name: 'Marouane Zahid', role: 'Educational Consultant' },
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const prevMember = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 3 : prev - 3));
  };

  const nextMember = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 3 ? 0 : prev + 3));
  };

  const visibleMembers = [];
  for (let i = 0; i < 3; i++) {
    visibleMembers.push(teamMembers[(currentIndex + i) % teamMembers.length]);
  }

  return (
    <div className="about-us">
      {/* Banner */}
      <section className="banner">
        <div className="banner-text">
          <h2 className="about-title" data-aos="fade-right">
            A&nbsp;B&nbsp;O&nbsp;U&nbsp;T&nbsp;&nbsp;&nbsp;U&nbsp;S
          </h2>
          <h1 className="main-title" data-aos="fade-left">
            The Platform <br />
            <span className="subtitle">
              For The Next <br />
              <span className="future-makers">Future Makers</span>
            </span>
          </h1>
          <p className="banner-texts" data-aos="fade-up">
            <span className="trans">
              Transforming education for the<br />
              <span className="next">next generation of students & learners</span>
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
          <h3>O&nbsp;U&nbsp;R&nbsp;&nbsp;&nbsp;S&nbsp;T&nbsp;O&nbsp;R&nbsp;Y</h3>
          <h2 className="headline">
            Innovating new <br />
            ways to guide <br />
            <span className="highlighted-word">students</span>
          </h2>
          <p>
            We believe in the power of purpose-driven learning and bold imagination. We see no limits to what we can build when curiosity meets community, when dreams are backed by action.
            <br /><br />
            We are not just educating the next generation, we are co-creating the future with them. Each scholar is a builder, a thinker, a doer. Together, we are shaping futures that matter.
            <br /><br />
            This is more than a platform. This is a movement for those who dare to dream and work to build.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision">
        <div className="mission" data-aos="fade-up">
          <img src={mission} alt="Mission" />
          <h3><span className="our-text">Our </span><span className="highlight-yellow">Mission</span></h3>
          <p className="mission-text">
            We aspire to empower students to succeed in life, offering not only academic orientation but also the hope and inspiration to realize their dreams abroad through international scholarships, global internships, volunteering opportunities & many more.
          </p>
        </div>
        <div className="vision" data-aos="fade-up">
          <img src={vision} alt="Vision" />
          <h3><span className="our-text">Our </span><span className="highlight-yellow">Vision</span></h3>
          <p className="vision-text">
            We build students' futures by providing comprehensive academic guidance, international scholarships ensuring they have the support and resources needed to succeed and realize their<br /> dreams abroad.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <h2 data-aos="fade-down">
          <span className="text-purple">Our </span>
          <span className="text-yellow">Values</span>
        </h2>
        <div className="values-list">
          <div className="value" data-aos="zoom-in">
            <img src={honesty} alt="Honesty" />
            <h4>Honesty</h4>
            <p>We deliver on our promises to students with integrity, transparency, and a genuine commitment to their success.</p>
          </div>
          <div className="value" data-aos="zoom-in">
            <img src={studentsfocus} alt="Student Focus" />
            <h4>Students Focus</h4>
            <p>We keep students at the heart of everything we do because their success is what&nbsp;matters <br />most.</p>
          </div>
          <div className="value" data-aos="zoom-in">
            <img src={growthoriented} alt="Growth" />
            <h4>Growth Oriented</h4>
            <p>We aspire to cultivate a Moroccan generation that values education on a&nbsp;global <br />scale.</p>
          </div>
          <div className="value" data-aos="zoom-in">
            <img src={beleive} alt="Believe" />
            <h4>Believe</h4>
            <p>We believe in our students, regardless of their academic grades, skills, or&nbsp;past <br />challenges.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team">
        <h2 data-aos="fade-down">Our <span className="highlight-yellow">Team</span></h2>
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