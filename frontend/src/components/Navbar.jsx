import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUserCircle, FaCog } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import AccountSettingsModal from './AccountSettingsModal';
import UserProfileModal from './UserProfileModal';
import '../styles/Navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

 const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="DirAvenir Logo" className="navbar-logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Accueil</Link></li>
        <li><a href="#">Chercher une université</a></li>
        <li><a href="#">Orientation</a></li>
        <li><a href="#">Nos packs</a></li>
        <li><a href="#partners-section">Nos partenaires</a></li>
        <li><Link to="/about">About us</Link></li>
        <li><a href="#">Avis des étudiants</a></li>
        <li><Link to="/contact">Nous contacter</Link></li>
      </ul>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <FaCog className="nav-icon" onClick={() => setShowSettingsModal(true)}/>
            <FaUserCircle className="nav-icon" onClick={() => setShowProfileModal(true)}/>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => navigate('/login')}>Se connecter</button>
            <button className="register-btn" onClick={() => navigate('/register')}>Créer un compte</button>
          </>
        )}
      </div>
    </nav>
     <AccountSettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  );
}

export default Navbar;
