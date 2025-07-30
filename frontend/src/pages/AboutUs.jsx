import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../styles/AboutUs.css';
import photo1 from '../assets/aboutus.jpg';
import photo2 from '../assets/aboutus1.jpg';
import photo3 from '../assets/aboutus2.jpg';
import photo4 from '../assets/aboutus3.jpg';
import photo5 from '../assets/aboutus4.jpg';

function AboutUs() {

    useEffect(() => {
  AOS.init({
    duration: 10000,  
    once: true       
  });
}, []);


  return (
    <div className="about-container">
      <h1><span className="highlight-purple">À Propos</span> <span className="highlight-yellow">de DirAvenir</span></h1>

      <div className="about-section" data-aos="fade-right">
        <div className="about-image">
          <img src={photo4} alt="L’Aventure d’une Vision Partagée" />
        </div>
        <div className="about-text" data-aos="fade-right">
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
        <div className="about-text" data-aos="fade-right">
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
        <div className="about-text" data-aos="fade-left">
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
        <div className="about-text" data-aos="fade-right">
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


    </div>
  );
}

export default AboutUs;
