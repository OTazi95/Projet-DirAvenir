import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Ajoutez ces imports en haut du fichier
import { Clock, CheckCircle, XCircle, Eye, Calendar, User, Mail, Phone, MapPin, FileText, Target, Award, TrendingUp, BookOpen } from 'lucide-react';
import '../styles/WelcomeEtudiant.css';


const WelcomeEtudiant = () => {
  const [userInfo, setUserInfo] = useState({
    prenom: '',
    nom: '',
    email: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  // États pour les candidatures
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  // États pour le test d'orientation
  const [orientationTest, setOrientationTest] = useState(null);
  const [loadingTest, setLoadingTest] = useState(true);
  
  const navigate = useNavigate();

  // Fonction pour charger les candidatures
  const fetchApplications = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/applications/user/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      setApplications(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des candidatures:', error);
    } finally {
      setLoadingApplications(false);
    }
  };

  // Fonction pour charger les résultats du test d'orientation
  const fetchOrientationTestResults = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/orientation-test/results/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data) {
        setOrientationTest(response.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du test d\'orientation:', error);
      // Ne pas afficher d'erreur si l'utilisateur n'a pas encore passé de test
      if (error.response && error.response.status !== 404) {
        console.error('Erreur inattendue:', error);
      }
    } finally {
      setLoadingTest(false);
    }
  };

  useEffect(() => {
    const loadUserData = () => {
      console.log('=== DEBUG WELCOME ÉTUDIANT ===');
      
      // Vérifier localStorage et sessionStorage
      const localAuthUser = localStorage.getItem("auth_user");
      const sessionAuthUser = sessionStorage.getItem("auth_user");
      
      console.log('localStorage auth_user:', localAuthUser);
      console.log('sessionStorage auth_user:', sessionAuthUser);

      let userData = null;
      
      // Essayer de récupérer depuis auth_user
      if (localAuthUser) {
        try {
          userData = JSON.parse(localAuthUser);
          console.log('Données trouvées dans localStorage:', userData);
        } catch (error) {
          console.error('Erreur parsing localStorage auth_user:', error);
        }
      } else if (sessionAuthUser) {
        try {
          userData = JSON.parse(sessionAuthUser);
          console.log('Données trouvées dans sessionStorage:', userData);
        } catch (error) {
          console.error('Erreur parsing sessionStorage auth_user:', error);
        }
      }

      if (userData && userData.email) {
        const userRole = (userData.role || '').toLowerCase().trim();
        console.log('Rôle utilisateur:', userRole);
        
        // Vérifier si c'est un admin qui essaie d'accéder à la page étudiant
        if (userRole === 'admin' || userRole === 'administrateur') {
          console.log('❌ Admin détecté - redirection vers welcome-admin');
          navigate('/welcome-admin');
          return;
        }
        
        const userInfo = {
          prenom: userData.prenom || userData.first_name || '',
          nom: userData.nom || userData.last_name || '',
          email: userData.email || '',
          role: userData.role || 'etudiant'
        };
        
        console.log('Données utilisateur extraites:', userInfo);
        setUserInfo(userInfo);
        setEditForm({
          prenom: userInfo.prenom,
          nom: userInfo.nom,
          email: userInfo.email,
          currentPassword: '',
          newPassword: ''
        });
      } else {
        // Fallback: essayer l'ancienne méthode avec les clés individuelles
        console.log('Tentative avec les clés individuelles...');
        
        const prenom = localStorage.getItem('prenom') || sessionStorage.getItem('prenom') || '';
        const nom = localStorage.getItem('nom') || sessionStorage.getItem('nom') || '';
        const email = localStorage.getItem('email') || sessionStorage.getItem('email') || '';
        const role = localStorage.getItem('role') || sessionStorage.getItem('role') || '';
        
        console.log('Données individuelles:', { prenom, nom, email, role });
        
        if (prenom || nom || email) {
          // Vérifier si c'est un admin
          const userRole = (role || '').toLowerCase().trim();
          if (userRole === 'admin' || userRole === 'administrateur') {
            console.log('❌ Admin détecté (données individuelles) - redirection vers welcome-admin');
            navigate('/welcome-admin');
            return;
          }
          
          const userInfo = { prenom, nom, email, role: role || 'etudiant' };
          setUserInfo(userInfo);
          setEditForm({
            prenom,
            nom,
            email,
            currentPassword: '',
            newPassword: ''
          });
        } else {
          console.warn('Aucune donnée utilisateur trouvée - redirection vers login');
          navigate('/login');
          return;
        }
      }
      
      setIsLoading(false);
      console.log('=== FIN DU CHARGEMENT DES DONNÉES ÉTUDIANT ===');
    };

    loadUserData();
    fetchApplications();
    fetchOrientationTestResults();
  }, [navigate]);

  // Component pour afficher les résultats du test d'orientation
  const OrientationTestSection = ({ testData, isLoading }) => {
    if (isLoading) {
      return (
        <div className="test-section loading">
          <div className="loading-content">
            <Target size={48} color="#3B82F6" />
            <p>Chargement de vos résultats...</p>
          </div>
        </div>
      );
    }

    if (!testData) {
      return (
        <div className="test-section no-test">
          <div className="no-test-content">
            <Target size={64} color="#9CA3AF" />
            <h3>Test d'orientation</h3>
            <p>Découvrez les filières qui vous correspondent le mieux en passant notre test d'orientation personnalisé.</p>
            <button 
              className="test-btn primary"
              onClick={() => navigate('/orientation/test')}
            >
              <BookOpen size={20} />
              Passer le test d'orientation
            </button>
          </div>
        </div>
      );
    }

    // Calculer les top 3 résultats depuis normalized_scores
    const getTopResults = (normalizedScores) => {
      if (!normalizedScores) return [];
      
      // Import des profiles et scoring functions (vous devrez les adapter)
      // Pour l'instant, retournons un exemple
      return [
        { major: 'Informatique', score: 85 },
        { major: 'Ingénierie', score: 78 },
        { major: 'Sciences', score: 72 }
      ];
    };

    const topResults = getTopResults(testData.normalized_scores);
    const testDate = new Date(testData.completed_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="test-section completed">
        <div className="test-header">
          <div className="test-title">
            <Award size={32} color="#10B981" />
            <div>
              <h3>Résultats de votre test d'orientation</h3>
              <p className="test-date">Complété le {testDate}</p>
            </div>
          </div>
          <button 
            className="test-btn secondary"
            onClick={() => navigate('/orientation/test')}
          >
            <TrendingUp size={16} />
            Repasser le test
          </button>
        </div>

        <div className="results-grid">
          {topResults.slice(0, 3).map((result, index) => (
            <div key={result.major} className={`result-card rank-${index + 1}`}>
              <div className="rank-badge">#{index + 1}</div>
              <div className="result-info">
                <h4>{result.major}</h4>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${result.score}%` }}></div>
                  <span className="score-text">{result.score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="test-actions">
          <button 
            className="test-btn ghost"
            onClick={() => navigate('/results', { 
              state: {
                answers: testData.answers,
                raw: testData.raw_scores,
                max: testData.max_scores,
                normalized: testData.normalized_scores,
                PILLAR_KEYS: testData.pillar_keys
              }
            })}
          >
            <Eye size={16} />
            Voir les détails complets
          </button>
          <button 
            className="test-btn primary"
            onClick={() => navigate('/programs')}
          >
            <FileText size={16} />
            Explorer les programmes
          </button>
        </div>
      </div>
    );
  };

  // Component ApplicationStatus (identique au précédent)
  const ApplicationStatus = ({ applications = [] }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case 'sent': return <Clock size={20} color="#3B82F6" />;
        case 'reviewing': return <Eye size={20} color="#F59E0B" />;
        case 'approved': return <CheckCircle size={20} color="#10B981" />;
        case 'rejected': return <XCircle size={20} color="#EF4444" />;
        default: return <Clock size={20} color="#6B7280" />;
      }
    };
    
    const getStatusText = (status) => {
      switch (status) {
        case 'sent': return 'Envoyée';
        case 'reviewing': return 'En cours d\'examen';
        case 'approved': return 'Approuvée';
        case 'rejected': return 'Non approuvée';
        default: return 'Statut inconnu';
      }
    };
    
    const getStatusColor = (status) => {
      switch (status) {
        case 'sent': return '#3B82F6';
        case 'reviewing': return '#F59E0B';
        case 'approved': return '#10B981';
        case 'rejected': return '#EF4444';
        default: return '#6B7280';
      }
    };

    if (applications.length === 0) {
      return (
        <div className="no-applications">
          <FileText size={48} color="#9CA3AF" />
          <h3>Aucune candidature</h3>
          <p>Vous n'avez encore soumis aucune candidature.</p>
        </div>
      );
    }

    return (
      <div className="applications-section">
        <h3 className="applications-title">Mes Candidatures</h3>
        
        {applications.map((app) => (
          <div key={app.id} className="application-card">
            <div className="application-header">
              <div className="application-info">
                <h4 className="program-name">{app.program}</h4>
                <p className="university-name">{app.university}</p>
                <p className="submission-date">
                  <Calendar size={16} />
                  Soumise le {new Date(app.submissionDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="status-badge" style={{ 
                backgroundColor: `${getStatusColor(app.status)}20`, 
                color: getStatusColor(app.status) 
              }}>
                {getStatusIcon(app.status)}
                <span>{getStatusText(app.status)}</span>
              </div>
            </div>
            
            <div className="application-summary">
              <div className="summary-item">
                <User size={16} />
                <span>{app.formData.firstName} {app.formData.lastName}</span>
              </div>
              <div className="summary-item">
                <Mail size={16} />
                <span>{app.formData.email}</span>
              </div>
              <div className="summary-item">
                <Phone size={16} />
                <span>{app.formData.phone}</span>
              </div>
              <div className="summary-item">
                <MapPin size={16} />
                <span>{app.formData.country}</span>
              </div>
            </div>
            
            <div className="application-id">
              <span>ID: #{app.id}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const handleEditProfile = () => {
    setEditForm({
      prenom: userInfo.prenom,
      nom: userInfo.nom,
      email: userInfo.email,
      currentPassword: '',
      newPassword: ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!editForm.prenom.trim() || !editForm.nom.trim() || !editForm.email.trim()) {
      showMessage('error', 'Tous les champs obligatoires doivent être remplis');
      setIsSubmitting(false);
      return;
    }

    if (!editForm.currentPassword) {
      showMessage('error', 'Le mot de passe actuel est requis pour modifier le profil');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = getAuthToken();
      const updateData = {
        prenom: editForm.prenom.trim(),
        nom: editForm.nom.trim(),
        email: editForm.email.trim(),
        current_password: editForm.currentPassword
      };

      if (editForm.newPassword.trim()) {
        updateData.new_password = editForm.newPassword;
      }

      const response = await axios.put(
        'http://localhost:8000/api/profile/update/',
        updateData,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.user) {
        const updatedUserInfo = {
          prenom: response.data.user.prenom,
          nom: response.data.user.nom,
          email: response.data.user.email,
          role: userInfo.role
        };

        setUserInfo(updatedUserInfo);

        // Mettre à jour le stockage
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        const authUser = JSON.parse(storage.getItem('auth_user') || '{}');
        const updatedAuthUser = { ...authUser, ...updatedUserInfo };
        storage.setItem('auth_user', JSON.stringify(updatedAuthUser));
        storage.setItem('email', updatedUserInfo.email);
        storage.setItem('prenom', updatedUserInfo.prenom);
        storage.setItem('nom', updatedUserInfo.nom);

        showMessage('success', 'Profil mis à jour avec succès');
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      if (error.response?.data?.error) {
        showMessage('error', error.response.data.error);
      } else {
        showMessage('error', 'Erreur lors de la mise à jour du profil');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      await axios.delete('http://localhost:8000/api/profile/delete/', {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });

      showMessage('success', 'Compte supprimé avec succès');
      
      // Nettoyer le stockage et rediriger
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      showMessage('error', 'Erreur lors de la suppression du compte');
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="welcome-container">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      {/* Message de notification */}
      {message.text && (
        <div className={`notification-message ${message.type}`}>
          <div className="message-content">
            <span className="message-icon">
              {message.type === 'success' ? '✅' : '⚠️'}
            </span>
            <span className="message-text">{message.text}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="welcome-main">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-avatar">
            👤
          </div>
          
          <h1 className="welcome-title">
            Bienvenue {userInfo.prenom} {userInfo.nom}
          </h1>
          
          <p className="welcome-subtitle">
            dans votre dashboard personnel
          </p>
          
          <div className="brand-badge">
            <span className="brand-icon">🎯</span>
            <span className="brand-name">DirAvenir</span>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="card-content">
            <div className="card-icon">
              📚
            </div>
            
            <div className="card-text">
              <h2 className="card-title">
                Prêt à explorer votre avenir ?
              </h2>
              
              <p className="card-description">
                Découvrez nos outils d'orientation scolaire personnalisés, explorez les différentes 
                filières qui s'offrent à vous, et construisez votre parcours éducatif avec confiance. 
                Votre réussite commence ici !
              </p>
              
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-dot green"></div>
                  <span>Tests d'orientation</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="account-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={handleEditProfile}
                >
                  <span className="btn-icon">✏️</span>
                  Modifier mon compte
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <span className="btn-icon">🗑️</span>
                  Supprimer mon compte
                </button>
              </div>
              
            </div>
          </div>
        </div>

        {/* Section Test d'Orientation */}
        <OrientationTestSection testData={orientationTest} isLoading={loadingTest} />

        {/* Section Candidatures */}
        <ApplicationStatus applications={applications} />

        {/* User Info */}
        <div className="user-info">
          <div className="user-info-content">
            <span className="user-icon">👤</span>
            <span>Connecté en tant que: {userInfo.email} ({userInfo.role})</span>
          </div>
        </div>
      </main>

      {/* Modal de modification */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Modifier mon profil</h3>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-group">
                <label>Prénom *</label>
                <input
                  type="text"
                  value={editForm.prenom}
                  onChange={(e) => setEditForm({...editForm, prenom: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  value={editForm.nom}
                  onChange={(e) => setEditForm({...editForm, nom: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>Mot de passe actuel *</label>
                <input
                  type="password"
                  value={editForm.currentPassword}
                  onChange={(e) => setEditForm({...editForm, currentPassword: e.target.value})}
                  placeholder="Requis pour confirmer les modifications"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label>Nouveau mot de passe (optionnel)</label>
                <input
                  type="password"
                  value={editForm.newPassword}
                  onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})}
                  placeholder="Laissez vide pour conserver l'actuel"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de suppression */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>Supprimer mon compte</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="delete-warning">
              <div className="warning-icon">⚠️</div>
              <p>
                <strong>Attention !</strong> Cette action est irréversible. 
                Toutes vos données seront définitivement supprimées.
              </p>
              <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button"
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button 
                type="button"
                className="delete-confirm-btn"
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Suppression...' : 'Confirmer la suppression'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeEtudiant;