// GoogleAuthCallback.jsx
import React, { useEffect, useContext, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function GoogleAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const hasProcessed = useRef(false); // Empêcher le traitement multiple

  useEffect(() => {
    // Si déjà traité, ne pas recommencer
    if (hasProcessed.current) return;
    
    const handleGoogleCallback = () => {
      console.log('Processing Google auth callback...');
      hasProcessed.current = true; // Marquer comme traité
      
      // Extract parameters from URL
      const token = searchParams.get('token');
      const userId = searchParams.get('user_id');
      const email = decodeURIComponent(searchParams.get('email') || '');
      const prenom = decodeURIComponent(searchParams.get('prenom') || '');
      const nom = decodeURIComponent(searchParams.get('nom') || '');
      const role = searchParams.get('role');
      const redirectPath = searchParams.get('redirect_path');
      const error = searchParams.get('error');

      console.log('Callback parameters:', { token, userId, email, prenom, nom, role, redirectPath });

      if (error) {
        console.error('Google authentication error:', error);
        navigate('/login?error=' + encodeURIComponent('Google authentication failed. Please try again.'), { replace: true });
        return;
      }

      if (token && userId && email) {
        try {
          const userInfo = {
            id: parseInt(userId),
            email: email,
            firstName: prenom || '',
            lastName: nom || '',
            role: role || 'etudiant',
          };

          console.log('Setting user info:', userInfo);

          // Update auth context
          if (login) {
            login(token, userInfo, false);
          }

          // Redirection immédiate avec replace pour éviter la boucle
          const userRole = (role || 'etudiant').toLowerCase().trim();
          
          // Priorité à redirectPath s'il existe et n'est pas une page d'accueil
          if (redirectPath && 
              redirectPath !== '/welcome-etudiant' && 
              redirectPath !== '/welcome-admin' && 
              redirectPath !== '/' && 
              redirectPath !== '') {
            console.log('Redirecting to original requested path:', redirectPath);
            navigate(redirectPath, { replace: true });
          } else {
            // Default role-based redirect
            if (userRole === 'admin' || userRole === 'administrator') {
              console.log('Redirecting to admin welcome');
              navigate('/welcome-admin', { replace: true });
            } else {
              console.log('Redirecting to student welcome');
              navigate('/welcome-etudiant', { replace: true });
            }
          }
          
        } catch (error) {
          console.error('Error processing Google authentication:', error);
          navigate('/login?error=' + encodeURIComponent('Authentication processing failed.'), { replace: true });
        }
      } else {
        console.error('Missing authentication parameters:', { token, userId, email });
        navigate('/login?error=' + encodeURIComponent('Authentication data incomplete.'), { replace: true });
      }
    };

    handleGoogleCallback();
  }, []); // Dépendances vides pour éviter la boucle

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        fontSize: '18px',
        marginBottom: '20px',
        color: '#333',
        fontFamily: 'Arial, sans-serif'
      }}>
        🔄 Processing Google authentication...
      </div>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #4285f4',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
      <div style={{
        marginTop: '20px',
        fontSize: '14px',
        color: '#666',
        maxWidth: '300px',
        textAlign: 'center'
      }}>
        Please wait while we complete your Google authentication...
      </div>
    </div>
  );
}

export default GoogleAuthCallback;