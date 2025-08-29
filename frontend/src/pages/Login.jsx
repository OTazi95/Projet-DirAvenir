// Login.jsx - Avec redirection basée sur le rôle et gestion des paramètres de redirection
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';
import loginImage from '../assets/register-illustration.png';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Récupérer le paramètre de redirection
  const redirectPath = searchParams.get('redirect');

  useEffect(() => {
    // Afficher un message si l'utilisateur est redirigé depuis le test d'orientation
    if (redirectPath === '/orientation-test') {
      setRedirectMessage('Vous devez vous connecter pour passer le test d\'orientation.');
    } else if (redirectPath) {
      setRedirectMessage(`Vous devez vous connecter pour accéder à cette page.`);
    }
  }, [redirectPath]);

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
      
      // REDIRECTION BASÉE SUR LE PARAMÈTRE OU LE RÔLE
      console.log('=== REDIRECTION ===');
      console.log('Paramètre de redirection:', redirectPath);
      console.log('Rôle pour redirection:', userInfo.role);
      
      // Si il y a un paramètre de redirection et que c'est un étudiant, rediriger vers la page demandée
      if (redirectPath && (userInfo.role.toLowerCase().trim() === 'etudiant' || 
                          userInfo.role.toLowerCase().trim() === 'student' || 
                          userInfo.role.toLowerCase().trim() === 'étudiant')) {
        console.log('✅ Redirection vers la page demandée:', redirectPath);
        navigate(redirectPath);
        return;
      }
      
      // Sinon, redirection basée sur le rôle
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
    // Ajouter le paramètre de redirection aux URLs de connexion sociale
    const redirectParam = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : '';
    
    switch(provider) {
      case 'Google':
        window.location.href = `http://localhost:8000/api/auth/google/${redirectParam}`;
        break;
      case 'Facebook':
        window.location.href = `http://localhost:8000/api/auth/facebook/${redirectParam}`;
        break;
      case 'Apple':
        window.location.href = `http://localhost:8000/api/auth/apple/${redirectParam}`;
        break;
      default:
        console.log(`Connexion avec ${provider}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connexion</h2>
        
        {/* Message de redirection */}
        {redirectMessage && (
          <div className="redirect-message">
            <div className="redirect-icon">ℹ️</div>
            <span>{redirectMessage}</span>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
          
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Adresse email"
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
              placeholder="Mot de passe"
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
            Se souvenir de moi
          </label>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
           
        <p className="already-text">
          Vous n'avez pas de compte ? <Link to={`/register${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`}>Créer un compte</Link>
        </p>
         
        <div className="separator">
          <hr className="line" />
          <span>ou</span>
          <hr className="line" />
        </div>

        <div className="social-buttons">
          <button 
            type="button"
            className="google"
            onClick={() => handleSocialLogin('Google')}
            disabled={isLoading}
          >
            <FaGoogle style={{ color: '#DB4437' }}/> Connexion avec Google
          </button>
          <button 
            type="button"
            className="facebook"
            onClick={() => handleSocialLogin('Facebook')}
            disabled={isLoading}
          >
            <FaFacebookF /> Connexion avec Facebook
          </button>
          <button 
            type="button"
            className="apple"
            onClick={() => handleSocialLogin('Apple')}
            disabled={isLoading}
          >
            <FaApple /> Connexion avec Apple
          </button>
        </div>

        <p className="terms-text">
          En continuant, vous acceptez les{' '}
          <Link to="/terms" className="terms-yellow">Conditions d'utilisation</Link>{' '}et la{' '}
          <Link to="/privacy" className="terms-orange">Politique de confidentialité</Link>
        </p>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Illustration de connexion" />
      </div>
    </div>
  );
}

export default Login;