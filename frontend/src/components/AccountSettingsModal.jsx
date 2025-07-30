import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modals.css';
import Notification from './Notification';

function AccountSettingsModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newData, setNewData] = useState({ prenom: '', nom: '', email: '', password: '' });
  const [notification, setNotification] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:8000/api/update-profile/', {
        current_password: currentPassword,
        ...newData
      });
      setNotification('Modification réussie !');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      setNotification('Erreur : ' + error.response.data.error);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post('http://localhost:8000/api/delete-account/', { current_password: currentPassword });
      localStorage.clear();
      setNotification('Compte supprimé avec succès.');
      setTimeout(() => window.location.href = '/', 3000);
    } catch (error) {
      setNotification('Erreur : ' + error.response.data.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Paramètres du compte</h2>
        <input type="password" placeholder="Mot de passe actuel" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
        <input type="text" placeholder="Nouveau prénom" value={newData.prenom} onChange={e => setNewData({ ...newData, prenom: e.target.value })} />
        <input type="text" placeholder="Nouveau nom" value={newData.nom} onChange={e => setNewData({ ...newData, nom: e.target.value })} />
        <input type="email" placeholder="Nouvel e-mail" value={newData.email} onChange={e => setNewData({ ...newData, email: e.target.value })} />
        <input type="password" placeholder="Nouveau mot de passe" value={newData.password} onChange={e => setNewData({ ...newData, password: e.target.value })} />
        <button onClick={handleUpdate}>Modifier</button>
        <button onClick={handleDelete} className="delete-btn">Supprimer le compte</button>
        <button onClick={onClose} className="close-btn">Fermer</button>
        {notification && <Notification message={notification} />}
      </div>
    </div>
  );
}

export default AccountSettingsModal;
