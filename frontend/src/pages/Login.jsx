import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 
import axios from 'axios';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';  // <-- Import Context

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);  // <-- Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      });

      // Stocke token et infos utilisateur
      login(response.data.token);  // mis à jour du Navbar dynamiquement
      localStorage.setItem('prenom', response.data.prenom);
      localStorage.setItem('nom', response.data.nom);

      alert('Connexion réussie !');
      navigate('/dashboard');
    } catch (error) {
      alert("Erreur de connexion. Vérifiez votre email ou mot de passe.");
    }
  };

return (
  <div className="login-container">
    <div className="login-left"></div>  {/* Partie gauche avec image */}
    <div className="login-right">
      <div className="form-box">
        <img src={logo} alt="Logo DirAvenir" className="form-logo" />
        <h2 className="form-title">Connexion</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" className="form-btn">Se connecter</button>
        </form>
        <p className="switch-text">
          Vous n’avez pas de compte ?{' '}
          <Link to="/register" className="switch-link">S'inscrire</Link>
        </p>
      </div>
    </div>
  </div>
);

}

export default Login;
