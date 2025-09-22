import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  FileText,
  Bell,
  LogOut,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Check,
  X
} from 'lucide-react';
import "../styles/WelcomeAdmin.css";
import logo from '../assets/diravenir.png';

const WelcomeAdmin = () => {
  // States
  const [userInfo, setUserInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Navigation items for the sidebar
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#541652' },
    { id: 'students', label: 'Students', icon: User, color: '#541652' },
    { id: 'admins', label: 'Admins', icon: User, color: '#541652' },
    { id: 'applications', label: 'Applications', icon: FileText, color: '#541652' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: '#541652', badge: unreadCount },
  ];

  // Bottom navigation items
  const bottomNavigationItems = [
    { id: 'logout', label: 'Log Out', icon: LogOut, color: '#ef4444' },
  ];

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      const response = await axios.get("http://localhost:8000/api/applications/all/", { headers });
      setApplications(response.data);
      generateNotificationsFromApplications(response.data);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  // Generate notifications from applications
  const generateNotificationsFromApplications = (apps) => {
    const savedNotifications = JSON.parse(localStorage.getItem('adminNotifications')) || [];
    const dismissed = JSON.parse(localStorage.getItem('adminDismissedNotifications')) || [];
    const newNotifications = [...savedNotifications];
    apps.forEach(app => {
      const notifKey = `app-${app.id}-sent`;
      if (app.status === "sent" && !savedNotifications.find(n => n.key === notifKey) && !dismissed.includes(notifKey)) {
        newNotifications.push({
          key: notifKey,
          applicationId: app.id,
          message: `New application submitted by ${app.userName || app.userEmail}`,
          date: new Date().toLocaleDateString("en-US"),
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        });
      }
    });
    localStorage.setItem('adminNotifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.filter(n => !n.read).length);
  };

  // Mark notifications as read
  const markNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('adminNotifications', JSON.stringify(updated));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    const dismissed = notifications.map(n => n.key);
    localStorage.setItem('adminDismissedNotifications', JSON.stringify(dismissed));
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem('adminNotifications', JSON.stringify([]));
  };

  // Mark single notification as read
  const markSingleNotificationAsRead = (key) => {
    const updated = notifications.map(n =>
      n.key === key ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem('adminNotifications', JSON.stringify(updated));
  };

  // Fetch data (students and admins)
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
      console.error('Error loading data:', error);
      setIsLoading(false);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.user__first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user__last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user__email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin =>
    admin.user__first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.user__last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.user__email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter applications based on selected filter
  const filteredApplications = applications.filter(app => {
    if (applicationFilter === 'all') return true;
    return app.status === applicationFilter;
  });

  // Update application status
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
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Do you really want to delete this student?")) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      await axios.delete(`http://localhost:8000/api/students/${id}/delete/`, { headers });
      fetchData();
      alert('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting student');
    }
  };

  // Delete an admin
  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Do you really want to delete this admin?")) return;
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = token ? { 'Authorization': `Token ${token}` } : {};
      await axios.delete(`http://localhost:8000/api/admins/${id}/delete/`, { headers });
      fetchData();
      alert('Admin deleted successfully');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error deleting admin');
    }
  };

  // Add an admin
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
      alert("New admin added!");
      e.target.reset();
      fetchData();
    } catch (error) {
      console.error('Error adding:', error);
      alert('Error adding admin');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Navigation handling
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

  // Initial data loading
  useEffect(() => {
    const authUserLocal = localStorage.getItem("auth_user");
    const authUserSession = sessionStorage.getItem("auth_user");
    let authUser = null;
    if (authUserLocal) {
      try {
        authUser = JSON.parse(authUserLocal);
      } catch (error) {
        console.error('Error parsing localStorage:', error);
      }
    } else if (authUserSession) {
      try {
        authUser = JSON.parse(authUserSession);
      } catch (error) {
        console.error('Error parsing sessionStorage:', error);
      }
    }
    if (!authUser || !authUser.email) {
      navigate('/login');
      return;
    }
    const userRole = (authUser.role || '').toLowerCase().trim();
    if (userRole !== 'admin' && userRole !== 'administrateur') {
      navigate('/welcome-student');
      return;
    }
    setUserInfo(authUser);
    fetchData();
    fetchApplications();
  }, [navigate]);

// Enhanced ApplicationDetail component avec affichage réorganisé
const ApplicationDetail = ({ application, onClose, onStatusChange }) => {
  const formData = application.formData || {};
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="application-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📋 Application #{application.id} - Full Details</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-content">
          {/* Section 1: Informations Générales */}
          <div className="detail-section">
            <h4><User size={18} />General Information</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">ID Application</span>
                  <span className="detail-value">{application.id}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Program</span>
                  <span className="detail-value">{application.program}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">University</span>
                  <span className="detail-value">{application.university}</span>
                </div>
                <div className="detail-card status-card">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value status-badge-large status-${application.status}`}>
                    {application.status === 'sent' ? 'Sent' :
                     application.status === 'reviewing' ? 'Reviewing' :
                     application.status === 'approved' ? 'Approuved' : 'Rejected'}
                  </span>
                </div>
                <div className="detail-card full-width">
                  <span className="detail-label">Submission date</span>
                  <span className="detail-value">
                    {new Date(application.submissionDate).toLocaleDateString('en')} at {' '}
                    {new Date(application.submissionDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Informations Personnelles */}
          <div className="detail-section">
            <h4><User size={18} /> Personal Information</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">First name</span>
                  <span className="detail-value">{formData.firstName || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Last name</span>
                  <span className="detail-value">{formData.lastName || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Birth date</span>
                  <span className="detail-value">{formData.dob || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Place of birth</span>
                  <span className="detail-value">{formData.placeOfBirth || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{formData.gender || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Statut matrimonial</span>
                  <span className="detail-value">{formData.maritalStatus || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Informations de Contact */}
          <div className="detail-section">
            <h4>📞 Contact Information</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">Email adress</span>
                  <span className="detail-value">{formData.email || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">phone number</span>
                  <span className="detail-value">{formData.phone || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">WhatsApp number</span>
                  <span className="detail-value">{formData.whatsapp || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">country</span>
                  <span className="detail-value">{formData.country || 'Not provided'}</span>
                </div>
                <div className="detail-card full-width">
                  <span className="detail-label">full address</span>
                  <span className="detail-value">{formData.fullAddress || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Informations Passeport */}
          <div className="detail-section">
            <h4>🛂 Passeport information</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">passeport number</span>
                  <span className="detail-value">{formData.passportNumber || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">passeport expiry date</span>
                  <span className="detail-value">{formData.passportExpiry || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Compétences Linguistiques */}
          <div className="detail-section">
            <h4><GraduationCap size={18} /> Language Skills</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">English level</span>
                  <span className="detail-value">{formData.englishLevel || 'Not specified'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">English Certificate</span>
                  <span className="detail-value">{formData.englishCertificate || 'Not specified'}</span>
                </div>
                {formData.certificateScore && (
                  <div className="detail-card">
                    <span className="detail-label">Score</span>
                    <span className="detail-value">{formData.certificateScore}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 6: Formation Académique */}
          <div className="detail-section">
            <h4><GraduationCap size={18} /> Educational Background</h4>
            <div className="detail-section-content">
              {formData.educationalBackground?.length > 0 ? (
                <div className="education-list">
                  {formData.educationalBackground.map((edu, index) => (
                    <div key={index} className="education-card">
                      <div className="education-header">
                        <h5>Formation #{index + 1}</h5>
                      </div>
                      <div className="detail-grid-enhanced">
                        <div className="detail-card">
                          <span className="detail-label">School/Institution</span>
                          <span className="detail-value">{edu.school || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Major/Field of Study</span>
                          <span className="detail-value">{edu.major || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Start Date</span>
                          <span className="detail-value">{edu.startDate || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Finish Date</span>
                          <span className="detail-value">{edu.finishDate || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Grade/GPA</span>
                          <span className="detail-value">{edu.grade || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data-message">
                  <p>No academic background information provided</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 7: Expérience Professionnelle */}
          <div className="detail-section">
            <h4>💼 Work Experience</h4>
            <div className="detail-section-content">
              {formData.workExperience?.length > 0 ? (
                <div className="work-list">
                  {formData.workExperience.map((work, index) => (
                    <div key={index} className="work-card">
                      <div className="work-header">
                        <h5>Experience #{index + 1}</h5>
                      </div>
                      <div className="detail-grid-enhanced">
                        <div className="detail-card">
                          <span className="detail-label">Employer/Company</span>
                          <span className="detail-value">{work.employer || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Job Title/Position</span>
                          <span className="detail-value">{work.jobTitle || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Start Date</span>
                          <span className="detail-value">{work.startDate || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">end Date</span>
                          <span className="detail-value">{work.endDate || 'In progress'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data-message">
                  <p>No professional experience provided</p>
                </div>
              )}
            </div>
          </div>



           {/* Section 8: Contacts Familiaux */}
          <div className="detail-section">
            <h4>👨‍👩‍👧‍👦 Family Contacts</h4>
            <div className="detail-section-content">
              {formData.familyContacts?.length > 0 ? (
                <div className="family-list">
                  {formData.familyContacts.map((contact, index) => (
                    <div key={index} className="family-card">
                      <div className="family-header">
                        <h5>Contact #{index + 1}</h5>
                      </div>
                      <div className="detail-grid-enhanced">
                        <div className="detail-card">
                          <span className="detail-label">full name</span>
                          <span className="detail-value">{contact.name || 'Not provided'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Nationality</span>
                          <span className="detail-value">{contact.nationality || 'Not provided'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Relationship</span>
                          <span className="detail-value">{contact.relationship || 'Not specified'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Email address</span>
                          <span className="detail-value">{contact.email || 'Not provided'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Workplace</span>
                          <span className="detail-value">{contact.workplace || 'Not provided'}</span>
                        </div>
                        <div className="detail-card">
                          <span className="detail-label">Job Title/Position</span>
                          <span className="detail-value">{contact.position || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data-message">
                  <p>No family contact provided</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 9: Garant Financier */}
          <div className="detail-section">
            <h4>💰 Financial Guarantor</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">Relationship</span>
                  <span className="detail-value">{formData.guarantorRelationship || 'Not specified'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">full name</span>
                  <span className="detail-value">{formData.guarantorName || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">country</span>
                  <span className="detail-value">{formData.guarantorCountry || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Email address</span>
                  <span className="detail-value">{formData.guarantorEmail || 'Not provided'}</span>
                </div>
                <div className="detail-card full-width">
                  <span className="detail-label">full Address</span>
                  <span className="detail-value">{formData.guarantorAddress || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Workplace</span>
                  <span className="detail-value">{formData.guarantorWorkplace || 'Not provided'}</span>
                </div>
                {formData.guarantorWorkplaceAddress && (
                  <div className="detail-card full-width">
                    <span className="detail-label">Workplace address</span>
                    <span className="detail-value">{formData.guarantorWorkplaceAddress}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 10: Contact d'Urgence en Chine */}
          <div className="detail-section">
            <h4>🚨 Emergency Contact in China</h4>
            <div className="detail-section-content">
              <div className="detail-grid-enhanced">
                <div className="detail-card">
                  <span className="detail-label">full name</span>
                  <span className="detail-value">{formData.emergencyName || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Country</span>
                  <span className="detail-value">{formData.emergencyCountry || 'Not provided'}</span>
                </div>
                <div className="detail-card">
                  <span className="detail-label">Email address</span>
                  <span className="detail-value">{formData.emergencyEmail || 'Not provided'}</span>
                </div>
                {formData.emergencyAddress && (
                  <div className="detail-card full-width">
                    <span className="detail-label">full Address</span>
                    <span className="detail-value">{formData.emergencyAddress}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 11: Documents Fournis */}
          <div className="detail-section">
            <h4><FileText size={18} /> Documents Provided</h4>
            <div className="detail-section-content">
              <div className="documents-grid">
                {Object.entries(application.formData.documents || {}).map(([docType, file]) => {
                  const docLabels = {
                    passportPages: 'Passport Pages',
                    academicCertificate: 'Academic Certificate',
                    academicTranscript: 'Academic Transcript',
                    languageCertificate: 'Language Certificate',
                    medicalExam: 'Medical Exam',
                    criminalRecord: 'Criminal Record',
                    bankStatement: 'Bank Statement',
                    personalPhoto: 'Personal Photo',
                    resume: 'Resume',
                    awards: 'Awards',
                    parentsId: 'Parents Id'
                  };

                  const isFileEmpty = !file || (typeof file === 'object' && Object.keys(file).length === 0);
                  const fileUrl = typeof file === "string" && file.trim() !== ""
                    ? `http://localhost:8000/media/${file.startsWith('uploads/') ? file : `uploads/${file}`}`
                    : null;

                  return (
                    <div key={docType} className="document-card">
                      <div className="document-header">
                        <span className="document-name">{docLabels[docType] || docType}</span>
                        <span className={`document-status ${!isFileEmpty ? 'provided' : 'missing'}`}>
                          {!isFileEmpty ? '✓ Provided' : '✗ Missing'}
                        </span>
                      </div>
                      {fileUrl && (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          📄 See the Document
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 12: Déclarations et Accords */}
          <div className="detail-section">
            <h4>✅ declaration and agreement</h4>
            <div className="detail-section-content">
              <div className="agreements-grid">
                <div className="agreement-card">
                  <span className="agreement-name">General Conditions</span>
                  <span className={`agreement-status ${formData.acknowledgment ? 'accepted' : 'declined'}`}>
                    {formData.acknowledgment ? '✓ Accepted' : '✗ Not accepted'}
                  </span>
                </div>
                <div className="agreement-card">
                  <span className="agreement-name">Data Consent</span>
                  <span className={`agreement-status ${formData.consent ? 'accepted' : 'declined'}`}>
                    {formData.consent ? '✓ Accepted' : '✗ Not accepted'}
                  </span>
                </div>
                <div className="agreement-card">
                  <span className="agreement-name">Accuracy of Information</span>
                  <span className={`agreement-status ${formData.accuracy ? 'accepted' : 'declined'}`}>
                    {formData.accuracy ? '✓ Accepted' : '✗ Not accepted'}
                  </span>
                </div>
                <div className="agreement-card">
                  <span className="agreement-name">Payment Policy</span>
                  <span className={`agreement-status ${formData.paymentPolicy ? 'accepted' : 'declined'}`}>
                    {formData.paymentPolicy ? '✓ Accepted' : '✗ Not accepted'}
                  </span>
                </div>
                <div className="agreement-card">
                  <span className="agreement-name">Refund Policy</span>
                  <span className={`agreement-status ${formData.refundPolicy ? 'accepted' : 'declined'}`}>
                    {formData.refundPolicy ? '✓ Accepted' : '✗ Not accepted'}
                  </span>
                </div>
                <div className="agreement-card">
                  <span className="agreement-name">Compliance</span>
                  <span className={`agreement-status ${formData.compliance ? 'accepted' : 'declined'}`}>
                    {formData.compliance ? '✓ Accepted' : '✗ Not accepted'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 13: Informations de Révision (si disponible) */}
          {application.reviewedBy && (
            <div className="detail-section">
              <h4>📝 Review Information</h4>
              <div className="detail-section-content">
                <div className="detail-grid-enhanced">
                  <div className="detail-card">
                    <span className="detail-label">Reviewed by</span>
                    <span className="detail-value">{application.reviewedBy}</span>
                  </div>
                  <div className="detail-card">
                    <span className="detail-label">Revision date</span>
                    <span className="detail-value">
                      {new Date(application.reviewedDate).toLocaleDateString('en')} at {' '}
                      {new Date(application.reviewedDate).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {application.notes && (
                    <div className="detail-card full-width">
                      <span className="detail-label">Notes</span>
                      <span className="detail-value">{application.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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
                <Check size={16} /> Approve
              </button>
              <button
                className="action-btn reject-btn"
                onClick={() => {
                  onStatusChange(application.id, 'rejected');
                  onClose();
                }}
              >
                <X size={16} /> Dismiss
              </button>
            </>
          )}
          <button className="cancel-btn" onClick={onClose}>Close</button>
        </div>
        </div>



      </div>
    </div>
  );
};

  // Enhanced Application Manager Component
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
          <h2>Applications Management</h2>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${applicationFilter === 'all' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('all')}
            >
              All ({applications.length})
            </button>
            <button
              className={`filter-tab ${applicationFilter === 'sent' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('sent')}
            >
              Sent ({applications.filter(a => a.status === 'sent').length})
            </button>
            <button
              className={`filter-tab ${applicationFilter === 'reviewing' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('reviewing')}
            >
              Under Review ({applications.filter(a => a.status === 'reviewing').length})
            </button>
            <button
              className={`filter-tab ${applicationFilter === 'approved' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('approved')}
            >
              Approved ({applications.filter(a => a.status === 'approved').length})
            </button>
            <button
              className={`filter-tab ${applicationFilter === 'rejected' ? 'active' : ''}`}
              onClick={() => setApplicationFilter('rejected')}
            >
              Rejected ({applications.filter(a => a.status === 'rejected').length})
            </button>
          </div>
        </div>
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} color="#9CA3AF" />
            <h3>No applications</h3>
            <p>No applications found for this filter.</p>
          </div>
        ) : (
          <div className="applications-table">
            <div className="table-header">
              <div className="header-cell">Student</div>
              <div className="header-cell">Program</div>
              <div className="header-cell">Date</div>
              <div className="header-cell">Status</div>
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
                    {new Date(app.submissionDate).toLocaleDateString('en-US')}
                    <div className="time-info">
                      {new Date(app.submissionDate).toLocaleTimeString('en-US', {
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
                      {app.status === 'sent' ? 'Sent' :
                       app.status === 'reviewing' ? 'Under Review' :
                       app.status === 'approved' ? 'Approved' : 'Rejected'}
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
        <p>Loading dashboard...</p>
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
        {/* Header only for the Dashboard tab */}
        {activeTab === 'dashboard' && (
          <header className="admin-header">
            <div className="header-content">
              <div className="header-left">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <p className="welcome-text">
                  Welcome <strong>{userInfo.firstName} {userInfo.lastName}</strong>
                </p>
              </div>
              <div className="header-right">
                <div className="user-avatar">
                  {userInfo.firstName?.charAt(0)}{userInfo.lastName?.charAt(0)}
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Content rendering based on active tab */}
        {activeTab === 'admins' ? (
          <div className="admins-container">
            <div className="card admins-list-card">
              <div className="section-header">
                <h2>Admins List</h2>
                <div className="search-bar">
                  <div className="search-input-container">
                    <Search className="search-icon" size={20} />
                    <input
                      type="text"
                      placeholder="Search for an admin..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {filteredAdmins.length === 0 ? (
                <div className="empty-state">
                  <h3>No admins found</h3>
                  <p>{searchTerm ? "No results for this search" : "New admins will appear here"}</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmins.map((admin) => (
                        <tr key={admin.user__id}>
                          <td>
                            <div>
                              <strong>{admin.user__first_name} {admin.user__last_name}</strong>
                            </div>
                          </td>
                          <td>{admin.user__email}</td>
                          <td>
                            <button onClick={() => handleDeleteAdmin(admin.user__id)} className="action-btn delete">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="card create-admin-card">
              <div className="section-header">
                <h2>Create a New Admin</h2>
                <p>Add a member to your admin team</p>
              </div>
              <form onSubmit={handleAddAdmin} className="modern-form">
                <div className="form-grid">
                  <div className="form-group1">
                    <label htmlFor="prenom">First Name</label>
                    <input type="text" id="prenom" name="prenom" placeholder="Enter first name" required />
                  </div>
                  <div className="form-group1">
                    <label htmlFor="nom">Last Name</label>
                    <input type="text" id="nom" name="nom" placeholder="Enter last name" required />
                  </div>
                  <div className="form-group1">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="admin@example.com" required />
                  </div>
                  <div className="form-group1">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Secure password" required />
                  </div>
                </div>
                <button type="submit" className="submit-btn">Create Admin</button>
              </form>
            </div>
          </div>
        ) : activeTab === 'notifications' ? (
          <div className="notifications-section">
            <div className="notifications-header">
              <h2>Notifications</h2>
              {notifications.length > 0 && (
                <button className="clear-btn" onClick={clearAllNotifications}>
                  Clear All
                </button>
              )}
            </div>
            <div className="notifications-card">
              {notifications.length === 0 ? (
                <div className="empty-notifications">
                  You have no new notifications
                </div>
              ) : (
                <ul className="notifications-list">
                  {notifications.map((n, i) => (
                    <li key={i} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
                      <div className="notification-icon">
                        {n.read ? "📬" : "🔔"}
                      </div>
                      <div className="notification-content">
                        <div className="notif-message">{n.message}</div>
                        <div className="notif-time">{n.time} • {n.date}</div>
                      </div>
                      {!n.read && (
                        <div className="notification-actions">
                          <button
                            className="mark-read-btn"
                            onClick={() => markSingleNotificationAsRead(n.key)}
                          >
                            Mark as read
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : activeTab === 'dashboard' ? (
          <div className="dashboard-overview">
            <div className="stats-section">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>Students</h3>
                  <p className="stat-numbers">{students.length}</p>
                  <span className="stat-label">Total registered</span>
                </div>
              </div>
              <div className="stat-card secondary">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3>Admins</h3>
                  <p className="stat-numbers">{admins.length}</p>
                  <span className="stat-label">Team members</span>
                </div>
              </div>
              <div className="stat-card primary">
                <div className="stat-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>                </div>
                <div className="stat-content">
                  <h3>Total Applications</h3>
                  <p className="stat-numbers">{applications.length}</p>
                  <span className="stat-label">All applications</span>
                </div>
              </div>
            <div className="stat-card primary">
                <div className="stat-icon">
<svg width="32" height="32" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M20 6L9 17l-5-5" />
</svg>
                </div>
                <div className="stat-content">
                  <h3>Approved</h3>
                  <p className="stat-numbers">{applications.filter(app => app.status === 'approved').length}</p>
                  <span className="stat-label">Applications approved</span>
                </div>
              </div>                            <div className="stat-card primary">
                <div className="stat-icon">
 <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>

                </div>
                <div className="stat-content">
                  <h3>Under Review</h3>
                  <p className="stat-numbers">{applications.filter(app => app.status === 'reviewing').length}</p>
                  <span className="stat-label">Currently under review</span>
                </div>
              </div>
              <div className="stat-card primary">
                <div className="stat-icon">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>

                </div>
                <div className="stat-content">
                  <h3>Rejected</h3>
                  <p className="stat-numbers">{applications.filter(app => app.status === 'rejected').length}</p>
                  <span className="stat-label">Applications rejected</span>
                </div>
              </div>
            <div className="stat-card primary">
                <div className="stat-icon">
<svg width="32" height="32" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
</svg>

                </div>
                <div className="stat-content">
                  <h3>Received</h3>
                  <p className="stat-numbers">{applications.filter(app => app.status === 'sent').length}</p>
                  <span className="stat-label">Applications received</span>
                </div>
              </div>
            </div>              
          </div>
        ) : (
          <div className="content-area">
            {activeTab === 'students' && (
              <div className="students-section">
                <div className="section-header">
                  <h2>Students List</h2>
                  <div className="search-bar">
                    <div className="search-input-container">
                      <Search className="search-icon" size={20} />
                      <input
                        type="text"
                        placeholder="Search for a student..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {filteredStudents.length === 0 ? (
                  <div className="empty-state">
                    <h3>No students found</h3>
                    <p>{searchTerm ? "No results for this search" : "New students will appear here"}</p>
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => (
                          <tr key={student.user__id}>
                            <td>
                              <div>
                                <strong>{student.user__first_name} {student.user__last_name}</strong>
                              </div>
                            </td>
                            <td>{student.user__email}</td>
                            <td>
                              <button onClick={() => handleDeleteStudent(student.user__id)} className="action-btn delete">
                                Delete
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
        )}
      </div>
    </div>
  );
};

export default WelcomeAdmin;