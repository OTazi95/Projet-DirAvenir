// Login.jsx - With role-based redirection and rememberMe
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

  // Get redirect param
  const redirectPath = searchParams.get('redirect');

  useEffect(() => {
    if (redirectPath === '/orientation-test') {
      setRedirectMessage('You must log in to take the orientation test.');
    } else if (redirectPath) {
      setRedirectMessage(`You must log in to access this page.`);
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
      const response = await axios.post(
        'http://localhost:8000/api/login/',
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.data?.token || !response.data?.user) {
        throw new Error('Invalid login data');
      }

      const { token, user } = response.data;

      // ✅ Storage choice based on rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);

    const userInfo = {
        id: user.id,
        email: user.email,
        firstName: user.prenom,
        lastName: user.nom,
        role: user.role,
      };

      if (login) login(token, userInfo, rememberMe);

      // ✅ Redirection
      const role = user.role.toLowerCase().trim();

      if (
        redirectPath &&
        (role === 'student' || role === 'etudiant' || role === 'étudiant')
      ) {
        navigate(redirectPath);
        return;
      }

      if (role === 'admin' || role === 'administrator') {
        navigate('/welcome-admin');
      } else if (role === 'student' || role === 'etudiant' || role === 'étudiant') {
        navigate('/welcome-etudiant'); 
      } else {
        navigate('/welcome-student'); 
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Incorrect email or password.');
        } else if (err.response.status === 400) {
          setError(err.response.data.error || 'Invalid data.');
        } else if (err.response.status === 404) {
          setError('Endpoint not found. Please check if the Django server is running.');
        } else {
          setError('Server error. Please try again.');
        }
      } else if (err.request) {
        setError('Unable to connect to the server. Please check if it is running.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

const handleSocialLogin = async (provider) => {
  if (provider === 'Google') {
    try {
      // Récupérer le chemin de redirection depuis l'URL ou utiliser la valeur par défaut
      const targetRedirectPath = redirectPath || '/welcome-etudiant';
      
      console.log('Setting redirect path for Google login:', targetRedirectPath);
      
      // Envoyer le chemin de redirection au backend AVANT de rediriger vers Google
      await axios.post('http://localhost:8000/api/set-google-redirect/', {
        redirect_path: targetRedirectPath
      });
      
      // Redirection vers Google OAuth
      window.location.href = `http://localhost:8000/auth/login/google-oauth2/?prompt=select_account`;
    } catch (error) {
      console.error('Error setting redirect path:', error);
      // Même si ça échoue, on continue avec Google login
      window.location.href = `http://localhost:8000/auth/login/google-oauth2/?prompt=select_account`;
    }
  } else {
    console.log(`${provider} login not implemented yet`);
  }
};

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>

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
              placeholder="Email address"
              disabled={isLoading}
              autoComplete="off"
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
              autoComplete="new-password"
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="already-text">
          Don’t have an account?{' '}
          <Link
            to={`/register${redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`}
          >
            Create an account
          </Link>
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
            <FaGoogle style={{ color: '#DB4437' }} /> Login with Google
          </button>
 
        </div>

        <p className="terms-text">
          By continuing, you agree to the{' '}
          <Link to="/terms" className="terms-yellow">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="terms-orange">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Login illustration" />
      </div>
    </div>
  );
}

export default Login;