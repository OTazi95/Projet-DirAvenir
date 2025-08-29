// WelcomeAdmin.jsx - Design moderne et responsive avec gestion des administrateurs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Ajoutez ces imports en haut du fichier WelcomeAdmin.jsx
import { Clock, CheckCircle, XCircle, Eye, Check, X, User, GraduationCap, FileText } from 'lucide-react';
import "../styles/WelcomeAdmin.css";

const WelcomeAdmin = () => {
  const [userInfo, setUserInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Modifiez les onglets existants pour ajouter l'onglet applications
  const [activeTab, setActiveTab] = useState('students'); // students, admins, applications
  // Ajoutez ces états dans le component WelcomeAdmin
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState('all');
  const navigate = useNavigate();

  // Ajoutez cette fonction pour charger les candidatures
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      
      const response = await axios.get("http://localhost:8000/api/applications/all/", { headers });
      console.log('Candidatures récupérées:', response.data);
      setApplications(response.data);
      
    } catch (error) {
      console.error('Erreur lors du chargement des candidatures:', error);
    }
  };

  // Modifiez le useEffect existant pour inclure le chargement des candidatures
  useEffect(() => {
    console.log('=== DEBUG WELCOME ADMIN ===');
    
    // Vérifier l'authentification et le rôle
    const authUserLocal = localStorage.getItem("auth_user");
    const authUserSession = sessionStorage.getItem("auth_user");
    
    console.log('localStorage auth_user:', authUserLocal);
    console.log('sessionStorage auth_user:', authUserSession);
    
    let authUser = null;
    
    if (authUserLocal) {
      try {
        authUser = JSON.parse(authUserLocal);
      } catch (error) {
        console.error('Erreur parsing localStorage:', error);
      }
    } else if (authUserSession) {
      try {
        authUser = JSON.parse(authUserSession);
      } catch (error) {
        console.error('Erreur parsing sessionStorage:', error);
      }
    }
    
    console.log('AuthUser récupéré:', authUser);
    
    if (!authUser || !authUser.email) {
      console.log('❌ Pas d\'utilisateur connecté - redirection vers login');
      navigate('/login');
      return;
    }
    
    const userRole = (authUser.role || '').toLowerCase().trim();
    console.log('Rôle utilisateur:', userRole);
    
    if (userRole !== 'admin' && userRole !== 'administrateur') {
      console.log('❌ Utilisateur pas admin - redirection vers welcome-etudiant');
      navigate('/welcome-etudiant');
      return;
    }
    
    console.log('✅ Utilisateur admin vérifié');
    setUserInfo(authUser);
    fetchData();
    fetchApplications(); // Ajoutez cette ligne
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      console.log('Token pour requêtes:', token ? 'présent' : 'absent');
      
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      
      // Récupérer les étudiants
      const studentsRes = await axios.get("http://localhost:8000/api/students/", { headers });
      console.log('Étudiants récupérés:', studentsRes.data);
      setStudents(studentsRes.data);
      
      // Récupérer les administrateurs
      const adminsRes = await axios.get("http://localhost:8000/api/admins/", { headers });
      console.log('Administrateurs récupérés:', adminsRes.data);
      setAdmins(adminsRes.data);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setIsLoading(false);
    }
  };

  // Ajoutez cette fonction pour changer le statut des candidatures
  const handleApplicationStatusChange = async (appId, newStatus) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      
      await axios.patch(`http://localhost:8000/api/applications/${appId}/status/`, {
        status: newStatus
      }, { headers });
      
      // Mettre à jour l'état local
      setApplications(prev => 
        prev.map(app => 
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
      
      alert(`Statut de la candidature mis à jour: ${newStatus}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  // Ajoutez ce component AdminApplicationManager avant le return principal
  const AdminApplicationManager = ({ applications, onStatusChange, selectedApp, setSelectedApp }) => {
    const filteredApplications = applications.filter(app => {
      if (applicationFilter === 'all') return true;
      return app.status === applicationFilter;
    });

    const getStatusIcon = (status) => {
      switch (status) {
        case 'sent': return <Clock size={16} color="#3B82F6" />;
        case 'reviewing': return <Eye size={16} color="#F59E0B" />;
        case 'approved': return <CheckCircle size={16} color="#10B981" />;
        case 'rejected': return <XCircle size={16} color="#EF4444" />;
        default: return <Clock size={16} color="#6B7280" />;
      }
    };

    const handleView = (app) => {
      setSelectedApp(app);
      if (app.status === 'sent') {
        onStatusChange(app.id, 'reviewing');
      }
    };

    const ApplicationDetail = ({ application, onClose, onStatusChange }) => (
      <div className="modal-overlay" onClick={onClose}>
        <div className="application-detail-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Détails de la Candidature #{application.id}</h3>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className="modal-content">
            <div className="detail-section">
              <h4><User size={18} /> Informations Personnelles</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Nom complet:</span>
                  <span className="value">{application.formData.firstName} {application.formData.lastName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{application.formData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Téléphone:</span>
                  <span className="value">{application.formData.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date de naissance:</span>
                  <span className="value">{application.formData.dob}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pays:</span>
                  <span className="value">{application.formData.country}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Niveau d'anglais:</span>
                  <span className="value">{application.formData.englishLevel}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4><GraduationCap size={18} /> Formation</h4>
              {application.formData.educationalBackground?.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="detail-item">
                    <span className="label">École:</span>
                    <span className="value">{edu.school}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Spécialité:</span>
                    <span className="value">{edu.major}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Note:</span>
                    <span className="value">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="detail-section">
              <h4><FileText size={18} /> Programme Demandé</h4>
              <div className="program-info">
                <p><strong>Programme:</strong> {application.program}</p>
                <p><strong>Université:</strong> {application.university}</p>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            {application.status === 'reviewing' && (
              <>
                <button 
                  className="action-btn approve-btn"
                  onClick={() => {
                    onStatusChange(application.id, 'approved');
                    onClose();
                  }}
                >
                  <Check size={16} />
                  Approuver
                </button>
                <button 
                  className="action-btn reject-btn"
                  onClick={() => {
                    onStatusChange(application.id, 'rejected');
                    onClose();
                  }}
                >
                  <X size={16} />
                  Rejeter
                </button>
              </>
            )}
            <button className="cancel-btn" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <div className="section-header">
          <h2>Gestion des Candidatures</h2>
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${applicationFilter === 'all' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('all')}
            >
              Toutes ({applications.length})
            </button>
            <button 
              className={`filter-tab ${applicationFilter === 'sent' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('sent')}
            >
              Envoyées ({applications.filter(a => a.status === 'sent').length})
            </button>
            <button 
              className={`filter-tab ${applicationFilter === 'reviewing' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('reviewing')}
            >
              En examen ({applications.filter(a => a.status === 'reviewing').length})
            </button>
            <button 
              className={`filter-tab ${applicationFilter === 'approved' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('approved')}
            >
              Approuvées ({applications.filter(a => a.status === 'approved').length})
            </button>
            <button 
              className={`filter-tab ${applicationFilter === 'rejected' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('rejected')}
            >
              Rejetées ({applications.filter(a => a.status === 'rejected').length})
            </button>
          </div>
        </div>
        
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} color="#9CA3AF" />
            <h3>Aucune candidature</h3>
            <p>Aucune candidature trouvée pour ce filtre.</p>
          </div>
        ) : (
          <div className="applications-table">
            <div className="table-header">
              <div className="header-cell">Étudiant</div>
              <div className="header-cell">Programme</div>
              <div className="header-cell">Date</div>
              <div className="header-cell">Statut</div>
              <div className="header-cell">Actions</div>
            </div>
            
            {filteredApplications.map((app) => (
              <div key={app.id} className="table-row">
                <div className="table-cell">
                  <div className="student-info">
                    <div className="student-avatar">
                      {app.userName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="student-name">{app.userName}</div>
                      <div className="student-email">{app.userEmail}</div>
                    </div>
                  </div>
                </div>
                <div className="table-cell">
                  <div className="program-info">
                    <div className="program-name">{app.program}</div>
                    <div className="university-name">{app.university}</div>
                  </div>
                </div>
                <div className="table-cell">
                  <div className="date-info">
                    {new Date(app.submissionDate).toLocaleDateString('fr-FR')}
                    <div className="time-info">
                      {new Date(app.submissionDate).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
                <div className="table-cell">
                  <div className="status-badge" style={{ 
                    backgroundColor: app.status === 'sent' ? '#3B82F620' : 
                                   app.status === 'reviewing' ? '#F59E0B20' :
                                   app.status === 'approved' ? '#10B98120' : '#EF444420',
                    color: app.status === 'sent' ? '#3B82F6' : 
                           app.status === 'reviewing' ? '#F59E0B' :
                           app.status === 'approved' ? '#10B981' : '#EF4444'
                  }}>
                    {getStatusIcon(app.status)}
                    <span>
                      {app.status === 'sent' ? 'Envoyée' :
                       app.status === 'reviewing' ? 'En examen' :
                       app.status === 'approved' ? 'Approuvée' : 'Rejetée'}
                    </span>
                  </div>
                </div>
                <div className="table-cell">
                  <div className="action-buttons">
                    <button 
                      className="view-btn"
                      onClick={() => handleView(app)}
                    >
                      <Eye size={16} />
                    </button>
                    {app.status === 'reviewing' && (
                      <>
                        <button 
                          className="approve-btn-small"
                          onClick={() => onStatusChange(app.id, 'approved')}
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          className="reject-btn-small"
                          onClick={() => onStatusChange(app.id, 'rejected')}
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {selectedApp && (
          <ApplicationDetail 
            application={selectedApp} 
            onClose={() => setSelectedApp(null)}
            onStatusChange={onStatusChange}
          />
        )}
      </>
    );
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      
      await axios.delete(`http://localhost:8000/api/students/${id}/delete/`, { headers });
      fetchData();
      alert('Étudiant supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet administrateur ?")) return;
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      
      await axios.delete(`http://localhost:8000/api/admins/${id}/delete/`, { headers });
      fetchData();
      alert('Administrateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      
      await axios.post("http://localhost:8000/api/admins/add/", {
        first_name: formData.get("prenom"),
        last_name: formData.get("nom"),
        email: formData.get("email"),
        password: formData.get("password"),
      }, { headers });
      
      alert("Nouvel admin ajouté !");
      e.target.reset();
      fetchData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      alert('Erreur lors de l\'ajout de l\'admin');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-icon">⚡</span>
              Dashboard Admin
            </h1>
            <p className="welcome-text">
              Bienvenue <strong>{userInfo.prenom} {userInfo.nom}</strong>
            </p>
          </div>
          <div className="header-right">
            <div className="user-avatar">
              {userInfo.prenom?.charAt(0)}{userInfo.nom?.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Étudiants</h3>
            <p className="stat-number">{students.length}</p>
            <span className="stat-label">Total inscrits</span>
          </div>
        </div>
        
        <div className="stat-card secondary">
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-content">
            <h3>Administrateurs</h3>
            <p className="stat-number">{admins.length}</p>
            <span className="stat-label">Membres de l'équipe</span>
          </div>
        </div>
        
        <div className="stat-card tertiary">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Activité</h3>
            <p className="stat-number">100%</p>
            <span className="stat-label">Système opérationnel</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* Modifiez la section des tabs pour inclure l'onglet applications */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <span>📚</span> Gestion des Étudiants
        </button>
        <button 
          className={`tab ${activeTab === 'admins' ? 'active' : ''}`}
          onClick={() => setActiveTab('admins')}
        >
          <span>👨‍💼</span> Gestion des Administrateur
        </button>
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <span>📋</span> Gestion des Candidatures ({applications.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeTab === 'students' && (
          <div className="students-section">
            <div className="section-header">
              <h2>Liste des Étudiants</h2>
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Rechercher un étudiant..." 
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
              </div>
            </div>
            
            {students.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>Aucun étudiant trouvé</h3>
                <p>Les nouveaux étudiants apparaîtront ici</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.user__id}>
                        <td>
                          <span className="id-badge">#{student.user__id}</span>
                        </td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-small">
                              {student.user__first_name?.charAt(0)}{student.user__last_name?.charAt(0)}
                            </div>
                            <div>
                              <strong>{student.user__first_name} {student.user__last_name}</strong>
                            </div>
                          </div>
                        </td>
                        <td>{student.user__email}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteStudent(student.user__id)} 
                            className="action-btn delete"
                          >
                            🗑️ Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="admins-section">
            <div className="section-header">
              <h2>Liste des Administrateurs</h2>
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Rechercher un administrateur..." 
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
              </div>
            </div>
            
            {admins.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍💼</div>
                <h3>Aucun administrateur trouvé</h3>
                <p>Les nouveaux administrateurs apparaîtront ici</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.user__id}>
                        <td>
                          <span className="id-badge">#{admin.user__id}</span>
                        </td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-small">
                              {admin.user__first_name?.charAt(0)}{admin.user__last_name?.charAt(0)}
                            </div>
                            <div>
                              <strong>{admin.user__first_name} {admin.user__last_name}</strong>
                            </div>
                          </div>
                        </td>
                        <td>{admin.user__email}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteAdmin(admin.user__id)} 
                            className="action-btn delete"
                          >
                            🗑️ Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Formulaire d'ajout d'admin en bas du tableau */}
            <div className="add-admin-section" style={{ marginTop: '2rem' }}>
              <div className="section-header">
                <h2>Créer un nouvel administrateur</h2>
                <p>Ajoutez un membre à votre équipe d'administration</p>
              </div>
              
              <form onSubmit={handleAddAdmin} className="modern-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input 
                      type="text" 
                      id="prenom"
                      name="prenom" 
                      placeholder="Entrez le prénom" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input 
                      type="text" 
                      id="nom"
                      name="nom" 
                      placeholder="Entrez le nom" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      placeholder="admin@example.com" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                      type="password" 
                      id="password"
                      name="password" 
                      placeholder="Mot de passe sécurisé" 
                      required 
                    />
                  </div>
                </div>
                
                <button type="submit" className="submit-btn">
                  <span>✨</span> Créer l'administrateur
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Ajoutez cette condition dans la section content-area */}
        {activeTab === 'applications' && (
          <div className="applications-section">
            <AdminApplicationManager 
              applications={applications} 
              onStatusChange={handleApplicationStatusChange}
              selectedApp={selectedApp}
              setSelectedApp={setSelectedApp}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeAdmin;