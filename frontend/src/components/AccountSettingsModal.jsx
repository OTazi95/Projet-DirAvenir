import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modals.css';
import Notification from './Notification';

function AccountSettingsModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newData, setNewData] = useState({ prenom: '', nom: '', email: '', password: '', confirmPassword: '' });
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

 const handlePasswordCheck = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(
      'http://localhost:8000/api/verify-password/',
      { current_password: currentPassword },
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true  // <-- Important pour le CORS avec token
      }
    );

    if (response.data.message) {
      setStep(2);
    }
  } catch (error) {
    setNotification('Mot de passe incorrect.');
    setTimeout(() => setNotification(''), 3000);
  }
};

  const handleUpdate = async () => {
  const token = localStorage.getItem('token');

  if (newData.password && newData.password !== newData.confirmPassword) {
    setError("Les mots de passe ne correspondent pas.");
    return;
  }
  if (window.confirm("Voulez-vous vraiment enregistrer les modifications ?")) {
    try {
      await axios.post(
        'http://localhost:8000/api/update-profile/',
        newData,
        {
          headers: { Authorization: `Token ${token}` },
          withCredentials: true
        }
      );
      setNotification('Modification réussie !');
      setTimeout(() => { setNotification(''); onClose(); }, 3000);
    } catch (err) {
      setError('Erreur lors de la modification.');
    }
  }
};

  const handleDelete = async () => {
  const token = localStorage.getItem('token');

  if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
    try {
      await axios.post(
        'http://localhost:8000/api/delete-account/',
        { current_password: currentPassword },
        {
          headers: { Authorization: `Token ${token}` },
          withCredentials: true
        }
      );
      localStorage.clear();
      window.location.href = '/';
    } catch (err) {
      setError('Erreur lors de la suppression du compte.');
    }
  }
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content responsive-modal">
        <h2>Paramètres du compte</h2>

        {step === 1 && (
          <>
            <input type="password" placeholder="Mot de passe actuel" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <button className="confirm-btn" onClick={handlePasswordCheck}>Vérifier</button>
            {error && <p className="error-text">{error}</p>}
          </>
        )}

        {step === 2 && (
          <>
            <h3>Modifier les informations</h3>
            <input type="text" placeholder="Nouveau prénom" value={newData.prenom} onChange={e => setNewData({ ...newData, prenom: e.target.value })} />
            <input type="text" placeholder="Nouveau nom" value={newData.nom} onChange={e => setNewData({ ...newData, nom: e.target.value })} />
            <input type="email" placeholder="Nouvel e-mail" value={newData.email} onChange={e => setNewData({ ...newData, email: e.target.value })} />
            <input type="password" placeholder="Nouveau mot de passe (laisser vide si inchangé)" value={newData.password} onChange={e => setNewData({ ...newData, password: e.target.value })} />
            <input type="password" placeholder="Confirmer le nouveau mot de passe" value={newData.confirmPassword} onChange={e => setNewData({ ...newData, confirmPassword: e.target.value })} />

            {error && <p className="error-text">{error}</p>}

            <button className="save-btn" onClick={handleUpdate}>Valider les modifications</button>
            <button className="delete-btn" onClick={handleDelete}>Supprimer le compte</button>
          </>
        )}

        <button className="close-btn" onClick={onClose}>Annuler</button>
        {notification && <Notification message={notification} />}
      </div>
    </div>
  );
}

export default AccountSettingsModal;
