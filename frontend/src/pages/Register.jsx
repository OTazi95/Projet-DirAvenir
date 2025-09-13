import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom'; // Ajout de useSearchParams
import '../styles/Register.css';
import illustrationImage from '../assets/register-illustration.png';
import axios from 'axios';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Pour récupérer le paramètre redirect
  const [showPassword, setShowPassword] = useState(false);

  // Récupérer le paramètre redirect
  const redirectPath = searchParams.get('redirect');

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

      // ✅ Rediriger vers login en conservant le paramètre redirect
      if (redirectPath) {
        navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error.response?.data || error.message);
      alert("Erreur lors de l'inscription.");
    }
  };

  const handleSocialLogin = (provider) => {
    // Ajouter le paramètre redirect aux connexions sociales si nécessaire
    const redirectParam = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : '';
    
    switch (provider) {
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
    <div className="register-container">
      {/* Formulaire */}
      <div className="register-card">
        <h2 className="form-title">Create Account</h2>

        {/* Message informatif si l'utilisateur vient d'une redirection */}
        {redirectPath && (
          <div className="redirect-message" style={{ 
            background: '#e3f2fd', 
            border: '1px solid #2196f3', 
            borderRadius: '8px', 
            padding: '12px', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '16px' }}>ℹ️</span>
            <span style={{ color: '#1976d2', fontSize: '14px' }}>
              Create your account to continue with the orientation test.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Nom et Prénom */}
          <div className="form-row">
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

        {/* Already have account - Conserver le paramètre redirect */}
        <p className="switch-text">
          Already Created?{" "}
          <Link 
            to={redirectPath ? `/login?redirect=${encodeURIComponent(redirectPath)}` : "/login"} 
            className="switch-link"
          >
            Login Here
          </Link>
        </p>

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