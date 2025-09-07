import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const token = searchParams.get('token');
    const userId = searchParams.get('user');
    const email = searchParams.get('email');
    const prenom = searchParams.get('prenom');
    const nom = searchParams.get('nom');
    const role = searchParams.get('role');
    const error = searchParams.get('error');

    if (error) {
      console.error('Erreur d\'authentification Google:', error);
      navigate('/login?error=google_auth_failed');
      return;
    }

    if (token && userId) {
      // Stocker les données utilisateur
      const userInfo = {
        id: userId,
        email: email,
        firstName: prenom,
        lastName: nom,
        role: role,
      };

      // Utiliser localStorage par défaut pour Google OAuth
      localStorage.setItem('token', token);
      localStorage.setItem('auth_user', JSON.stringify(userInfo));
      localStorage.setItem('role', role);

      // Mettre à jour le contexte d'authentification
      if (login) {
        login(token);
      }

      // Vérifier s'il y a une redirection stockée dans sessionStorage
      const redirectPath = sessionStorage.getItem('google_redirect_path');
      if (redirectPath) {
        sessionStorage.removeItem('google_redirect_path');
        navigate(redirectPath);
        return;
      }

      // Redirection selon le rôle
      const userRole = role?.toLowerCase().trim();
      if (userRole === 'admin' || userRole === 'administrator') {
        navigate('/welcome-admin');
      } else {
        navigate('/welcome-etudiant');
      }
    } else {
      // Données manquantes, rediriger vers login
      navigate('/login?error=invalid_google_response');
    }
  }, [searchParams, navigate, login]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      <div>
        <p>Finalisation de la connexion Google...</p>
        <div style={{ margin: '20px auto', width: '50px', height: '50px', border: '3px solid #f3f3f3', borderTop: '3px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default GoogleAuthCallback;