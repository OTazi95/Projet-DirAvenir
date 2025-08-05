import React, { useState, useContext } from 'react';
import { useNavigate,  NavLink } from 'react-router-dom';
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
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>Accueil</NavLink></li>
        <li><a href="#">Orientation</a></li>
        <li><NavLink to="/Programs" className={({ isActive }) => isActive ? "active-link" : ""}>Programmes</NavLink></li>
        <li><a href="#">Nos packs</a></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About us</NavLink></li>
        <li><NavLink to="/faq" className={({ isActive }) => isActive ? "active-link" : ""}>FAQ</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Nous contacter</NavLink></li>
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
