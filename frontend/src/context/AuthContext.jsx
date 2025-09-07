import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Fonction pour vérifier le token dans localStorage ET sessionStorage
  const getStoredToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Fonction pour vérifier les informations utilisateur dans localStorage ET sessionStorage
  const getStoredUser = () => {
    const userFromLocal = localStorage.getItem('auth_user');
    const userFromSession = sessionStorage.getItem('auth_user');
    const userData = userFromLocal || userFromSession;
    
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(!!getStoredToken());
  const [user, setUser] = useState(getStoredUser());

  // Fonction de login mise à jour
  const login = (token, userData = null, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem('token', token);
    if (userData) {
      storage.setItem('auth_user', JSON.stringify(userData));
      storage.setItem('role', userData.role);
      setUser(userData);
    }
    
    setIsLoggedIn(true);
  };

  // Fonction de logout mise à jour
  const logout = () => {
    // Nettoyer localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('role');
    localStorage.removeItem('prenom'); // Gardé pour compatibilité
    localStorage.removeItem('nom'); // Gardé pour compatibilité
    
    // Nettoyer sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('role');
    
    setIsLoggedIn(false);
    setUser(null);
  };

  // Vérifier l'état d'authentification au chargement du composant
  useEffect(() => {
    const token = getStoredToken();
    const userData = getStoredUser();
    
    setIsLoggedIn(!!token);
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      login, 
      logout,
      getStoredToken, // Exposer la fonction pour d'autres composants si nécessaire
      getStoredUser   // Exposer la fonction pour d'autres composants si nécessaire
    }}>
      {children}
    </AuthContext.Provider>
  );
}