// services/orientationService.js - Service pour les appels API
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Configuration d'axios
const orientationAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour ajouter le token CSRF si nécessaire
orientationAPI.interceptors.request.use(
  (config) => {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const orientationService = {
  // Soumettre un test d'orientation
  submitTest: async (answers, sessionId = null) => {
    try {
      const response = await orientationAPI.post('/api/orientation/submit/', {
        answers,
        session_id: sessionId || `session_${Date.now()}_${Math.random()}`
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting test:', error);
      throw error;
    }
  },

  // Récupérer toutes les majeures
  getMajors: async () => {
    try {
      const response = await orientationAPI.get('/api/orientation/majors/');
      return response.data;
    } catch (error) {
      console.error('Error fetching majors:', error);
      throw error;
    }
  },

  // Récupérer les résultats d'un test
  getTestResults: async (testId) => {
    try {
      const response = await orientationAPI.get(`/api/orientation/results/${testId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching test results:', error);
      throw error;
    }
  }
};