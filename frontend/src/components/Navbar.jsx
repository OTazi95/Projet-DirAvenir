import React, { useState, useContext } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import logo2 from '../assets/logoj.png';
import { FaUserCircle, FaCog, FaGlobe, FaChevronDown } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import AccountSettingsModal from '../components/AccountSettingsModal';
import UserProfileModal from '../components/UserProfileModal';
import '../styles/Navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  // Définir les types de pages
  const pagesMauve = ['/about'];
  const pagesYellow = ['/faq', '/contact'];
  const pagesDefault = ['/dashboard', '/Orientation', '/programs'];

  const isAboutPage = pagesMauve.includes(location.pathname);
  const isYellowPage = pagesYellow.includes(location.pathname);
  const isDefaultPage = pagesDefault.includes(location.pathname);

  // Déterminer la classe CSS de la navbar
  let navbarClass = '';
  if (isAboutPage) {
    navbarClass = 'navbar-mauve';
  } else if (isYellowPage) {
    navbarClass = 'navbar-yellow';
  } else if (isDefaultPage) {
    navbarClass = 'navbar-default';
  }

  // Choisir le bon logo
  let logoSrc = isAboutPage ? logo2 : logo;

  return (
    <>
      <nav className={`navbar ${navbarClass}`}>
        <div className="navbar-left">
          <img src={logoSrc} alt="DirAvenir Logo" className="navbar-logo" />
        </div>

        <ul className="navbar-links">
          <li><NavLink to="/dashboard">{t('navbar.home')}</NavLink></li>
          <li><NavLink to="/Orientation">{t('navbar.orientation')}</NavLink></li>
          <li><NavLink to="/programs">{t('navbar.programs')}</NavLink></li>
          <li><a href="#">{t('navbar.packs')}</a></li>
          <li><NavLink to="/about">{t('navbar.about')}</NavLink></li>
          <li><NavLink to="/faq">{t('navbar.faq')}</NavLink></li>
          <li><NavLink to="/contact">{t('navbar.contact')}</NavLink></li>
        </ul>

        <div className="navbar-right">
          {/* Menu langue en dropdown */}
          <div className="language-selector">
            <button 
              className="language-dropdown-btn"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              <FaGlobe className="language-icon" />
              <span>{i18n.language === 'fr' ? 'Français' : 'Anglais'}</span>
              <FaChevronDown className={`chevron ${showLanguageMenu ? 'rotated' : ''}`} />
            </button>
            
            {showLanguageMenu && (
              <div className="language-dropdown-menu">
                <button 
                  className={`language-option ${i18n.language === 'en' ? 'active' : ''} ${isAboutPage ? 'mauve-page' : ''}`}
                  onClick={() => changeLanguage('en')}
                >
                  Anglais
                </button>
                <button 
                  className={`language-option ${i18n.language === 'fr' ? 'active' : ''} ${isAboutPage ? 'mauve-page' : ''}`}
                  onClick={() => changeLanguage('fr')}
                >
                  Français
                </button>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <>
              <FaCog className="nav-icon" onClick={() => setShowSettingsModal(true)} />
              <FaUserCircle className="nav-icon" onClick={() => setShowProfileModal(true)} />
              <button className="logout-btn" onClick={handleLogout}>{t('navbar.logout')}</button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate('/login')}>{t('navbar.login')}</button>
              <button className="register-btn" onClick={() => navigate('/register')}>{t('navbar.createAccount')}</button>
            </>
          )}
        </div>
      </nav>

      <AccountSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}

export default Navbar;
