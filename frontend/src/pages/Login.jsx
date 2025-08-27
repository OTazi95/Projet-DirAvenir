// Login.jsx - Avec redirection basée sur le rôle
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';
import loginImage from '../assets/register-illustration.png';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('=== DEBUG FRONTEND LOGIN ===');
      console.log('Données à envoyer:', {
        email: credentials.email,
        password: credentials.password ? '***' : 'empty'
      });

      const response = await axios.post('http://localhost:8000/api/login/', {
        email: credentials.email,
        password: credentials.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Statut de la réponse:', response.status);
      console.log('Réponse complète:', response.data);

      // Vérifier la structure de la réponse
      if (!response.data) {
        throw new Error('Réponse vide du serveur');
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (!response.data.token) {
        throw new Error('Aucun token reçu du serveur');
      }

      if (!response.data.user) {
        throw new Error('Aucune information utilisateur reçue');
      }

      console.log('Token reçu:', response.data.token.substring(0, 10) + '...');
      console.log('Rôle utilisateur reçu:', response.data.user.role);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', response.data.token);

      // Appeler la fonction login du contexte si elle existe
      if (login) {
        login(response.data.token);
      }

      // Créer les informations utilisateur complètes
      const userInfo = {
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.username,
        prenom: response.data.user.prenom,
        nom: response.data.user.nom,
        role: response.data.user.role,
        first_name: response.data.user.prenom, // Pour compatibilité
        last_name: response.data.user.nom      // Pour compatibilité
      };

      console.log('Informations utilisateur à stocker:', userInfo);

      // Stocker l'objet utilisateur complet
      storage.setItem("auth_user", JSON.stringify(userInfo));
      
      // Stocker aussi individuellement pour compatibilité
      storage.setItem('email', userInfo.email);
      storage.setItem('prenom', userInfo.prenom);
      storage.setItem('nom', userInfo.nom);
      storage.setItem('role', userInfo.role);

      console.log('Données stockées avec succès');
      console.log('Données stockées dans storage:', {
        auth_user: storage.getItem("auth_user"),
        role: storage.getItem('role')
      });
      
      // REDIRECTION BASÉE SUR LE RÔLE
      console.log('=== REDIRECTION ===');
      console.log('Rôle pour redirection:', userInfo.role);
      
      // Vérification du rôle avec différentes variantes possibles
      const role = userInfo.role.toLowerCase().trim();
      
      if (role === 'admin' || role === 'administrateur') {
        console.log('✅ Redirection vers welcome-admin');
        navigate('/welcome-admin');
      } else if (role === 'etudiant' || role === 'student' || role === 'étudiant') {
        console.log('✅ Redirection vers welcome-etudiant');
        navigate('/welcome-etudiant');
      } else {
        console.warn('⚠️ Rôle non reconnu:', role, '- Redirection par défaut vers welcome-etudiant');
        navigate('/welcome-etudiant');
      }
      
    } catch (err) {
      console.error('=== ERREUR FRONTEND LOGIN ===');
      console.error('Type d\'erreur:', err.constructor.name);
      console.error('Message:', err.message);
      
      if (err.response) {
        console.error('Statut HTTP:', err.response.status);
        console.error('Données d\'erreur complètes:', err.response.data);
        
        if (err.response.status === 401) {
          setError('Email ou mot de passe incorrect.');
        } else if (err.response.status === 400) {
          setError(err.response.data.error || 'Données invalides.');
        } else if (err.response.status === 404) {
          setError('Endpoint non trouvé. Vérifiez que le serveur Django est démarré.');
        } else {
          setError('Erreur serveur. Veuillez réessayer.');
        }
      } else if (err.request) {
        console.error('Aucune réponse du serveur:', err.request);
        setError('Impossible de se connecter au serveur. Vérifiez que Django est démarré sur le port 8000.');
      } else {
        console.error('Erreur de configuration:', err.message);
        setError(err.message || 'Une erreur inattendue est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    switch(provider) {
      case 'Google':
        window.location.href = 'http://localhost:8000/api/auth/google/';
        break;
      case 'Facebook':
        window.location.href = 'http://localhost:8000/api/auth/facebook/';
        break;
      case 'Apple':
        window.location.href = 'http://localhost:8000/api/auth/apple/';
        break;
      default:
        console.log(`Connexion avec ${provider}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log In</h2>
        
        {error && <div className="error-message">{error}</div>}
          
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              disabled={isLoading}
            />
            <div className="line-input"></div>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Password"
              disabled={isLoading}
            />
            <div className="line-input"></div>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              disabled={isLoading}
            />
            <span></span>
            Remember me
          </label>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Login'}
          </button>
        </form>
           
        <p className="already-text">
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
         
        <div className="separator">
          <hr className="line" />
          <span>or</span>
          <hr className="line" />
        </div>

        <div className="social-buttons">
          <button 
            type="button"
            className="google"
            onClick={() => handleSocialLogin('Google')}
            disabled={isLoading}
          >
            <FaGoogle style={{ color: '#DB4437' }}/> Login with Google
          </button>
          <button 
            type="button"
            className="facebook"
            onClick={() => handleSocialLogin('Facebook')}
            disabled={isLoading}
          >
            <FaFacebookF /> Login with Facebook
          </button>
          <button 
            type="button"
            className="apple"
            onClick={() => handleSocialLogin('Apple')}
            disabled={isLoading}
          >
            <FaApple /> Login with Apple
          </button>
        </div>

        <p className="terms-text">
          By continuing, you agree to the{' '}
          <Link to="/terms" className="terms-yellow">Terms of Service</Link>         {" "}and{" "}
          <Link to="/privacy" className="terms-orange">Privacy Policy</Link>
        </p>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Login Visual" />
      </div>
    </div>
  );
}

export default Login;