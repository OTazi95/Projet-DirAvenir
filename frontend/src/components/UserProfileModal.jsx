import React from 'react';
import '../styles/Modals.css';

function UserProfileModal({ isOpen, onClose }) {
  const prenom = localStorage.getItem('prenom');
  const nom = localStorage.getItem('nom');
  const email = localStorage.getItem('email');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Mes Informations</h2>
        <p><strong>Prénom:</strong> {prenom}</p>
        <p><strong>Nom:</strong> {nom}</p>
        <p><strong>Email:</strong> {email}</p>
        <button onClick={onClose} className="close-btn">Fermer</button>
      </div>
    </div>
  );
}

export default UserProfileModal;
