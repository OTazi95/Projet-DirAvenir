import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Clock, CheckCircle, XCircle, Eye, Check, X, User, GraduationCap, FileText, Bell, LogOut, Search
} from 'lucide-react';
import "../styles/WelcomeAdmin.css";
import logo from '../assets/logo.png';

const WelcomeAdmin = () => {
  const [userInfo, setUserInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  // Navigation items pour le sidebar
  const navigationItems = [
    { id: 'students', label: 'Students', icon: User, color: '#541652' },
    { id: 'admins', label: 'Admins', icon: User, color: '#541652' },
    { id: 'applications', label: 'Applications', icon: FileText, color: '#541652' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: '#541652', badge: 0 },
  ];

  // Bottom navigation items
  const bottomNavigationItems = [
    { id: 'logout', label: 'Log Out', icon: LogOut, color: '#ef4444' },
  ];

  // Charger les applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      const response = await axios.get("http://localhost:8000/api/applications/all/", { headers });
      setApplications(response.data);
      generateNotificationsFromApplications(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des candidatures:', error);
    }
  };

  const generateNotificationsFromApplications = (apps) => {
    const savedNotifications = JSON.parse(localStorage.getItem('adminNotifications')) || [];
    const dismissed = JSON.parse(localStorage.getItem('adminDismissedNotifications')) || [];
    const newNotifications = [...savedNotifications];

    apps.forEach(app => {
      // si la candidature est nouvelle
      const notifKey = `app-${app.id}-sent`;
      if (app.status === "sent" && !savedNotifications.find(n => n.key === notifKey) && !dismissed.includes(notifKey)) {
        newNotifications.push({
          key: notifKey,
          applicationId: app.id,
          message: `Nouvelle candidature envoyée par ${app.userName || app.userEmail}`,
          date: new Date().toLocaleDateString("fr-FR"),
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        });
      }
    });

    localStorage.setItem('adminNotifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  };

  const markNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('adminNotifications', JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    const dismissed = notifications.map(n => n.key);
    localStorage.setItem('adminDismissedNotifications', JSON.stringify(dismissed));
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem('adminNotifications', JSON.stringify([]));
  };

  // Charger les données (étudiants et admins)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      const studentsRes = await axios.get("http://localhost:8000/api/students/", { headers });
      setStudents(studentsRes.data);
      const adminsRes = await axios.get("http://localhost:8000/api/admins/", { headers });
      setAdmins(adminsRes.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setIsLoading(false);
    }
  };

  // Fonction pour filtrer les étudiants selon le terme de recherche
  const filteredStudents = students.filter(student =>
    student.user__first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user__last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user__email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour filtrer les administrateurs selon le terme de recherche
  const filteredAdmins = admins.filter(admin =>
    admin.user__first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.user__last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.user__email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mettre à jour le statut d'une candidature
  const handleApplicationStatusChange = async (appId, newStatus) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      await axios.patch(`http://localhost:8000/api/applications/${appId}/status/`, {
        status: newStatus
      }, { headers });
      setApplications(prev =>
        prev.map(app =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  // Supprimer un étudiant
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

  // Supprimer un administrateur
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

  // Ajouter un administrateur
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

  // Déconnexion
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Gestion de la navigation
  const handleNavigation = (itemId) => {
    if (itemId === 'logout') {
      handleLogout();
    } else {
      setActiveTab(itemId);
      setSearchTerm(''); 
      if (itemId === 'notifications') {
        markNotificationsAsRead();
      }
    }
  };

  // Chargement initial des données
  useEffect(() => {
    const authUserLocal = localStorage.getItem("auth_user");
    const authUserSession = sessionStorage.getItem("auth_user");
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

    if (!authUser || !authUser.email) {
      navigate('/login');
      return;
    }

    const userRole = (authUser.role || '').toLowerCase().trim();
    if (userRole !== 'admin' && userRole !== 'administrateur') {
      navigate('/welcome-etudiant');
      return;
    }

    setUserInfo(authUser);
    fetchData();
    fetchApplications();
  }, [navigate]);

  // Composant ApplicationDetail avec vue complète
  const ApplicationDetail = ({ application, onClose, onStatusChange }) => {
    const formData = application.formData || {};
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="application-detail-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Candidature #{application.applicationId} - Détails Complets</h3>
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className="modal-content">
            {/* Informations Générales */}
            <div className="detail-section">
              <h4><User size={18} /> Informations Générales</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">ID Candidature:</span>
                  <span className="value">{application.applicationId}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Programme:</span>
                  <span className="value">{application.program}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Université:</span>
                  <span className="value">{application.university}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Statut:</span>
                  <span className={`value status-${application.status}`}>
                    {application.status === 'sent' ? 'Envoyée' :
                     application.status === 'reviewing' ? 'En examen' :
                     application.status === 'approved' ? 'Approuvée' : 'Rejetée'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Date de soumission:</span>
                  <span className="value">
                    {new Date(application.submissionDate).toLocaleDateString('fr-FR')} à {' '}
                    {new Date(application.submissionDate).toLocaleTimeString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="detail-section">
              <h4><User size={18} /> Coordonnées</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{formData.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Téléphone:</span>
                  <span className="value">{formData.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="label">WhatsApp:</span>
                  <span className="value">{formData.whatsapp || 'Non fourni'}</span>
                </div>
              </div>
            </div>

            {/* Informations Personnelles */}
            <div className="detail-section">
              <h4><User size={18} /> Informations Personnelles</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Nom complet:</span>
                  <span className="value">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date de naissance:</span>
                  <span className="value">{formData.dob}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Lieu de naissance:</span>
                  <span className="value">{formData.placeOfBirth}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Genre:</span>
                  <span className="value">{formData.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="label">État civil:</span>
                  <span className="value">{formData.maritalStatus}</span>
                </div>
                <div className="detail-item">
                  <span className="label">N° Passeport:</span>
                  <span className="value">{formData.passportNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Expiration passeport:</span>
                  <span className="value">{formData.passportExpiry}</span>
                </div>
              </div>
            </div>

            {/* Compétences Linguistiques */}
            <div className="detail-section">
              <h4><GraduationCap size={18} /> Compétences Linguistiques</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Niveau d'anglais:</span>
                  <span className="value">{formData.englishLevel}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Certificat d'anglais:</span>
                  <span className="value">{formData.englishCertificate}</span>
                </div>
                {formData.certificateScore && (
                  <div className="detail-item">
                    <span className="label">Score:</span>
                    <span className="value">{formData.certificateScore}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Adresse */}
            <div className="detail-section">
              <h4>📍 Adresse</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Pays:</span>
                  <span className="value">{formData.country}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="label">Adresse complète:</span>
                  <span className="value">{formData.fullAddress}</span>
                </div>
              </div>
            </div>

            {/* Formation */}
            <div className="detail-section">
              <h4><GraduationCap size={18} /> Formation</h4>
              {formData.educationalBackground?.map((edu, index) => (
                <div key={index} className="education-item">
                  <h5>Formation #{index + 1}</h5>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">École/Université:</span>
                      <span className="value">{edu.school}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Spécialité:</span>
                      <span className="value">{edu.major || 'Non spécifiée'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Date de début:</span>
                      <span className="value">{edu.startDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Date de fin:</span>
                      <span className="value">{edu.finishDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Note/Mention:</span>
                      <span className="value">{edu.grade || 'Non fournie'}</span>
                    </div>
                  </div>
                </div>
              )) || <p>Aucune formation renseignée</p>}
            </div>

            {/* Expérience Professionnelle */}
            <div className="detail-section">
              <h4>💼 Expérience Professionnelle</h4>
              {formData.workExperience?.map((work, index) => (
                <div key={index} className="work-item">
                  <h5>Expérience #{index + 1}</h5>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Employeur:</span>
                      <span className="value">{work.employer}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Poste:</span>
                      <span className="value">{work.jobTitle}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Date de début:</span>
                      <span className="value">{work.startDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Date de fin:</span>
                      <span className="value">{work.endDate || 'En cours'}</span>
                    </div>
                  </div>
                </div>
              )) || <p>Aucune expérience professionnelle renseignée</p>}
            </div>

            {/* Contacts Familiaux */}
            <div className="detail-section">
              <h4>👨‍👩‍👧‍👦 Contacts Familiaux</h4>
              {formData.familyContacts?.map((contact, index) => (
                <div key={index} className="family-item">
                  <h5>Contact #{index + 1}</h5>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Nom:</span>
                      <span className="value">{contact.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Nationalité:</span>
                      <span className="value">{contact.nationality}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span className="value">{contact.email || 'Non fourni'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Lieu de travail:</span>
                      <span className="value">{contact.workplace || 'Non fourni'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Poste:</span>
                      <span className="value">{contact.position || 'Non fourni'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Relation:</span>
                      <span className="value">{contact.relationship}</span>
                    </div>
                  </div>
                </div>
              )) || <p>Aucun contact familial renseigné</p>}
            </div>

            {/* Garant Financier */}
            <div className="detail-section">
              <h4>💰 Garant Financier</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Relation:</span>
                  <span className="value">{formData.guarantorRelationship}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Nom:</span>
                  <span className="value">{formData.guarantorName}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pays:</span>
                  <span className="value">{formData.guarantorCountry}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="label">Adresse:</span>
                  <span className="value">{formData.guarantorAddress}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{formData.guarantorEmail || 'Non fourni'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Lieu de travail:</span>
                  <span className="value">{formData.guarantorWorkplace || 'Non fourni'}</span>
                </div>
                {formData.guarantorWorkplaceAddress && (
                  <div className="detail-item full-width">
                    <span className="label">Adresse du travail:</span>
                    <span className="value">{formData.guarantorWorkplaceAddress}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact d'Urgence en Chine */}
            <div className="detail-section">
              <h4>🚨 Contact d'Urgence en Chine</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="label">Nom:</span>
                  <span className="value">{formData.emergencyName || 'Non fourni'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pays:</span>
                  <span className="value">{formData.emergencyCountry}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{formData.emergencyEmail || 'Non fourni'}</span>
                </div>
                {formData.emergencyAddress && (
                  <div className="detail-item full-width">
                    <span className="label">Adresse:</span>
                    <span className="value">{formData.emergencyAddress}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Déclarations et Accords */}
            <div className="detail-section">
              <h4>✅ Déclarations et Accords</h4>
              <div className="agreements-list">
                <div className="agreement-item">
                  <span className="agreement-label">Conditions générales:</span>
                  <span className={`agreement-status ${formData.acknowledgment ? 'accepted' : 'declined'}`}>
                    {formData.acknowledgment ? '✓ Accepté' : '✗ Non accepté'}
                  </span>
                </div>
                <div className="agreement-item">
                  <span className="agreement-label">Consentement données:</span>
                  <span className={`agreement-status ${formData.consent ? 'accepted' : 'declined'}`}>
                    {formData.consent ? '✓ Accepté' : '✗ Non accepté'}
                  </span>
                </div>
                <div className="agreement-item">
                  <span className="agreement-label">Exactitude des informations:</span>
                  <span className={`agreement-status ${formData.accuracy ? 'accepted' : 'declined'}`}>
                    {formData.accuracy ? '✓ Accepté' : '✗ Non accepté'}
                  </span>
                </div>
                <div className="agreement-item">
                  <span className="agreement-label">Politique de paiement:</span>
                  <span className={`agreement-status ${formData.paymentPolicy ? 'accepted' : 'declined'}`}>
                    {formData.paymentPolicy ? '✓ Accepté' : '✗ Non accepté'}
                  </span>
                </div>
                <div className="agreement-item">
                  <span className="agreement-label">Politique de remboursement:</span>
                  <span className={`agreement-status ${formData.refundPolicy ? 'accepted' : 'declined'}`}>
                    {formData.refundPolicy ? '✓ Accepté' : '✗ Non accepté'}
                  </span>
                </div>
                <div className="agreement-item">
                  <span className="agreement-label">Conformité:</span>
                  <span className={`agreement-status ${formData.compliance ? 'accepted' : 'declined'}`}>
                    {formData.compliance ? '✓ Accepté' : '✗ Non accepté'}
                  </span>
                </div>
              </div>
            </div>

{/* Documents */}
<div className="detail-section">
  <h4><FileText size={18} /> Documents Fournis</h4>
  <div className="documents-list">
    {Object.entries(application.formData.documents || {}).map(([docType, file]) => {
      const docLabels = {
        passportPages: 'Pages de passeport',
        academicCertificate: 'Certificat académique',
        academicTranscript: 'Relevé de notes',
        languageCertificate: 'Certificat de langue',
        medicalExam: 'Examen médical',
        criminalRecord: 'Casier judiciaire',
        bankStatement: 'Relevé bancaire',
        personalPhoto: 'Photo personnelle',
        resume: 'CV',
        awards: 'Certificats de prix',
        parentsId: 'ID des parents'
      };

      // Vérifier si le fichier est un objet vide ou null
      const isFileEmpty = !file || (typeof file === 'object' && Object.keys(file).length === 0);

      // Si c'est un chemin de fichier (string), construire l'URL
      const fileUrl = typeof file === "string" && file.trim() !== ""
        ? `http://localhost:8000/media/${file.startsWith('uploads/') ? file : `uploads/${file}`}`
        : null;

      return (
        <div key={docType} className="document-status-item">
          <span className="doc-label">{docLabels[docType] || docType}:</span>
          <span className={`doc-status ${!isFileEmpty ? 'provided' : 'missing'}`}>
            {!isFileEmpty ? '✓ Fourni' : '✗ Manquant'}
          </span>
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
            >
              Voir le document
            </a>
          )}
        </div>
      );
    })}
  </div>
</div>



            {/* Informations de révision (si disponibles) */}
            {application.reviewedBy && (
              <div className="detail-section">
                <h4>📝 Informations de Révision</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Révisé par:</span>
                    <span className="value">{application.reviewedBy}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Date de révision:</span>
                    <span className="value">
                      {new Date(application.reviewedDate).toLocaleDateString('fr-FR')} à {' '}
                      {new Date(application.reviewedDate).toLocaleTimeString('fr-FR')}
                    </span>
                  </div>
                  {application.notes && (
                    <div className="detail-item full-width">
                      <span className="label">Notes:</span>
                      <span className="value">{application.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
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
                  <Check size={16} /> Approuver
                </button>
                <button
                  className="action-btn reject-btn"
                  onClick={() => {
                    onStatusChange(application.id, 'rejected');
                    onClose();
                  }}
                >
                  <X size={16} /> Rejeter
                </button>
              </>
            )}
            <button className="cancel-btn" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    );
  };

// Composant pour gérer les candidatures
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
                    <div className="student-avatar">{app.userName?.charAt(0) || 'U'}</div>
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
                    <button className="view-btn" onClick={() => handleView(app)}>
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
                  <span className="nav-label" style={{ color: item.color }}>{item.label}</span>
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
                  <span className="nav-label" style={{ color: item.color }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="admin-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="dashboard-title">
                Dashboard Admin
              </h1>
              <p className="welcome-text">
                Bienvenue <strong>{userInfo.firstName} {userInfo.lastName}</strong>
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
            <div className="stat-content">
              <h3>Administrateurs</h3>
              <p className="stat-number">{admins.length}</p>
              <span className="stat-label">Membres de l'équipe</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'students' && (
            <div className="students-section">
              <div className="section-header">
                <h2>Liste des Étudiants</h2>
                <div className="search-bar">
                  <div className="search-input-container">
                    <Search className="search-icon" size={20} />
                    <input
                      type="text"
                      placeholder="Search a student..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {filteredStudents.length === 0 ? (
                <div className="empty-state">
                  <h3>No Student Found</h3>
                  <p>{searchTerm ? "Aucun résultat pour cette recherche" : "Les nouveaux étudiants apparaîtront ici"}</p>
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
                      {filteredStudents.map((student) => (
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
                              Supprimer
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
                  <div className="search-input-container">
                    <Search className="search-icon" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher un administrateur..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {filteredAdmins.length === 0 ? (
                <div className="empty-state">
                  <h3>Aucun administrateur trouvé</h3>
                  <p>{searchTerm ? "Aucun résultat pour cette recherche" : "Les nouveaux administrateurs apparaîtront ici"}</p>
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
                      {filteredAdmins.map((admin) => (
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
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

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
                    Créer l'administrateur
                  </button>
                </form>
              </div>
            </div>
          )}

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

          {activeTab === 'notifications' && (
            <div className="notifications-section">
              <div className="section-header">
                <h2>Notifications</h2>
                {notifications.length > 0 && (
                  <button className="clear-btn" onClick={clearAllNotifications}>
                    Effacer tout
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p>Aucune notification</p>
              ) : (
                <ul className="notifications-list">
                  {notifications.map((n, i) => (
                    <li key={i} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
                      <div className="notif-message">{n.message}</div>
                      <div className="notif-time">{n.date} {n.time}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;