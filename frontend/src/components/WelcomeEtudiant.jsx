import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import MAJOR_PROFILES from '../components/OrientationTest/profiles';
import {
  weightedEuclideanMatchScores,
  topKMatches,
  computeRawScoresFromAnswers,
  computeMaxScoresTheoretical,
  normalizeScores0to100
} from '../components/OrientationTest/scoring';
import {
  Clock, CheckCircle, XCircle, Eye, Calendar, User, Mail, Phone, MapPin,
  FileText, Target, Award, TrendingUp, BookOpen, Settings,
  LogOut, Bell, HelpCircle, MessageCircle, Home, X, ArrowLeft, ChevronDown, Plus
} from 'lucide-react';
import '../styles/WelcomeEtudiant.css';
import logo from '../assets/diravenir.png';

const WelcomeEtudiant = () => {
  const { logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    prenom: '',
    nom: '',
    email: '',
    role: '',
    profilePhoto: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    profilePhoto: ''
  });
  const [tempProfilePhoto, setTempProfilePhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [orientationTest, setOrientationTest] = useState(null);
  const [loadingTest, setLoadingTest] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: '#3B82F6' },
    { id: 'applications', label: 'My Applications', icon: FileText, color: '#8B5CF6' },
    { id: 'profile', label: 'Edit Profile', icon: User, color: '#F59E0B' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: '#10B981' },
  ];

  const bottomNavigationItems = [
    { id: 'back-to-home', label: 'Back to Website', icon: ArrowLeft, color: '#3B82F6' },
    { id: 'help', label: 'Help Centre', icon: HelpCircle, color: '#6B7280' },
    { id: 'contact', label: 'Contact Us', icon: MessageCircle, color: '#6B7280' },
    { id: 'logout', label: 'Log Out', icon: LogOut, color: '#EF4444' }
  ];

  // Initialisation du formulaire d'édition
  const initEditForm = () => {
    setEditForm({
      prenom: userInfo.prenom || '',
      nom: userInfo.nom || '',
      email: userInfo.email || '',
      profilePhoto: userInfo.profilePhoto || '',
      currentPassword: '',
      newPassword: ''
    });
    setTempProfilePhoto(null);
  };

  // useEffect pour initialiser quand on entre en mode édition
  useEffect(() => {
    if (isEditing) {
      initEditForm();
    }
  }, [isEditing, userInfo]);

  // Gestion optimisée de l'upload de photo
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation du fichier
    const maxSize = 5 * 1024 * 1024; // 5MB max
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Format non supporté. Utilisez JPG, PNG ou WebP.');
      return;
    }
    
    if (file.size > maxSize) {
      alert('Image trop volumineuse. Maximum 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const photoData = event.target.result;
      
      // Mise à jour du formulaire pour l'aperçu
      setEditForm(prev => ({
        ...prev, 
        profilePhoto: photoData
      }));
      
      // Garder une copie temporaire
      setTempProfilePhoto(photoData);
    };
    reader.readAsDataURL(file);
  };

  // Annulation des modifications
  const handleCancelEdit = () => {
    // Restaurer la photo originale
    setEditForm(prev => ({
      ...prev,
      profilePhoto: userInfo.profilePhoto || ''
    }));
    
    // Nettoyer le temporaire
    setTempProfilePhoto(null);
    
    // Sortir du mode édition
    setIsEditing(false);
  };

  // Fonction utilitaire pour afficher la photo
  const getCurrentPhoto = () => {
    return editForm.profilePhoto || userInfo.profilePhoto || null;
  };

  // Function to load applications
  const fetchApplications = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/applications/user/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log('[fetchApplications] response.data:', response.data);
      setApplications(response.data);
      generateNotificationsFromApplications(response.data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoadingApplications(false);
    }
  };

  // Function to generate notifications from applications
  const generateNotificationsFromApplications = (apps) => {
    try {
      const savedNotifications = JSON.parse(localStorage.getItem('studentNotifications')) || [];
      const dismissed = JSON.parse(localStorage.getItem('dismissedNotifications')) || [];
      console.log('[Notifications] savedNotifications (before):', savedNotifications);
      console.log('[Notifications] applications received:', apps);
      const newNotifications = [];
      apps.forEach(app => {
        const status = app.status;
        if (!status || status === 'sent') return;
        const already = savedNotifications.find(n => n.applicationId === app.id && n.type === status);
        if (already) return;
        const program = app.program || (app.formData && app.formData.program) || 'ce programme';
        const university = app.university || (app.formData && app.formData.university) || 'cette université';
        let title = `Candidature: ${status}`;
        let message = `Le statut de votre candidature pour ${program} à ${university} a changé (${status}).`;
        let type = status;
        switch (status) {
          case 'approved':
          case 'approve':
          case 'accepted':
            title = "Application Approved";
            message = `Your application for ${program} has ${university} was approved.`;
            type = 'approved';
            break;
          case 'rejected':
          case 'declined':
            title = "Application Rejected";
            message = `Your application for ${program} has ${university} was rejected.`;
            type = 'rejected';
            break;
          case 'reviewing':
          case 'under_review':
          case 'in_review':
            title = "Application under reviewing";
            message = `Your application for ${program} has ${university} is under review.`;
            type = 'reviewing';
            break;
        }
        const createdAtCandidate =
          app.reviewedDate || app.reviewed_date ||
          app.updatedAt || app.updated_at ||
          app.createdAt || app.created_at ||
          new Date().toISOString();
        const createdAtISO = new Date(createdAtCandidate).toISOString();
        const notifId = `notif-${app.id}-${type}-${Date.now()}`;
        const notifKey = `${app.id}-${status}`;
        if (dismissed.includes(notifKey)) return;
        newNotifications.push({
          id: notifId,
          applicationId: app.id,
          title,
          message,
          type,
          read: false,
          created_at: createdAtISO,
        });
      });
      const merged = [...savedNotifications];
      newNotifications.forEach(n => {
        if (!merged.find(m => m.id === n.id)) merged.push(n);
      });
      if (newNotifications.length > 0) {
        setNotifications(merged);
        const newUnread = merged.filter(n => !n.read).length;
        setUnreadCount(newUnread);
        localStorage.setItem('studentNotifications', JSON.stringify(merged));
        console.log('[Notifications] created:', newNotifications);
      } else {
        setNotifications(savedNotifications);
        setUnreadCount(savedNotifications.filter(n => !n.read).length);
      }
    } catch (err) {
      console.error('[Notifications] generate error:', err);
    }
  };

  // Function to mark notifications as read
  const markNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('studentNotifications', JSON.stringify(updatedNotifications));
  };

  // Load notifications from localStorage on startup
  useEffect(() => {
    const savedNotifications = localStorage.getItem('studentNotifications');
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      setNotifications(parsedNotifications);
      setUnreadCount(parsedNotifications.filter(n => !n.read).length);
    }
  }, []);

  // Ensure we get connected user names from backend if storage is incomplete
  const fetchProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const response = await axios.get('http://localhost:8000/api/profile/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (response.data?.user) {
        const { prenom, nom, email, role } = response.data.user;
        const updated = { 
          prenom: prenom || '', 
          nom: nom || '', 
          email: email || '', 
          role: role || 'student',
          profilePhoto: userInfo.profilePhoto || ''
        };
        setUserInfo(updated);
        setEditForm({ 
          prenom: updated.prenom, 
          nom: updated.nom, 
          email: updated.email, 
          currentPassword: '', 
          newPassword: '',
          profilePhoto: updated.profilePhoto
        });
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        const old = JSON.parse(storage.getItem('auth_user') || '{}');
        storage.setItem('auth_user', JSON.stringify({ ...old, ...updated }));
        storage.setItem('prenom', updated.prenom);
        storage.setItem('nom', updated.nom);
        storage.setItem('email', updated.email);
      }
    } catch (e) {
      // silent fail, fallback to local storage values
    }
  };

  // Function to load orientation test results
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
      console.error('Error loading orientation test:', error);
      if (error.response && error.response.status !== 404) {
        console.error('Unexpected error:', error);
      }
    } finally {
      setLoadingTest(false);
    }
  };

  // Component to display orientation test results
  const OrientationTestSection = ({ testData, isLoading }) => {
    if (isLoading) {
      return (
        <div className="test-section loading">
          <div className="loading-content">
            <Target size={48} color="#3B82F6" />
            <p>Loading your results...</p>
          </div>
        </div>
      );
    }
    if (!testData) {
      return (
        <div className="test-section no-test">
          <div className="no-test-content">
            <Target size={64} color="#9CA3AF" />
            <h3>Orientation Test</h3>
            <p>Discover the programs that best match your interests by taking our personalized orientation test.</p>
            <button
              className="test-btn primary"
              onClick={() => navigate('/orientation/test')}
            >
              <BookOpen size={20} />
              Take Orientation Test
            </button>
          </div>
        </div>
      );
    }
    const getTopResults = (answers) => {
      if (!answers) {
        console.warn("No answers available");
        return [];
      }
      try {
        const raw = computeRawScoresFromAnswers(answers);
        const max = computeMaxScoresTheoretical();
        const normalized = normalizeScores0to100(raw, max);
        const matchScores = weightedEuclideanMatchScores(normalized, MAJOR_PROFILES);
        const topMatches = topKMatches(matchScores, 3);
        return topMatches.map(({ major, score }) => ({
          major,
          score: Math.round(score)
        }));
      } catch (error) {
        console.error("Calculation error:", error);
        return [
          { major: "Error calculating results", score: 0 }
        ];
      }
    };
    const topResults = getTopResults(testData.answers);
    const testDate = new Date(testData.completed_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return (
      <div className="test-results-card">
        <div className="test-header">
          <div className="test-title">
            <Award size={24} color="#10B981" />
            <div>
              <h3>Orientation Test Results</h3>
              <p className="test-date">Completed on {testDate}</p>
            </div>
          </div>
          <button
            className="test-btn secondary"
            onClick={() => navigate('/orientation/test')}
          >
            <TrendingUp size={16} />
            Retake
          </button>
        </div>
        {topResults.length > 0 && topResults[0].major !== "Error calculating results" && (
          <div className="results-preview">
            {topResults.slice(0, 3).map((result, index) => (
              <div key={result.major} className={`result-preview rank-${index + 1}`}>
                <div className="rank-number">#{index + 1}</div>
                <div className="result-info">
                  <h4>{result.major}</h4>
                  <div className="score-display">{result.score}%</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {topResults.length > 0 && topResults[0].major === "Error calculating results" && (
          <div className="error-message">
            <p style={{ color: '#ef4444' }}>Error calculating results. Please retake the test.</p>
          </div>
        )}
        <button
          className="test-btn ghost full-width"
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
          View Full Details
        </button>
      </div>
    );
  };

  // ApplicationStatus component for dashboard
  const ApplicationStatusDashboard = ({ applications = [] }) => {
    const stats = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'sent' || app.status === 'reviewing').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    };
    return (
      <div className="applications-dashboard">
        <h3>My Applications</h3>
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          <div className="stat-card approved">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.approved}</div>
              <div className="stat-label">Approved</div>
            </div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-icon">
              <XCircle size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.rejected}</div>
              <div className="stat-label">Not Approved</div>
            </div>
          </div>
        </div>
        {applications.length > 0 && (
          <div className="recent-applications">
            <h4>Recent Applications</h4>
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="application-item">
                <div className="app-info">
                  <div className="app-name">{app.program}</div>
                  <div className="app-university">{app.university}</div>
                </div>
                <div className={`app-status status-${app.status}`}>
                  {app.status === 'sent' && <Clock size={16} />}
                  {app.status === 'reviewing' && <Eye size={16} />}
                  {app.status === 'approved' && <CheckCircle size={16} />}
                  {app.status === 'rejected' && <XCircle size={16} />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Component for complete applications list
  const ApplicationsList = ({ applications = [] }) => {
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
        case 'sent': return 'Sent';
        case 'reviewing': return 'Under Review';
        case 'approved': return 'Approved';
        case 'rejected': return 'Not Approved';
        default: return 'Unknown Status';
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
          <h3>No Applications</h3>
          <p>You haven't submitted any applications yet.</p>
        </div>
      );
    }
    return (
      <div className="applications-list">
        {applications.map((app) => (
          <div key={app.id} className="application-card">
            <div className="application-header">
              <div className="application-info">
                <h4 className="program-name">{app.program}</h4>
                <p className="university-name">{app.university}</p>
                <p className="submission-date">
                  <Calendar size={16} />
                  Submitted on {new Date(app.submissionDate).toLocaleDateString('en-US', {
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

  // Notifications component
  const NotificationsSection = () => {
    return (
      <div className="notifications-content">
        <div className="notifications-header">
          <h1>Notifications</h1>
          {notifications.length > 0 && (
            <button
              className="clear-notifications-btn"
              onClick={() => {
                const dismissed = notifications.map(n => `${n.applicationId}-${n.type}`);
                localStorage.setItem('dismissedNotifications', JSON.stringify(dismissed));
                setNotifications([]);
                setUnreadCount(0);
                localStorage.setItem('studentNotifications', JSON.stringify([]));
              }}
            >
              Delete All
            </button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={48} color="#9CA3AF" />
            <h3>No Notifications</h3>
            <p>You have no notifications at the moment.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon">
                  {notification.type === 'approved' && <CheckCircle size={20} color="#10B981" />}
                  {notification.type === 'rejected' && <XCircle size={20} color="#EF4444" />}
                  {notification.type === 'reviewing' && <Eye size={20} color="#F59E0B" />}
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const loadUserData = () => {
      const localAuthUser = localStorage.getItem("auth_user");
      const sessionAuthUser = sessionStorage.getItem("auth_user");
      let userData = null;
      if (localAuthUser) {
        try {
          userData = JSON.parse(localAuthUser);
        } catch (error) {
          console.error('Error parsing localStorage auth_user:', error);
        }
      } else if (sessionAuthUser) {
        try {
          userData = JSON.parse(sessionAuthUser);
        } catch (error) {
          console.error('Error parsing sessionStorage auth_user:', error);
        }
      }
      if (userData && userData.email) {
        const userRole = (userData.role || '').toLowerCase().trim();
        if (userRole === 'admin' || userRole === 'administrateur') {
          navigate('/welcome-admin');
          return;
        }
        const userInfo = {
          prenom: userData.prenom || userData.first_name || '',
          nom: userData.nom || userData.last_name || '',
          email: userData.email || '',
          role: userData.role || 'student',
          profilePhoto: userData.profilePhoto || ''
        };
        setUserInfo(userInfo);
        setEditForm({
          prenom: userInfo.prenom,
          nom: userInfo.nom,
          email: userInfo.email,
          currentPassword: '',
          newPassword: '',
          profilePhoto: userInfo.profilePhoto
        });
      } else {
        const prenom = localStorage.getItem('prenom') || sessionStorage.getItem('prenom') || '';
        const nom = localStorage.getItem('nom') || sessionStorage.getItem('nom') || '';
        const email = localStorage.getItem('email') || sessionStorage.getItem('email') || '';
        const role = localStorage.getItem('role') || sessionStorage.getItem('role') || '';
        const profilePhoto = localStorage.getItem('profilePhoto') || sessionStorage.getItem('profilePhoto') || '';
        if (prenom || nom || email) {
          const userRole = (role || '').toLowerCase().trim();
          if (userRole === 'admin' || userRole === 'administrateur') {
            navigate('/welcome-admin');
            return;
          }
          const userInfo = { prenom, nom, email, role: role || 'student', profilePhoto };
          setUserInfo(userInfo);
          setEditForm({
            prenom,
            nom,
            email,
            currentPassword: '',
            newPassword: '',
            profilePhoto
          });
        } else {
          navigate('/login');
          return;
        }
      }
      setIsLoading(false);
    };
    loadUserData();
    fetchProfile();
    fetchApplications();
    fetchOrientationTestResults();
  }, [navigate]);

  // Auto-refresh applications to reflect admin approvals/rejections in near real-time
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchApplications();
    }, 10000); // refresh every 10s
    return () => clearInterval(intervalId);
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Soumission du formulaire avec gestion de photo optimisée
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!editForm.prenom.trim() || !editForm.nom.trim() || !editForm.email.trim()) {
      showMessage('error', 'All required fields must be filled');
      setIsSubmitting(false);
      return;
    }
    if (!editForm.currentPassword) {
      showMessage('error', 'Current password is required to modify profile');
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
          role: userInfo.role,
          profilePhoto: tempProfilePhoto || userInfo.profilePhoto
        };
        
        setUserInfo(updatedUserInfo);
        
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        const authUser = JSON.parse(storage.getItem('auth_user') || '{}');
        const updatedAuthUser = { ...authUser, ...updatedUserInfo };
        storage.setItem('auth_user', JSON.stringify(updatedAuthUser));
        storage.setItem('email', updatedUserInfo.email);
        storage.setItem('prenom', updatedUserInfo.prenom);
        storage.setItem('nom', updatedUserInfo.nom);
        
        // Sauvegarder la photo si modifiée
        if (tempProfilePhoto) {
          storage.setItem('profilePhoto', tempProfilePhoto);
        }
        
        // Nettoyer l'état temporaire
        setTempProfilePhoto(null);
        setIsEditing(false);
        
        showMessage('success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error during update:', error);
      if (error.response?.data?.error) {
        showMessage('error', error.response.data.error);
      } else {
        showMessage('error', 'Error updating profile');
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
      showMessage('success', 'Account deleted successfully');
      setTimeout(() => {
        logout();
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error during deletion:', error);
      showMessage('error', 'Error deleting account');
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const handleHelpCentre = () => {
    navigate('/faq');
  };

  const handleNavigation = (itemId) => {
    if (itemId === 'logout') {
      handleLogout();
    } else if (itemId === 'back-to-home') {
      handleBackToHome();
    } else if (itemId === 'contact') {
      handleContactUs();
    } else if (itemId === 'help') {
      handleHelpCentre();
    } else if (itemId === 'notifications') {
      markNotificationsAsRead();
      setActiveTab(itemId);
    } else {
      setActiveTab(itemId);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <div className="header-left">
                <h1 className="brand-accent">Welcome Back, {userInfo.prenom || 'Student'} {userInfo.nom || 'Student'}</h1>
                <p>Here is the information about all your applications</p>
              </div>
              <div className="header-right">
                <div className="notification-bell" onClick={() => { setActiveTab('notifications'); markNotificationsAsRead(); }}>
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </div>
                <div className="header-profile" onClick={() => setActiveTab('profile')}>
                  <div className="profile-avatar-small">
                    {getCurrentPhoto() ? (
                      <img src={getCurrentPhoto()} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                    ) : (
                       <span>
      {(userInfo.prenom ).charAt(0).toUpperCase()}
      {(userInfo.nom).charAt(0).toUpperCase()}
    </span>
                    )}
                  </div>
                  <span className="brand-accent">{userInfo.prenom || 'Student'}</span>
                </div>
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="left-column">
                <OrientationTestSection testData={orientationTest} isLoading={loadingTest} />
                <ApplicationStatusDashboard applications={applications} />
              </div>
              <div className="right-column">
                <div className="stats-panel">
                  <h3>Application Numbers</h3>
                  <div className="donut-chart-container">
                    <svg className="donut-chart" viewBox="0 0 100 100">
                      <circle className="donut-background" cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      {applications.length > 0 ? (
                        <>
                          <circle
                            className="donut-segment pending"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="10"
                            strokeDasharray={`${(applications.filter(app => app.status === 'sent' || app.status === 'reviewing').length / applications.length) * 283} 283`}
                            strokeDashoffset={283 * (1 - (applications.filter(app => app.status === 'sent' || app.status === 'reviewing').length / applications.length))}
                            transform="rotate(-90 50 50)"
                          />
                          <circle
                            className="donut-segment approved"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="10"
                            strokeDasharray={`${(applications.filter(app => app.status === 'approved').length / applications.length) * 283} 283`}
                            strokeDashoffset={283 * (1 - (applications.filter(app => app.status === 'approved').length / applications.length))}
                            transform="rotate(-90 50 50)"
                          />
                          <circle
                            className="donut-segment rejected"
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="10"
                            strokeDasharray={`${(applications.filter(app => app.status === 'rejected').length / applications.length) * 283} 283`}
                            strokeDashoffset={283 * (1 - (applications.filter(app => app.status === 'rejected').length / applications.length))}
                            transform="rotate(-90 50 50)"
                          />
                        </>
                      ) : (
                        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="#9ca3af">No Data</text>
                      )}
                    </svg>
                    <div className="donut-stats">
                      <div className="total-applications">
                        <span className="number">{applications.length}</span>
                        <span className="label">Applications</span>
                      </div>
                    </div>
                  </div>
                  <div className="stats-legend">
                    <div className="legend-item">
                      <div className="legend-color pending"></div>
                      <span>{Math.round((applications.filter(app => app.status === 'sent' || app.status === 'reviewing').length / (applications.length || 1)) * 100)}% Pending</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color approved"></div>
                      <span>{Math.round((applications.filter(app => app.status === 'approved').length / (applications.length || 1)) * 100)}% Approved</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color rejected"></div>
                      <span>{Math.round((applications.filter(app => app.status === 'rejected').length / (applications.length || 1)) * 100)}% Not Approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'applications':
        return (
          <div className="applications-content">
            <h1>My Applications</h1>
            <ApplicationsList applications={applications} />
          </div>
        );
     case 'profile':   
  return (     
    <div className="profile-content">       
      <div className="profile-card">
        <div className="profile-header">         
          <div className="profile-photo-container">           
            <div className="profile-photo" onClick={() => document.getElementById('profile-photo-input').click()}>             
              {editForm.profilePhoto ? (               
                <img src={editForm.profilePhoto} alt="Profile" />             
              ) : (               
                <div className="profile-photo-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>             
              )}           
            </div>           
            <div className="profile-photo-upload" onClick={() => document.getElementById('profile-photo-input').click()}>             
              <Plus size={12} color="white" />           
            </div>           
            <input             
              type="file"             
              id="profile-photo-input"             
              className="hidden-file-input"             
              accept="image/*"             
              onChange={handlePhotoUpload}           
            />         
          </div>          
          <div className="profile-info">           
            <h1>{userInfo.prenom} {userInfo.nom}</h1>           
            <p className="profile-email">{userInfo.email}</p>         
          </div>       
        </div>        
        
        <form onSubmit={handleEditSubmit} className="edit-form">           
          <div className="form-group2 first-name">             
            <label>First Name *</label>             
            <input               
              type="text"               
              value={editForm.prenom}               
              onChange={(e) => setEditForm({...editForm, prenom: e.target.value})}               
              placeholder="Your first name"               
              required               
              disabled={isSubmitting}             
            />           
          </div>            
          
          <div className="form-group2 current-password">             
            <label>Current Password *</label>             
            <input               
              type="password"               
              value={editForm.currentPassword}               
              onChange={(e) => setEditForm({...editForm, currentPassword: e.target.value})}               
              placeholder="Required to confirm changes"               
              required               
              disabled={isSubmitting}             
            />           
          </div>            
          
          <div className="form-group2 last-name">             
            <label>Last Name *</label>             
            <input               
              type="text"               
              value={editForm.nom}               
              onChange={(e) => setEditForm({...editForm, nom: e.target.value})}               
              placeholder="Your last name"               
              required               
              disabled={isSubmitting}             
            />           
          </div>            
          
          <div className="form-group2 new-password">             
            <label>New Password (optional)</label>             
            <input               
              type="password"               
              value={editForm.newPassword}               
              onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})}               
              placeholder="Leave blank to keep current password"               
              disabled={isSubmitting}             
            />           
          </div>            
          
          <div className="form-group2 email-field">             
            <label>Email *</label>             
            <input               
              type="email"               
              value={editForm.email}               
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}               
              placeholder="your.email@example.com"               
              required               
              disabled={isSubmitting}             
            />           
          </div>            
          
          <div className="modal-actions">             
            <button               
              type="submit"               
              className="submit-btn"               
              disabled={isSubmitting}             
            >               
              {isSubmitting ? 'Updating...' : 'Edit'}             
            </button>           
          </div>         
        </form>
      </div>       
    </div>   
  );
  
      case 'notifications':
        return <NotificationsSection />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="welcome-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Notification message */}
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
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="Logo" className="sidebar-logo-img" />
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <div className="nav-icon" style={{ color: item.color }}>
                    <IconComponent size={20} />
                  </div>
                  <span className="nav-label">{item.label}</span>
                  {item.id === 'notifications' && unreadCount > 0 && (
                  <span className="nav-badge">{unreadCount}</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="nav-section bottom">
            {bottomNavigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className="nav-item"
                  onClick={() => handleNavigation(item.id)}
                >
                  <div className="nav-icon" style={{ color: item.color }}>
                    <IconComponent size={20} />
                  </div>
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
      {/* Delete modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>Delete My Account</h3>
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
                <strong>Warning!</strong> This action is irreversible.
                All your data will be permanently deleted.
              </p>
              <p>Are you sure you want to delete your account?</p>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-confirm-btn"
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Confirm Deletion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeEtudiant;