import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import logo from '../assets/logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [logoMoved, setLogoMoved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Champs du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  return (
    <div className="register-container">
      <img
        src={logo}
        alt="DirAvenir Logo"
        className={`register-logo ${logoMoved ? 'moved' : ''}`}
      />
      <form
        className="register-form"
        onSubmit={(e) => {
          setLogoMoved(true);
          handleSubmit(e);
        }}
      >
        <h2>Créer un compte</h2>
        <div className="form-group">
          <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
          <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </div>
        <input type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label className="show-password">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          Voir les mots de passe
        </label>
        <button className="btn btn-yellow" type="submit">
          Créer mon compte
        </button>
        <p className="switch-text">
          Vous avez déjà un compte ?
          <Link to="/login" className="switch-link">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
