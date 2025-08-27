// WelcomeEtudiant.jsx - Amélioré avec vérification rôle
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomeEtudiant.css';

const WelcomeEtudiant = () => {
  const [userInfo, setUserInfo] = useState({
    prenom: '',
    nom: '',
    email: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
          
          setUserInfo({ prenom, nom, email, role: role || 'etudiant' });
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
  }, [navigate]);

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    // Nettoyer tout le stockage
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
                <div className="feature-item">
                  <div className="feature-dot blue"></div>
                  <span>Guide des filières</span>
                </div>
                <div className="feature-item">
                  <div className="feature-dot purple"></div>
                  <span>Conseils personnalisés</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="user-info">
          <div className="user-info-content">
            <span className="user-icon">👤</span>
            <span>Connecté en tant que: {userInfo.email} ({userInfo.role})</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomeEtudiant;