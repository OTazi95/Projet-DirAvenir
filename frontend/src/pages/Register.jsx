import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';
import illustrationImage from '../assets/register-illustration.png';
import axios from 'axios';
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

      // ✅ Nettoyer les anciennes données
      localStorage.clear();
      sessionStorage.clear();

      // ✅ Rediriger
      navigate("/login");
    } catch (error) {
      console.error("Erreur d'inscription :", error.response?.data || error.message);
      alert("Erreur lors de l'inscription.");
    }
  };

  const handleSocialLogin = (provider) => {
    switch (provider) {
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
    <div className="register-container">
      {/* Formulaire */}
      <div className="register-card">
        <h2 className="form-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="register-form">
  {/* Nom et Prénom */}
  <div className="form-row">
    <div className="form-group">
      <input
        type="text"
        id="nom"
        name="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Last Name"
        className="form-input"
        autoComplete="off"
        required
      />
    </div>
    <div className="form-group">
      <input
        type="text"
        id="prenom"
        name="prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        placeholder="First Name"
        className="form-input"
        autoComplete="off"
        required
      />
    </div>
  </div>

  {/* Email */}
  <div className="form-group">
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email Address"
      className="form-input"
      autoComplete="off"
      required
    />
  </div>

  {/* Mot de passe */}
  <div className="form-group">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className="form-input"
      autoComplete="new-password"
      required
    />
  </div>

  {/* Confirmer mot de passe */}
  <div className="form-group">
    <input
      type={showPassword ? "text" : "password"}
      id="confirmPassword"
      name="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm Password"
      className="form-input"
      autoComplete="new-password"
      required
    />
  </div>

  {/* Remember Me */}
  <label className="checkbox-group" htmlFor="remember">
    <input
      type="checkbox"
      id="remember"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      className="checkbox-input"
    />
    <span className="checkbox-custom" />
    <span className="checkbox-text">Remember Me</span>
  </label>

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

        {/* Social Login */}
        <div className="social-buttons">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="social-btn social-btn-google"
          >
            <FaGoogle style={{ color: '#DB4437' }} /> Login with Google
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
          <Link to="/terms" className="terms-link terms-service">Terms of Service</Link>{" "}
          and{" "}
          <Link to="/privacy" className="terms-link terms-privacy">Privacy Policy</Link>
        </p>
      </div>

      {/* Illustration */}
      <div className="illustration-section">
        <img
          src={illustrationImage}
          alt="Create Account Illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
}

export default Register;