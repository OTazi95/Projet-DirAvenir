import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';
import loginImage from '../assets/login1.png';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  // Déclaration de rememberMe et sa fonction de mise à jour
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Fonction pour gérer le changement de la checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', credentials);
      login(res.data.token);

      if (rememberMe) {
        localStorage.setItem('token', res.data.token);
      } else {
        sessionStorage.setItem('token', res.data.token);
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log In</h2>
          
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
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
            />
            <div className="line-input"></div>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span></span>
            Remember me
          </label>

          <button type="submit" className="login-button">Login</button>
        </form>
           
        <p className="already-text">
          Already created? <a href="/register">Login Here</a>
        </p>
         
        <div className="separator">
          <hr className="line" />
          <span>or</span>
          <hr className="line" />
        </div>

        <div className="social-buttons">
          <button className="google"><FaGoogle style={{ color: '#DB4437' }}/> Login with Google</button>
          <button className="facebook"><FaFacebookF /> Login with Facebook</button>
          <button className="apple"><FaApple /> Login with Apple</button>
        </div>

        <p className="terms-text">
       By continuing, you agree to the{' '}
      <span className="terms-yellow">Terms of Service</span> and{' '}
      <span className="terms-orange">Privacy Policy</span>
        </p>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Login Visual" />
      </div>
    </div>
  );
}

export default Login;