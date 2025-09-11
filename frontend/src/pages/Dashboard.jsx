import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import '../styles/Dashboard.css';
import guide from '../assets/home_pictures/guide.png';
import ai1 from '../assets/home_pictures/AI1.png';
import ai2 from '../assets/home_pictures/AI2.png';
import ai3 from '../assets/home_pictures/AI3.png'; 
import ai4 from '../assets/home_pictures/AI4.png';
import career2 from '../assets/home_pictures/career2.png';
import students from '../assets/home_pictures/student.png';
import colleges from '../assets/home_pictures/colleges.png';
import institu from '../assets/home_pictures/institu.png';
import career from '../assets/home_pictures/career.png';
import point from '../assets/home_pictures/point.png';
import howitworks from '../assets/home_pictures/how_it_works.png';
import itemicon from '../assets/home_pictures/itemicon.png';
import livre from '../assets/home_pictures/livre.png';
import profile1 from '../assets/home_pictures/profile1.png';
import profile2 from '../assets/home_pictures/profile2.png';
import profile3 from '../assets/home_pictures/profile3.png';
import trophy from '../assets/home_pictures/trophy.png';
import finalUni from '../assets/Final-logo.png';
import cyprusUni from '../assets/Cyprus-logo.png';
import bauUni from '../assets/BAU-logo.png';
import chinaDest from '../assets/home_pictures/china.png';
import cyprusDest from '../assets/home_pictures/cyprus.png';
import romaniaDest from '../assets/home_pictures/romania.png';
import { FaGraduationCap, FaMedal } from 'react-icons/fa'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: 'Anir chentre',
    role: 'Business Administration',
    rating: 4,
    duration: '6 Month Ago',
    sponsor: 'Dravenir Scholar',
    description: "I want to sincerely thank Dravenir for their professional, honest, and transparent service. Their integrity stood out and made the whole process smooth. I highly recommend them.",
    profileIcon: <img src={profile1} alt="Anir Chentre" style={{ width: '84px', height: '84px', borderRadius: '10%' }} />,
    badgeIcon: <FaMedal />,
    degreeIcon: <FaGraduationCap />,
    badgeText: 'Scholarship A',
    degreeText: 'Bachelor',
  },
  {
    id: 2,
    name: 'Abderazak Elghalibi',
    role: 'Cyber Security',
    rating: 4,
    duration: '3 Month ago',
    sponsor: 'Self-sponsor',
    description: "I highly recommend Dravenir to anyone planning to study abroad, especially in China. The team is professional, responsive, and truly understanding.",
    profileIcon: <img src={profile3} alt="Fatimazahra Naim" style={{ width: '84px', height: '84px', borderRadius: '10%' }} />,
    badgeIcon: <FaMedal />,
    degreeIcon: <FaGraduationCap />,
    badgeText: 'Self-sponsor',
    degreeText: 'Master',
  },
  {
    id: 3,
    name: 'El Abbadi Hind',
    role: 'Architecture',
    rating: 4,
    duration: '6 Month ago',
    sponsor: 'Scholarship',
    description: "I would like to extend my heartfelt thanks and appreciation to Dravenir for their outstanding services. They have demonstrated a high level of professionalism and exceptional commitment to meeting my needs.",
    profileIcon: <img src={profile2} alt="El Abbadi Hind" style={{ width: '84px', height: '84px', borderRadius: '10%' }} />,
    badgeIcon: <FaMedal />,
    degreeIcon: <FaGraduationCap />,
    badgeText: 'Scholarship B',
    degreeText: 'Language Year',
  },
  {
    id: 4,
    name: 'Sofia Alami',
    role: 'Biotechnology',
    rating: 5,
    duration: '2 Month Ago',
    sponsor: 'Dravenir Scholar',
    description: "Thanks to Dravenir, I was able to realize my dream of studying abroad. The process was transparent, and their support was invaluable at every step.",
    profileIcon: <img src={profile1} alt="Sofia Alami" style={{ width: '84px', height: '84px', borderRadius: '10%' }} />,
    badgeIcon: <FaMedal />,
    degreeIcon: <FaGraduationCap />,
    badgeText: 'Scholarship C',
    degreeText: 'Bachelor',
  },
];

const destinations = [
  { id: 1, image: chinaDest },
  { id: 2, image: cyprusDest },
  { id: 3, image: romaniaDest },
];

const partners = [
  { id: 1, name: 'Final International University', logo: finalUni },
  { id: 2, name: 'Cyprus International University', logo: cyprusUni },
  { id: 3, name: 'BAU University', logo: bauUni },
];

const StarRating = ({ rating, duration }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    );
  }
  return (
    <div className="star-rating">
      {stars}
      <span className="duration">{duration}</span>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [topPrograms, setTopPrograms] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Ajoutez cet état en haut de votre composant Dashboard
const [savedPrograms, setSavedPrograms] = useState([]);
const [logos, setLogos] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8000/api/logos/")
    .then((res) => {
      console.log("Logos API:", res.data);
      setLogos(res.data.logos);
    })
    .catch((err) => console.error("Erreur logos :", err));
}, []);

// Chargez les programmes sauvegardés depuis le localStorage au démarrage
useEffect(() => {
  const savedProgramsFromStorage = localStorage.getItem('savedPrograms');
  if (savedProgramsFromStorage) {
    try {
      const parsed = JSON.parse(savedProgramsFromStorage);
      setSavedPrograms(parsed);
    } catch (error) {
      console.error('Erreur lors du parsing des programmes sauvegardés:', error);
    }
  }
}, []);

// Sauvegardez les programmes dans le localStorage à chaque changement
useEffect(() => {
  localStorage.setItem('savedPrograms', JSON.stringify(savedPrograms));
}, [savedPrograms]);



  const toggleSaveProgram = (programId) => {
  setSavedPrograms((prev) => {
    const newSavedPrograms = prev.includes(programId)
      ? prev.filter((id) => id !== programId)
      : [...prev, programId];

    return newSavedPrograms;
  });
};


  const [activeDot, setActiveDot] = useState(0);
  const containerRef = useRef(null);
  const testimonialsTrackRef = useRef(null);

  useEffect(() => {
    const prenomLocal = localStorage.getItem('prenom');
    const nomLocal = localStorage.getItem('nom');
    if (prenomLocal && nomLocal) {
      setPrenom(prenomLocal);
      setNom(nomLocal);
    }
  }, []);

  // Charger toutes les filières uniques et les 5 premiers programmes
  useEffect(() => {
    const fetchTopPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/list-programmes-v2/', {
          params: {
            page: 1,
            category: '',
            country: ''
          }
        });
        
        // Prendre seulement les 8 premiers (ils sont déjà triés par ranking dans le backend)
        setTopPrograms(response.data.results.slice(0, 8));
      } catch (error) {
        console.error('Erreur lors du chargement des programmes populaires', error);
      }
    };

    fetchTopPrograms();
  }, []);

   const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

const handleProgramDetail = (programId) => {
    navigate(`/program-detail/${programId}`);
  };

  const applyNewFilters = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/list-programmes-v2/', {
        params: {
          page: 1,
          category: searchCategory,
          country: searchCountry
        }
      });
      
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la recherche', error);
      setSearchResults([]);
    }
  };

  const handleApply = (programId) => {
  navigate(`/application/${programId}`);
};

  // Fonction pour réinitialiser la nouvelle recherche
  const resetNewSearch = () => {
    setSearchCategory('');
    setSearchCountry('');
    setSearchResults([]);
  };

  const programs = [
    { id: 1, image: "/images/civil-engineering.png", title: "Civil Engineering", description: "Build the world with innovation and precision.", alt: "Civil Engineering Logo" },
    { id: 2, image: "/images/medicine.png", title: "Medicine", description: "Become a healer with advanced medical knowledge.", alt: "Medicine Logo" },
    { id: 3, image: "/images/computer-science.png", title: "Computer Science", description: "Shape the future with cutting-edge technology.", alt: "Computer Science Logo" },
    { id: 4, image: "/images/business.png", title: "Business Administration", description: "Lead with strategic thinking and innovation.", alt: "Business Logo" },
    { id: 5, image: "/images/architecture.png", title: "Architecture", description: "Design spaces that inspire and transform.", alt: "Architecture Logo" },
    { id: 6, image: "/images/law.png", title: "Law", description: "Champion justice with legal expertise.", alt: "Law Logo" },
    { id: 7, image: "/images/psychology.png", title: "Psychology", description: "Understand minds and transform lives.", alt: "Psychology Logo" },
    { id: 8, image: "/images/economics.png", title: "Economics", description: "Analyze markets and drive economic growth.", alt: "Economics Logo" }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 250 + 20;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveDot(newIndex);
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDotClick = (index) => {
    setActiveDot(index);
    if (testimonialsTrackRef.current) {
      const cardWidth = 350; 
      const cardGap = 30;
      const newPosition = index * (cardWidth + cardGap);
      testimonialsTrackRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  const specialRoles = ['Cyber Security', 'Business Administration', 'Architecture', 'Biotechnology'];

  return (
    <div className="dashboard-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Guide Your Way <br />
              Up To Success <br />
              With Us
            </h1>
            <p id='ph'>Get the guidance you need for <br/>the future of work.</p>
 {/* Nouvelle barre de recherche avec input */}
        <div className="filters-container">
          <input
            type="text"
            placeholder="Research by categories..."
            value={searchCategory}
            onChange={handleCategoryChange}
            className="filter-input"
          />
          
          <button className="search-button" onClick={applyNewFilters}>
            Research
          </button>
          
          <button className="reset-button" onClick={resetNewSearch}>
            Reset
          </button>
        </div>

        {/* Résultats de la nouvelle recherche */}
        {searchResults.length > 0 && (
          <div className="popular-programs-section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <h2>
              Search <span className="highlight-yellow">Results</span> ({searchResults.length})
            </h2>

            <div className="programs-grid">
              {searchResults.map((program, index) => (
                <motion.div
                  key={program.id || index}
                  className="program-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {/* Logo de l'université en haut */}
                  <div className="logo-wrapper">
                    <img
                      src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : '/default-logo.png'}
                      alt={`${program.universities} logo`}
                    />
                  </div>

                  {/* Contenu blanc */}
                  <div className="card-content">
                    <h3 className='program-title'>{program.program}</h3>
                    <p className="program-description">{program.description}</p>

                    {/* Boutons */}
                    <div className="card-actions">
                      <div className="action-buttons-top">
                        <button
                          className="more-infos-button"
                          onClick={() => handleProgramDetail(program.id)}
                        >
                          More Infos
                        </button>
                        <button
                      className={`save-this-button ${savedPrograms.includes(program.id) ? 'saved' : ''}}
                      onClick={() => toggleSaveProgram(program.id)`}
                    >
                      {savedPrograms.includes(program.id) ? 'Unsave' : 'Save This'}
                    </button>
                      </div>
                      <button
                        className="apply-now-button"
                        onClick={() => handleApply(program.id)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Message si pas de résultats - CORRIGÉ */}
        {searchResults.length === 0 && (searchCategory || searchCountry) && (
          <div className="popular-programs-section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="no-results">
              <h3 style={{ color: '#541652', textAlign: 'center', fontSize: '1.5rem' }}>
                No programs found for these search criteria.
              </h3>
              <p style={{ color: '#777', textAlign: 'center', marginTop: '10px' }}>
                Try different keywords or reset your filters.
              </p>
            </div>
          </div>
        )}

          </div>
          <div className="hero-image-container">
            <img src={guide} alt="Orientation" className="hero-image" />
          </div>
        </div>
      </section>

      {/* 2. Platform Description */}
      <section className="platform-description">
        <div className="platform-content">
          <div className="description-text">
            <h2>
              Morocco's <br />
              First AI Based <br />
              <span className="yellow-text">Orientation Platform</span>
            </h2>
            <img src={point} alt="Decorative dots" className="decorative-dots" />
          </div>
          <div className="service-images-container" ref={containerRef}>
            <img src={ai1} alt="AI Based Program Selector" />
            <img src={ai2} alt="AI Based Scenarios" />
            <img src={ai3} alt="AI Based Quizzes/Tests" />
            <img src={ai4} alt="AI Based Gamification" />
          </div>
        </div>
        <div className="carousel-nav-dots">
          {[...Array(4)].map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeDot ? 'active' : ''}}
              onClick={() => handleDotClick(index)`}
            ></span>
          ))}
        </div>
      </section>

      {/* 3. Who Can Join */}
      <section className="who-can-join">
        <div className="join-content">
          <div className="join-text">
            <h4>W&nbsp;H&nbsp;O&nbsp;&nbsp; C&nbsp;A&nbsp;N&nbsp;&nbsp; J&nbsp;O&nbsp;I&nbsp;N</h4>
            <h2>
              Career Orientation <br /> Schemes For All
            </h2>
            <div className="join-list">
              <div className="join-item">
                <div className="item-number">01</div>
                <div className="item-text">
                  <img src={colleges} alt="Universities icon" className="colleges" style={{ width: '40px', height: '40px' }}/>
                  <h4>Colleges/Universities</h4>
                </div>
              </div>
              <div className="join-item">
                <div className="item-number">02</div>
                <div className="item-text">
                  <img src={students} alt="Students icon" style={{ width: '40px', height: '40px' }}/>
                  <h4>Students</h4>
                </div>
              </div>
              <div className="join-item">
                <div className="item-number">03</div>
                <div className="item-text">
                  <img src={career} alt="Career Changers icon" className="career" style={{ width: '40px', height: '40px' }}/>
                  <h4>Career Changers</h4>
                </div>
              </div>
              <div className="join-item">
                <div className="item-number">04</div>
                <div className="item-text">
                  <img src={institu} alt="Educational Institutions icon" className="institutions-icon" style={{ width: '40px', height: '40px' }}/>
                  <h4>Educational Institutions</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="join-image">
            <img src={career2} alt="Student illustration" />
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="how-it-works">
        <img src={howitworks} alt="How it works illustration" className="how-it-works-illustration" />
      </section>
 
   {/* SECTION PROGRAMMES POPULAIRES */}
      <div className="popular-programs-section">
        <h2>
          Popular <span className="highlight-yellow">Programs</span>
        </h2>
<div className="programs-grid">
  {topPrograms.map((program, index) => (
    <motion.div
      key={program.id || index}
      className="program-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="logo-wrapper">
        <img
          src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : '/default-logo.png'}
          alt={`${program.universities} logo`}
        />
      </div>
      <div className="card-content">
        <h3 className='program-title'>{program.program}</h3>
        <p className="program-description">{program.description}</p>
        {/* Boutons */}
        <div className="card-actions">
          <div className="action-buttons-top">
            <button
              className="more-infos-button"
              onClick={() => handleProgramDetail(program.id)}
            >
              More Infos
            </button>
            <button
              className={`save-this-button ${savedPrograms.includes(program.id) ? 'saved' : ''}`}
              onClick={() => toggleSaveProgram(program.id)}
            >
              {savedPrograms.includes(program.id) ? 'Unsave' : 'Save This'}
            </button>
          </div>
          <button
            className="apply-now-button"
            onClick={() => handleApply(program.id)}
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  ))}
</div>


        {/* BOUTON VOIR TOUS LES PROGRAMMES */}
        <div className="view-all-container">
          <button 
            className="view-all-button"
            onClick={() => navigate('/programs')}
          >
            View All Opportunities
          </button>
        </div>
      </div>

{/* 7. Our Achievements */}
<section className="achievements-section">
  <h2 className="achievements-title">Our <span className="yellow-text">Achievements</span></h2>
  <div className="achievements-content">
    <div className="achievements-image-container">
      {/* L'image de fond sera gérée par le CSS */}
    </div>
    <div className="achievements-grid">
      
      {/* Première carte - 200 Students Abroad */}
      <div className="achievement-card first-card">
        <div className="achievement-number yellow">200</div>
        <div className="achievement-text">
       <img 
            src={itemicon} 
            alt="Students Icon" 
            className="achievement-icon" 
          />
          <div className="text-wrapper">
            <div>Students</div>
            <div>Abroad</div>
          </div>
        </div>
      </div>
      
      {/* Deuxième carte - 70 Programs Available */}
      <div className="achievement-card second-card">
        <div className="achievement-number yellow">70</div>
        <div className="achievement-text">
       <img 
            src={livre} 
            alt="Book Icon" 
            className="achievement-icon" 
          />
          <div className="text-wrapper">
            <div>Programs</div>
            <div>Available</div>
          </div>
        </div>
      </div>
      
      {/* Troisième carte - 90% Students Satisfied */}
      <div className="achievement-card wide-card">
        <div className="achievement-number purple">90%</div>
        <div className="satisfaction-text">
          <div>Students Satisfied</div>
          <div>With Their Chosen</div>
          <div>program</div>
        </div>
      </div>
      
    </div>
  </div>
</section>
      
{/* 8. Section de témoignages (MODIFIEE POUR AFFICHAGE HORIZONTAL) */}
      <section className="testimonials-section">
        <h2 className="testimonials-title">
          <span className="yellow-text">From</span> <span className="purple-text">Dreamers</span> <span className="yellow-text">to</span><br />
          <span className="yellow-text">Achievers & doers</span>
        </h2>
                
        {/* Affichage horizontal des témoignages */}
        <div className="testimonials-horizontal-container">
          {testimonials.slice(0, 3).map(testimonial => (
            <div className="testimonial-card" key={testimonial.id}>
              {testimonial.id === 1 && (
                <div className="dravenir-scholar-badge" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFD700',
                  padding: '8px 12px',
                  borderRadius: '50px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  top: '-20px', 
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: '10'
                }}>
                  <img src={trophy} alt="Dravenir Scholar Trophy" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#6A0DAD' }}>Dravenir Scholar</span>
                </div>
              )}
              <div className="profile-header">
                <div className="profile-image-container">
                  {testimonial.profileIcon}
                </div>
                <div className="profile-info">
                  <h3>{testimonial.name}</h3>
                  <p className={specialRoles.includes(testimonial.role) ? 'yellow-role-text' : ''}>
                    {testimonial.role}
                  </p>
                  <StarRating rating={testimonial.rating} duration={testimonial.duration} />
                  <div className="testimonial-badges" style={{ marginTop: '10px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                    {testimonial.badgeText && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {React.cloneElement(testimonial.badgeIcon, { style: { color: '#FFDB58', marginRight: '5px' } })}
                        <span className="badge-text" style={{ color: '#777', whiteSpace: 'nowrap' }}>{testimonial.badgeText}</span>
                      </div>
                    )}
                    {testimonial.degreeText && (
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                        {React.cloneElement(testimonial.degreeIcon, { style: { color: '#FFDB58', marginRight: '5px' } })}
                        <span className="badge-text" style={{ color: '#777', whiteSpace: 'nowrap' }}>{testimonial.degreeText}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="testimonial-body">
                <p>{testimonial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Our Destinations */}
      <section className="destinations-section">
        <h2 className="destinations-title">Our <span className="yellow-text">Destinations</span></h2>
        <div className="destinations-container">
          {destinations.map(dest => (
            <div className="destination-item" key={dest.id}>
              <img src={dest.image} alt={dest.name} className="destination-image" />
              <h3 className="destination-name">{dest.name}</h3>
            </div>
          ))}
        </div>
      </section>

{/* 10. Our Partners */}
<section className="partners-section">
  <h2 className="partners-title">
    Our <span className="yellow-text">Partners</span>
  </h2>

  <div className="partners-scrolling-container">
    <div className="partners-scrolling-track">
      {/* Répéter les logos 3 fois pour un défilement continu */}
      {[...logos, ...logos, ...logos].map((logo, index) => (
        <div className="partner-scrolling-item" key={index}>
          <img 
            src={`http://localhost:8000/media/logo/${logo}`} 
            alt={`Partner ${(index % logos.length) + 1}`} 
            className="partner-scrolling-logo" 
          />
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}

export default Dashboard;