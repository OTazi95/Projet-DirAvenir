import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import logo from '../assets/logo.png';
import illustrationImage from '../assets/register-illustration.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Champs du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        nom,
        prenom,
        email,
        password,
        password2: confirmPassword,
      });
      console.log("Inscription réussie :", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur d'inscription :", error.response?.data || error.message);
      alert("Erreur lors de l'inscription.");
    }
  };

  const handleSocialLogin = (provider) => {
    switch(provider) {
      case 'Google':
        // Redirection vers l'authentification Google
        window.location.href = 'http://localhost:8000/api/auth/google/';
        break;
      case 'Facebook':
        // Redirection vers l'authentification Facebook
        window.location.href = 'http://localhost:8000/api/auth/facebook/';
        break;
      case 'Apple':
        // Redirection vers l'authentification Apple
        window.location.href = 'http://localhost:8000/api/auth/apple/';
        break;
      default:
        console.log(`Connexion avec ${provider}`);
    }
  };

  return (
    <div className="register-container">
      <div className="main-content">
        {/* Formulaire d'inscription */}
        <div className="form-section">
          <div className="register-card">
            <h2 className="form-title">Create Account</h2>

            <form onSubmit={handleSubmit} className="register-form">
              {/* Nom et Prénom */}
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prénom"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="form-input"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div className="form-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-input"
                  required
                />
              </div>

              {/* Confirmer mot de passe */}
              <div className="form-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="form-input"
                  required
                />
              </div>

              {/* Remember Me - Style identique au login */}
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <label htmlFor="remember" className="checkbox-label">
                  Remember Me
                </label>
              </div>

              {/* Bouton Create Account */}
              <button type="submit" className="btn-submit">
                Create Account
              </button>
            </form>

            {/* Already have account */}
            <p className="switch-text">
              Already Created?{" "}
              <Link to="/login" className="switch-link">
                Login Here
              </Link>
            </p>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>

            {/* Social Login Buttons - Style identique au login */}
            <div className="social-buttons">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="social-btn social-btn-google"
              >
                <FaGoogle style={{ color: '#DB4437' }}/> Login with Google
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="social-btn social-btn-facebook"
              >
                <FaFacebookF /> Login with Facebook
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="social-btn social-btn-apple"
              >
                <FaApple /> Login with Apple
              </button>
            </div>

            {/* Terms */}
            <p className="terms-text">
              By continuing, you agree to the{" "}
              <a href="#" className="terms-link">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="terms-link">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Illustration - Position identique au login */}
        <div className="illustration-section">
          <div className="illustration-container">
            <img 
              src={illustrationImage} 
              alt="Create Account Illustration" 
              className="illustration-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;