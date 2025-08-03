import React, { useRef } from 'react';
import AOS from 'aos';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../styles/AboutUs.css';
import photo1 from '../assets/aboutus.jpg';
import photo2 from '../assets/aboutus1.jpg';
import photo3 from '../assets/aboutus2.jpg';
import photo4 from '../assets/aboutus3.jpg';
import photo5 from '../assets/aboutus4.jpg';
import nadiaboukdir from '../assets/NadiaBoukdir.jpeg';
import bouchralyass from '../assets/BouchyaLyass.jpg';
import hamzaaomari from '../assets/HamzaAomari.jpg';
import wiamfarih from '../assets/WiamFarih.jpg';

function AboutUs() {

    useEffect(() => {
  AOS.init({
    duration: 10000,  
    once: true       
  });
}, []);

const scrollRef = useRef(null);

const scrollTeam = (direction) => {
  const { current } = scrollRef;
  if (current) {
    const scrollAmount = direction === 'left' ? -300 : 300;
    current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

  return (
    <div className="about-container">
      <h1><span className="highlight-purple">À Propos</span> <span className="highlight-yellow">de DirAvenir</span></h1>

      <div className="about-section" data-aos="fade-right">
        <div className="about-image">
          <img src={photo4} alt="L’Aventure d’une Vision Partagée" />
        </div>
        <div className="about-text" data-aos="fade-right" id="spe_box">
          <h2><span className="highlight-purple"></span>L’Aventure <span className="highlight-yellow">d’une Vision Partagée</span></h2>
          <p>
            Notre entreprise est le fruit de mois de dévouement et de travail d'équipe 
            indéfectibles entre deux amis qui ont osé rêver. De la naissance de cette 
            idée à sa concrétisation, notre parcours a été jalonné de visions communes, 
            de collaborations nocturnes et d'une quête incessante de l'excellence. 
            Ensemble, nous avons bâti non seulement une entreprise, mais aussi un témoignage de la force de l'amitié,
            du travail acharné et d'un rêve commun devenu réalité.
          </p>
        </div>
      </div>

      <div className="about-section reverse" data-aos="fade-left">
        <div className="about-image">
          <img src={photo3} alt="Nos Valeurs" />
        </div>
        <div className="about-text" data-aos="fade-right" id="spe_box">
          <h2><span className="highlight-purple"></span>Pourquoi <span className="highlight-yellow">Nous Choisir ?</span></h2>
          <p>
            Plus qu’un simple accompagnement, DirAvenir offre une expérience humaine et chaleureuse.
            Nous travaillons en partenariat avec des universités de renommée mondiale, garantissant des formations de qualité,
            des destinations sûres, et un coût de vie maîtrisé pour nos étudiants.
          </p>
        </div>
      </div>
        <div className="about-section" data-aos="fade-right">
        <div className="about-image">
          <img src={photo2} alt="Innovation Pédagogique" />
        </div>
        <div className="about-text" data-aos="fade-left" id="spe_box">
          <h2><span className="highlight-purple"></span>Innovation <span className="highlight-yellow">Pédagogique</span></h2>
          <p>
            Engagés dans l'innovation pédagogique, nous sommes une nouvelle figure du secteur. Notre passion est d'ouvrir de nouveaux
            horizons aux jeunes, en leur offrant des opportunités inédites pour construire leurs bases académiques à l'étranger et explorer
            les possibilités transformatrices de l'apprentissage international.
          </p>
        </div>
      </div>

       <div className="about-section reverse" data-aos="fade-left">
        <div className="about-image">
          <img src={photo5} alt="Horizons Académiques" />
        </div>
        <div className="about-text" data-aos="fade-right" id="spe_box">
          <h2><span className="highlight-purple"></span>Horizons <span className="highlight-yellow">Académiques</span></h2>
          <p>
            Diravenir n'est pas seulement un service, c'est une invitation à nous rejoindre pour façonner l'avenir de l'éducation. 
            Nous envisageons un monde où l'éducation transcende les frontières, offrant des opportunités infinies à chacun. 
            Notre vision est celle d'une communauté mondiale où la diversité des perspectives, enrichie par des expériences internationales, 
            est porteuse de changements positifs. Nous aspirons à être le catalyseur d'un avenir où l'éducation responsabilise, connecte et 
            ouvre la voie vers un monde meilleur.  
          </p>
        </div>
      </div>
      <div className="about-image-center" data-aos="zoom-in">
        <img src={photo1} alt="Final Image" />
      </div>

<div className="about-mission-vision-values">
  <div className="mission-vision-row">
    <div className="mission-box">
      <h2 className="highlight-purple">Notre <span className="highlight-yellow">Mission</span></h2>
      <p>
        Nous aspirons à donner aux étudiants les moyens de réussir dans la vie, en leur offrant 
        non seulement une orientation académique, mais aussi l'espoir et l'inspiration pour réaliser 
        leurs rêves à l'étranger grâce à des bourses internationales, des stages internationaux, 
        des opportunités de bénévolat et bien plus encore.
      </p>
    </div>
    <div className="vision-box">
      <h2 className="highlight-purple">Notre <span className="highlight-yellow"> Vision</span></h2>
      <p>
        Nous construisons l'avenir des étudiants en leur fournissant une orientation académique 
        complète et des bourses internationales, en leur garantissant le soutien et les ressources 
        nécessaires pour réussir et réaliser leurs rêves à l'étranger
      </p>
    </div>
  </div>

  <div className="values-box">
    <h2 className="highlight-purple">Nos <span className='highlight-yellow'> Valeurs</span></h2>
    <div className="values-grid">
      <div className="value-card">
        <span role="img" aria-label="engagement">🤝🏻</span>
        <h3>Honnêteté</h3>
        <p>Nous tenons nos promesses envers les étudiants avec intégrité, transparence et un véritable engagement envers leur réussite.</p>
      </div>
      <div className="value-card">
        <span role="img" aria-label="diversité">💪🏻</span>
        <h3>Croiyance et confiance</h3>
        <p>Nous croyons en nos étudiants, quels que soient leurs résultats scolaires, leurs compétences ou leurs difficultés passées</p>
      </div>
      <div className="value-card">
        <span role="img" aria-label="intégrité">📈</span>
        <h3>Orienté vers la croissance</h3>
        <p>Nous aspirons à former une génération marocaine qui valorise l'éducation à l'échelle mondiale.</p>
      </div>
      <div className="value-card">
        <span role="img" aria-label="innovation">👨🏻‍🎓</span>
        <h3>Priorité aux étudiants</h3>
        <p>Nous plaçons les étudiants au cœur de tout ce que nous faisons, car leur réussite est ce qui compte le plus.</p>
      </div>
    </div>
  </div>
</div>


        <div className="team-section" data-aos="fade-up">
        <h2 className="team-title">Notre <span className='highlight-yellow'>Équipe</span></h2>
        <div className="team-wrapper">
          <button className="scroll-btn left" onClick={() => scrollTeam('left')}>
            <FaChevronLeft />
          </button>
          <div className="team-container" ref={scrollRef}>
            {[ // liste des membres (utilise map plus tard si tu veux optimiser)
              { img: wiamfarih, name: 'Wiam Farih', role: 'Conseillère pédagogique' },
              { img: nadiaboukdir, name: 'Nadia Boukdir', role: 'Co-fondatrice' },
              { img: bouchralyass, name: 'Bouchra Lyass', role: 'Coordinatrice marketing' },
              { img: hamzaaomari, name: 'Hamza Aomari', role: 'Conseiller pédagogique' },
              { img: wiamfarih, name: 'Wiam Farih', role: 'Conseillère pédagogique' },
              { img: wiamfarih, name: 'Wiam Farih', role: 'Conseillère pédagogique' },
              { img: wiamfarih, name: 'Wiam Farih', role: 'Conseillère pédagogique' },
              { img: wiamfarih, name: 'Wiam Farih', role: 'Conseillère pédagogique' },
              { img: wiamfarih, name: 'Wiam Farih', role: 'Conseillère pédagogique' },
            ].map((member, index) => (
              <div className="team-card" key={index}>
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scrollTeam('right')}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
