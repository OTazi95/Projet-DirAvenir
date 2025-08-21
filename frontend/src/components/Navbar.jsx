import React, { useState, useContext } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import logo2 from '../assets/logoj.png';
import { FaUserCircle, FaCog } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import AccountSettingsModal from '../components/AccountSettingsModal';
import UserProfileModal from '../components/UserProfileModal';
import '../styles/Navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Détection si on est sur la page About ou FAQ
  const isAboutPage = location.pathname === '/about';
  // Ajout d'une nouvelle variable pour détecter la page FAQ
  const isFaqPage = location.pathname === '/faq';
  const isContactPage = location.pathname === '/contact';

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Déterminez la classe de la barre de navigation
  let navbarClass = '';
  if (isAboutPage) {
    navbarClass = 'navbar-mauve';
  } else if (isFaqPage || isContactPage) {
    navbarClass = 'navbar-yellow'; // Appliquez la classe jaune si c'est la page FAQ
  }
  
  let logoSrc = logo; // Logo mauve par défaut
  if (isAboutPage) {
    logoSrc = logo2; // Logo jaune seulement pour About
  }

  return (
    <>
      <nav className={`navbar ${navbarClass}`}>
        <div className="navbar-left">
          <img 
            src={logoSrc} 
            alt="DirAvenir Logo" 
            className="navbar-logo" />
        </div>
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <a href="/Orientation">Orientation</a>
          </li>
          <li>
            <NavLink
              to="/programs"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Programmes
            </NavLink>
          </li>
          <li>
            <a href="#">Nos packs</a>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              About US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Contact US
            </NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <FaCog
                className="nav-icon"
                onClick={() => setShowSettingsModal(true)}
              />
              <FaUserCircle
                className="nav-icon"
                onClick={() => setShowProfileModal(true)}
              />
              <button className="logout-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => navigate('/login')}
              >
                Log in
              </button>
              <button
                className="register-btn"
                onClick={() => navigate('/register')}
              >
                Create Account
              </button>
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