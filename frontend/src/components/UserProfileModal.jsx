import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modals.css';

function UserProfileModal({ isOpen, onClose }) {
  // Récupérer l'objet complet de l'utilisateur
  const user = JSON.parse(localStorage.getItem('auth_user')) || {};

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigateToDashboard = () => {
    navigate('/welcome-etudiant');
    onClose();
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-header">
        <h3>Mes Informations</h3>
      </div>
      <div className="profile-body">
        <p><strong>Prénom:</strong> {user.prenom}</p>
        <p><strong>Nom:</strong> {user.nom}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="profile-actions">
        <button onClick={handleNavigateToDashboard} className="dashboard-btn">
          My Personal Dashboard
        </button>
        <button onClick={onClose} className="close-btn">
          Fermer
        </button>
      </div>
    </div>
  );
}

export default UserProfileModal;
