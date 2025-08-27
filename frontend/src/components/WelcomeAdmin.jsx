// WelcomeAdmin.jsx - Design moderne et responsive avec gestion des administrateurs
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomeAdmin.css";

const WelcomeAdmin = () => {
  const [userInfo, setUserInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');
  const navigate = useNavigate();

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
          <span>👨‍💼</span> Gestion Administrateur
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
      </div>
    </div>
  );
};

export default WelcomeAdmin;