import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X, Plus, CheckCircle, ArrowLeft, ChevronDown } from "lucide-react";
import axios from "axios";
import '../styles/ApplicationForm.css'

function ApplicationForm() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [globalError, setGlobalError] = useState("");

  const getAuthData = () => {
    const localAuthUser = localStorage.getItem("auth_user");
    const sessionAuthUser = sessionStorage.getItem("auth_user");
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    let authUser = null;

    if (localAuthUser) {
      try {
        authUser = JSON.parse(localAuthUser);
      } catch (error) {
        console.error('Erreur parsing localStorage auth_user:', error);
      }
    } else if (sessionAuthUser) {
      try {
        authUser = JSON.parse(sessionAuthUser);
      } catch (error) {
        console.error('Erreur parsing sessionStorage auth_user:', error);
      }
    }

    return { authUser, token };
  };

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    whatsapp: "",
    firstName: "",
    lastName: "",
    dob: "",
    placeOfBirth: "",
    gender: "",
    maritalStatus: "",
    passportNumber: "",
    passportExpiry: "",
    englishLevel: "",
    englishCertificate: "",
    certificateScore: "",
    country: "",
    fullAddress: "",
    educationalBackground: [{
      school: "",
      major: "",
      startDate: "",
      finishDate: "",
      grade: ""
    }],
    workExperience: [{
      employer: "",
      jobTitle: "",
      startDate: "",
      endDate: ""
    }],
    familyContacts: [{
      name: "",
      nationality: "",
      email: "",
      workplace: "",
      position: "",
      relationship: ""
    }],
    guarantorRelationship: "",
    guarantorName: "",
    guarantorCountry: "",
    guarantorAddress: "",
    guarantorEmail: "",
    guarantorWorkplace: "",
    guarantorWorkplaceAddress: "",
    emergencyName: "",
    emergencyCountry: "",
    emergencyEmail: "",
    emergencyAddress: "",
    acknowledgment: false,
    consent: false,
    accuracy: false,
    paymentPolicy: false,
    refundPolicy: false,
    compliance: false,
    documents: {
      passportPages: null,
      academicCertificate: null,
      academicTranscript: null,
      languageCertificate: null,
      medicalExam: null,
      criminalRecord: null,
      bankStatement: null,
      personalPhoto: null,
      resume: null,
      awards: null,
      parentsId: null
    }
  });

  const [showModal, setShowModal] = useState(null);
  const [applicationId] = useState(Math.floor(Math.random() * 900000) + 100000);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { authUser, token } = getAuthData();
    if (!authUser || !token) {
      console.error('Utilisateur non authentifié');
      navigate('/login');
      return;
    }
    setFormData(prev => ({
      ...prev,
      email: authUser.email || '',
      firstName: authUser.prenom || authUser.first_name || '',
      lastName: authUser.nom || authUser.last_name || ''
    }));
  }, [navigate]);

  useEffect(() => {
    const fetchProgramDetail = async () => {
      if (!programId) {
        setError("ID du programme manquant");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8000/api/program-detail-with-similar/${programId}/`);
        setProgram(response.data.program);
      } catch (error) {
        console.error("Erreur lors du chargement du programme:", error);
        if (error.response?.status === 404) {
          setError("Programme non trouvé");
        } else if (error.response?.status >= 500) {
          setError("Erreur serveur. Veuillez réessayer plus tard.");
        } else {
          setError("Erreur lors du chargement des données");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProgramDetail();
  }, [programId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, newItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (documentType, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

const validateStep = (currentStep) => {
  const newErrors = {};

  // Fonction utilitaire pour valider l'âge minimum
  const isValidAge = (dateString) => {
    if (!dateString) return false;
    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 15;
  };

  // Fonction utilitaire pour valider le passeport
  const isValidPassport = (passport) => {
    if (!passport) return false;
    const cleanPassport = passport.replace(/\s/g, '');
    return cleanPassport.length >= 6 && cleanPassport.length <= 15 && /^[A-Z0-9]+$/.test(cleanPassport);
  };

  // Fonction utilitaire pour valider l'expiration du passeport
  const isValidPassportExpiry = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiry > sixMonthsFromNow;
  };

  // Fonction utilitaire pour valider les dates
  const isValidDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return true; // Si l'une des dates est vide, on ne valide pas ici
    return new Date(endDate) >= new Date(startDate);
  };

  // Fonction utilitaire pour valider l'email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction utilitaire pour valider le téléphone
  const isValidPhone = (phone) => {
    // Doit commencer par + suivi du code pays et être numérique après
    const phoneRegex = /^\+\d{1,4}\s?\d{8,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  switch (currentStep) {
    case 1:
      // 1) Contact Details
      if (!formData.email) {
        newErrors.email = "Email address is required";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = "Phone must start with country code (+212) and contain only numbers";
      }

      // WhatsApp n'est pas requis selon le PDF
      if (formData.whatsapp && !isValidPhone(formData.whatsapp)) {
        newErrors.whatsapp = "WhatsApp number must be in valid format (+212XXXXXXXXX)";
      }

      // 2) Student's Information
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      } else if (formData.firstName.length < 2 || formData.firstName.length > 50) {
        newErrors.firstName = "First name must be between 2 and 50 characters";
      }

      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      } else if (formData.lastName.length < 2 || formData.lastName.length > 50) {
        newErrors.lastName = "Last name must be between 2 and 50 characters";
      }

      if (!formData.dob) {
        newErrors.dob = "Date of birth is required";
      } else if (!isValidAge(formData.dob)) {
        newErrors.dob = "You must be at least 15 years old";
      }

      if (!formData.placeOfBirth) {
        newErrors.placeOfBirth = "Place of birth is required";
      }

      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }

      if (!formData.maritalStatus) {
        newErrors.maritalStatus = "Marital status is required";
      }

      if (!formData.passportNumber) {
        newErrors.passportNumber = "Passport number is required";
      } else if (!isValidPassport(formData.passportNumber)) {
        newErrors.passportNumber = "Passport must be 6-15 characters, alphanumeric only";
      }

      if (!formData.passportExpiry) {
        newErrors.passportExpiry = "Passport expiry date is required";
      } else if (!isValidPassportExpiry(formData.passportExpiry)) {
        newErrors.passportExpiry = "Passport must be valid for at least 6 months";
      }

      // 3) Language Proficiency
      if (!formData.englishLevel) {
        newErrors.englishLevel = "English level is required";
      }

      if (!formData.englishCertificate) {
        newErrors.englishCertificate = "English certificate type is required";
      }

      // Score requis seulement si certificat n'est pas "None"
      if (formData.englishCertificate && formData.englishCertificate !== 'None' && !formData.certificateScore) {
        newErrors.certificateScore = "Certificate score is required when you have a certificate";
      }

      // 4) Home Address Details
      if (!formData.country) {
        newErrors.country = "Country is required";
      }

      if (!formData.fullAddress) {
        newErrors.fullAddress = "Full address is required";
      } else if (formData.fullAddress.length < 10) {
        newErrors.fullAddress = "Please provide a complete address (street, city, province, postal code)";
      }

      // 5) Educational Background
      if (!formData.educationalBackground[0]?.school) {
        newErrors.school = "School/Institution is required";
      }

      if (!formData.educationalBackground[0]?.startDate) {
        newErrors.startDate = "Education start date is required";
      }

      if (!formData.educationalBackground[0]?.finishDate) {
        newErrors.finishDate = "Education finish date is required";
      } else if (formData.educationalBackground[0]?.startDate && 
                 !isValidDateRange(formData.educationalBackground[0].startDate, formData.educationalBackground[0].finishDate)) {
        newErrors.finishDate = "Finish date must be after start date";
      }

      // Validation pour toutes les entrées d'éducation
      formData.educationalBackground.forEach((edu, index) => {
        if (index > 0) { // Pour les entrées supplémentaires
          if (edu.school && !edu.startDate) {
            newErrors[`education_start_${index}`] = `Start date required for education entry ${index + 1}`;
          }
          if (edu.school && !edu.finishDate) {
            newErrors[`education_finish_${index}`] = `Finish date required for education entry ${index + 1}`;
          }
          if (edu.startDate && edu.finishDate && !isValidDateRange(edu.startDate, edu.finishDate)) {
            newErrors[`education_date_${index}`] = `Invalid date range for education entry ${index + 1}`;
          }
        }
      });

      // 6) Work Experience
      if (!formData.workExperience[0]?.employer) {
        newErrors.employer = "Employer is required";
      }

      if (!formData.workExperience[0]?.jobTitle) {
        newErrors.jobTitle = "Job title is required";
      }

      if (!formData.workExperience[0]?.startDate) {
        newErrors.workStart = "Work start date is required";
      }

      // Si endDate est fournie, elle doit être après startDate
      if (formData.workExperience[0]?.startDate && formData.workExperience[0]?.endDate &&
          !isValidDateRange(formData.workExperience[0].startDate, formData.workExperience[0].endDate)) {
        newErrors.workEnd = "End date must be after start date";
      }

      // Validation pour toutes les entrées de travail
      formData.workExperience.forEach((work, index) => {
        if (index > 0) { // Pour les entrées supplémentaires
          if (work.employer && !work.startDate) {
            newErrors[`work_start_${index}`] = `Start date required for work entry ${index + 1}`;
          }
          if (work.startDate && work.endDate && !isValidDateRange(work.startDate, work.endDate)) {
            newErrors[`work_date_${index}`] = `Invalid date range for work entry ${index + 1}`;
          }
        }
      });

      break;

    case 2:
      // A) Family Contact
      if (!formData.familyContacts[0]?.name) {
        newErrors.familyName = "Family contact name is required";
      } else if (formData.familyContacts[0].name.length < 2) {
        newErrors.familyName = "Family contact name must be at least 2 characters";
      }

      if (!formData.familyContacts[0]?.nationality) {
        newErrors.familyNationality = "Family contact nationality is required";
      }

      if (!formData.familyContacts[0]?.relationship) {
        newErrors.familyRelation = "Family relationship is required";
      }

      // Validation email si fourni
      if (formData.familyContacts[0]?.email && !isValidEmail(formData.familyContacts[0].email)) {
        newErrors.familyEmail = "Please enter a valid email address for family contact";
      }

      // Validation pour tous les contacts familiaux
      formData.familyContacts.forEach((contact, index) => {
        if (index > 0) { // Pour les entrées supplémentaires
          if (contact.name && !contact.nationality) {
            newErrors[`family_nationality_${index}`] = `Nationality required for family contact ${index + 1}`;
          }
          if (contact.name && !contact.relationship) {
            newErrors[`family_relationship_${index}`] = `Relationship required for family contact ${index + 1}`;
          }
          if (contact.email && !isValidEmail(contact.email)) {
            newErrors[`family_email_${index}`] = `Invalid email for family contact ${index + 1}`;
          }
        }
      });

      // B) Financial Supporter (Guarantor)
      if (!formData.guarantorRelationship) {
        newErrors.guarantorRelationship = "Guarantor relationship is required";
      }

      if (!formData.guarantorName) {
        newErrors.guarantorName = "Guarantor's full name is required";
      } else if (formData.guarantorName.length < 2) {
        newErrors.guarantorName = "Guarantor's name must be at least 2 characters";
      }

      if (!formData.guarantorCountry) {
        newErrors.guarantorCountry = "Guarantor's country is required";
      }

      if (!formData.guarantorAddress) {
        newErrors.guarantorAddress = "Guarantor's address is required";
      } else if (formData.guarantorAddress.length < 10) {
        newErrors.guarantorAddress = "Please provide a complete address for guarantor";
      }

      // Validation email guarantor si fourni
      if (formData.guarantorEmail && !isValidEmail(formData.guarantorEmail)) {
        newErrors.guarantorEmail = "Please enter a valid email address for guarantor";
      }

      // C) Emergency Contact in China
      if (!formData.emergencyCountry) {
        newErrors.emergencyCountry = "Emergency contact country is required";
      }

      // Validation email emergency si fourni
      if (formData.emergencyEmail && !isValidEmail(formData.emergencyEmail)) {
        newErrors.emergencyEmail = "Please enter a valid email address for emergency contact";
      }

      break;

    case 3:
      // Declaration & Agreement - Toutes les checkboxes sont requises
      if (!formData.acknowledgment) {
        newErrors.acknowledgment = "You must acknowledge the Terms and Conditions and Privacy Policy";
      }

      if (!formData.consent) {
        newErrors.consent = "You must give consent for data processing";
      }

      if (!formData.accuracy) {
        newErrors.accuracy = "You must declare the accuracy of your information";
      }

      if (!formData.paymentPolicy) {
        newErrors.paymentPolicy = "You must agree to the Payment Policy";
      }

      if (!formData.refundPolicy) {
        newErrors.refundPolicy = "You must agree to the Refund Policy";
      }

      if (!formData.compliance) {
        newErrors.compliance = "You must agree to compliance requirements";
      }

      break;

    case 4:
      // Upload Documents - Vérification des documents requis
      const requiredDocs = ['passportPages', 'academicCertificate', 'academicTranscript', 'criminalRecord', 'personalPhoto'];
      
      requiredDocs.forEach(docType => {
        if (!formData.documents[docType]) {
          switch (docType) {
            case 'passportPages':
              newErrors.passportPages = "Passport pages are required";
              break;
            case 'academicCertificate':
              newErrors.academicCertificate = "Highest academic certificate is required";
              break;
            case 'academicTranscript':
              newErrors.academicTranscript = "Highest academic transcript is required";
              break;
            case 'criminalRecord':
              newErrors.criminalRecord = "Non-criminal certificate is required";
              break;
            case 'personalPhoto':
              newErrors.personalPhoto = "Personal photo (passport size) is required";
              break;
          }
        }
      });

      // Validation de la taille et du type de fichier
      Object.entries(formData.documents).forEach(([docType, file]) => {
        if (file instanceof File) {
          // Vérification de la taille (5MB max)
          if (file.size > 5 * 1024 * 1024) {
            newErrors[`${docType}_size`] = `${docType} file size must be less than 5MB`;
          }
          
          // Vérification du type de fichier
          const allowedTypes = ['.jpg', '.jpeg', '.png', '.bmp', '.doc', '.docx', '.pdf', '.xls', '.xlsx'];
          const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
          if (!allowedTypes.includes(fileExtension)) {
            newErrors[`${docType}_type`] = `${docType} must be one of: ${allowedTypes.join(', ')}`;
          }
        }
      });

      break;

    case 5:
      // Final Step - Payment validation si nécessaire
      // Par exemple, si une méthode de paiement est requise:
      // if (!selectedPaymentMethod) {
      //   newErrors.paymentMethod = "Please select a payment method";
      // }

      break;

    default:
      break;
  }

  setErrors(newErrors);
  
  // Message d'erreur global plus détaillé
  if (Object.keys(newErrors).length > 0) {
    const errorCount = Object.keys(newErrors).length;
    setGlobalError(`⚠️ Please correct ${errorCount} error${errorCount > 1 ? 's' : ''} before continuing. All fields marked with * are required.`);
  } else {
    setGlobalError("");
  }

  return Object.keys(newErrors).length === 0;
};

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      const { authUser, token } = getAuthData();
      if (!authUser || !token) {
        alert("Erreur d'authentification. Veuillez vous reconnecter.");
        navigate('/login');
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('formData', JSON.stringify({
        ...formData,
        applicationId: applicationId,
        program: program?.program || "Programme non spécifié",
        university: program?.universities || "Université non spécifiée",
      }));
      Object.entries(formData.documents).forEach(([docType, file]) => {
        if (file instanceof File) {
          formDataToSend.append(`documents[${docType}]`, file);
        }
      });
      const response = await fetch('http://localhost:8000/api/applications/submit/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formDataToSend
      });
      if (response.ok) {
        const result = await response.json();
        setSubmissionData({
          applicationId: result.application?.application_id || applicationId,
          submissionDate: new Date().toISOString(),
          status: 'sent'
        });
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const ApplicationSuccess = () => (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={80} color="#10B981" />
        </div>
        <h2 className="success-title">Application Sent Successfully!</h2>
        <div className="success-details">
          <p className="success-message">
           Your application has been successfully submitted. We have received all your required information and documents.
          </p>
          <div className="application-id-card">
            <span className="id-label">Application ID:</span>
            <span className="id-value">#{submissionData?.applicationId || applicationId}</span>
          </div>
          <div className="next-steps">
            <h3>Next steps:</h3>
            <ul>
              <li>We will review your application as soon as possible.</li>
              <li>You will receive a notification in your dashboard of the status of your application</li>
              <li>You can also track the status in your personal dashboard.</li>
            </ul>
          </div>
        </div>
        <button className="return-dashboard-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Return to Website
        </button>
        <button className="return-dashboard-btn" onClick={() => navigate('/welcome-etudiant')}>
          <ChevronDown size={20} />
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return <ApplicationSuccess />;
  }

  // --- Step 1 ---
  const renderStep1 = () => (
    <>
      <div className="form-section">
        <h3 className="section-title">Contact Details</h3>
        <div className="form-group">
          <label className="form-label">Email Address <span className="required">*</span></label>
          <input type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} className={`form-input ${errors.email ? 'error' : ''}`} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number <span className="required">*</span></label>
          <input type="tel" name="phone" placeholder="Enter your phone number (+212)" value={formData.phone} onChange={handleChange} className={`form-input ${errors.phone ? 'error' : ''}`} />
        </div>
        <div className="form-group">
          <label className="form-label">WhatsApp Number</label>
          <input type="tel" name="whatsapp" placeholder="WhatsApp number (if different)" value={formData.whatsapp} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Student's Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name <span className="required">*</span></label>
            <input type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} className={`form-input ${errors.firstName ? 'error' : ''}`} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name <span className="required">*</span></label>
            <input type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} className={`form-input ${errors.lastName ? 'error' : ''}`} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date of Birth <span className="required">*</span></label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`form-input ${errors.dob ? 'error' : ''}`} />
          </div>
          <div className="form-group">
            <label className="form-label">Place of Birth <span className="required">*</span></label>
            <input type="text" name="placeOfBirth" placeholder="Enter your place of birth" value={formData.placeOfBirth} onChange={handleChange} className={`form-input ${errors.placeOfBirth ? 'error' : ''}`} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Gender <span className="required">*</span></label>
            <select name="gender" value={formData.gender} onChange={handleChange} className={`form-input form-select ${errors.gender ? 'error' : ''}`}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Marital Status <span className="required">*</span></label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={`form-input form-select ${errors.maritalStatus ? 'error' : ''}`}>
              <option value="">Select marital status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Passport Number <span className="required">*</span></label>
            <input type="text" name="passportNumber" placeholder="Enter passport number" value={formData.passportNumber} onChange={handleChange} className={`form-input ${errors.passportNumber ? 'error' : ''}`} style={{ textTransform: 'uppercase' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Passport Expiry Date <span className="required">*</span></label>
            <input type="date" name="passportExpiry" value={formData.passportExpiry} onChange={handleChange} className={`form-input ${errors.passportExpiry ? 'error' : ''}`} />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Language Proficiency</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">English Level <span className="required">*</span></label>
            <select name="englishLevel" value={formData.englishLevel} onChange={handleChange} className={`form-input form-select ${errors.englishLevel ? 'error' : ''}`}>
              <option value="">Select your English level</option>
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Very Good">Very Good</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">English Certificate <span className="required">*</span></label>
            <select name="englishCertificate" value={formData.englishCertificate} onChange={handleChange} className={`form-input form-select ${errors.englishCertificate ? 'error' : ''}`}>
              <option value="">Select certificate type</option>
              <option value="IELTS">IELTS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="Duolingo">Duolingo</option>
              <option value="other">Other</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
        {formData.englishCertificate && formData.englishCertificate !== 'None' && (
          <div className="form-group">
            <label className="form-label">Certificate Score/Grade <span className="required">*</span></label>
            <input type="text" name="certificateScore" placeholder="Enter your score or grade" value={formData.certificateScore} onChange={handleChange} className="form-input" />
          </div>
        )}
      </div>

      <div className="form-section">
        <h3 className="section-title">Home Address Details</h3>
        <div className="form-group">
          <label className="form-label">Country <span className="required">*</span></label>
          <select name="country" value={formData.country} onChange={handleChange} className={`form-input form-select ${errors.country ? 'error' : ''}`}>
            <option value="">Select your country</option>
            <option value="Morocco">Morocco</option>
            <option value="Algeria">Algeria</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Egypt">Egypt</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Full Address <span className="required">*</span></label>
          <textarea name="fullAddress" placeholder="Enter your complete address (street, city, province, postal code)" value={formData.fullAddress} onChange={handleChange} className={`form-input ${errors.fullAddress ? 'error' : ''}`} rows="3" />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Educational Background</h3>
        {formData.educationalBackground.map((edu, index) => (
          <div key={index} className="repeatable-block">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">School/Institution <span className="required">*</span></label>
                <input type="text" placeholder="Enter school or institution name" value={edu.school} onChange={(e) => handleArrayChange('educationalBackground', index, 'school', e.target.value)} className={`form-input ${errors.school ? 'error' : ''}`} />
              </div>
              <div className="form-group">
                <label className="form-label">Major/Field of Study</label>
                <input type="text" placeholder="Enter your major or field of study" value={edu.major} onChange={(e) => handleArrayChange('educationalBackground', index, 'major', e.target.value)} className="form-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date <span className="required">*</span></label>
                <input type="date" value={edu.startDate} onChange={(e) => handleArrayChange('educationalBackground', index, 'startDate', e.target.value)} className={`form-input ${errors.startDate ? 'error' : ''}`} />
              </div>
              <div className="form-group">
                <label className="form-label">Finish Date <span className="required">*</span></label>
                <input type="date" value={edu.finishDate} onChange={(e) => handleArrayChange('educationalBackground', index, 'finishDate', e.target.value)} className={`form-input ${errors.finishDate ? 'error' : ''}`} />
              </div>
              <div className="form-group">
                <label className="form-label">Grade/GPA</label>
                <input type="text" placeholder="Enter grade or GPA" value={edu.grade} onChange={(e) => handleArrayChange('educationalBackground', index, 'grade', e.target.value)} className="form-input" />
              </div>
            </div>
          </div>
        ))}
        <div className="action-buttons">
          <button type="button" className="add-btn" onClick={() => addArrayItem('educationalBackground', { school: "", major: "", startDate: "", finishDate: "", grade: "" })}>
            <Plus size={16} /> Add Educational Background
          </button>
          {formData.educationalBackground.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('educationalBackground', formData.educationalBackground.length - 1)}>
              <X size={16} /> Remove
            </button>
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Work Experience</h3>
        {formData.workExperience.map((work, index) => (
          <div key={index} className="repeatable-block">
            <div className="form-group">
              <label className="form-label">Employer/Company <span className="required">*</span></label>
              <input type="text" placeholder="Enter employer or company name" value={work.employer} onChange={(e) => handleArrayChange('workExperience', index, 'employer', e.target.value)} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Job Title/Position <span className="required">*</span></label>
              <input type="text" placeholder="Enter your job title or position" value={work.jobTitle} onChange={(e) => handleArrayChange('workExperience', index, 'jobTitle', e.target.value)} className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date <span className="required">*</span></label>
                <input type="date" value={work.startDate} onChange={(e) => handleArrayChange('workExperience', index, 'startDate', e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input type="date" value={work.endDate} onChange={(e) => handleArrayChange('workExperience', index, 'endDate', e.target.value)} className="form-input" />
              </div>
            </div>
          </div>
        ))}
        <div className="action-buttons">
          <button type="button" className="add-btn" onClick={() => addArrayItem('workExperience', { employer: "", jobTitle: "", startDate: "", endDate: "" })}>
            <Plus size={16} /> Add Work Experience
          </button>
          {formData.workExperience.length > 1 && (
            <button type="button" className="remove-btn" onClick={() => removeArrayItem('workExperience', formData.workExperience.length - 1)}>
              <X size={16} /> Remove
            </button>
          )}
        </div>
      </div>
    </>
  );

  // --- Step 2 ---
  const renderStep2 = () => (
    <>
      <div className="form-section">
        <h3 className="section-title">Family Contact</h3>
        {formData.familyContacts.map((contact, index) => (
          <div key={index} className="repeatable-block">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name <span className="required">*</span></label>
                <input type="text" placeholder="Enter family member's name" value={contact.name} onChange={(e) => handleArrayChange('familyContacts', index, 'name', e.target.value)} className={`form-input ${errors.familyName ? 'error' : ''}`} />
              </div>
              <div className="form-group">
                <label className="form-label">Nationality <span className="required">*</span></label>
                <select value={contact.nationality} onChange={(e) => handleArrayChange('familyContacts', index, 'nationality', e.target.value)} className={`form-input form-select ${errors.familyNationality ? 'error' : ''}`}>
                  <option value="">Select nationality</option>
                  <option value="Morocco">🇲🇦 Morocco</option>
                  <option value="Algeria">🇩🇿 Algeria</option>
                  <option value="Tunisia">🇹🇳 Tunisia</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" placeholder="Enter email address" value={contact.email} onChange={(e) => handleArrayChange('familyContacts', index, 'email', e.target.value)} className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Workplace</label>
                <input type="text" placeholder="Enter workplace" value={contact.workplace} onChange={(e) => handleArrayChange('familyContacts', index, 'workplace', e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Position/Job Title</label>
                <input type="text" placeholder="Enter position or job title" value={contact.position} onChange={(e) => handleArrayChange('familyContacts', index, 'position', e.target.value)} className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Relationship <span className="required">*</span></label>
              <select value={contact.relationship} onChange={(e) => handleArrayChange('familyContacts', index, 'relationship', e.target.value)} className={`form-input form-select ${errors.familyRelation ? 'error' : ''}`}>
                <option value="">Select relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
                <option value="Spouse">Spouse</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
              </select>
            </div>
          </div>
        ))}
        <div className="action-buttons">
          <button type="button" className="add-btn" onClick={() => addArrayItem('familyContacts', { name: "", nationality: "", email: "", workplace: "", position: "", relationship: "" })}>
            <Plus size={16} /> Add A Family Member
          </button>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Financial Supporter (Guarantor)</h3>
        <div className="form-group">
          <label className="form-label">Relationship to Guarantor <span className="required">*</span></label>
          <select name="guarantorRelationship" value={formData.guarantorRelationship} onChange={handleChange} className={`form-input form-select ${errors.guarantorRelationship ? 'error' : ''}`}>
            <option value="">Select relationship</option>
            <option value="Self">Self</option>
            <option value="Parent">Parent</option>
            <option value="Guardian">Guardian</option>
            <option value="Friend">Friend</option>
            <option value="Company">Company</option>
            <option value="Government">Government</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Guarantor's Full Name <span className="required">*</span></label>
          <input type="text" name="guarantorName" placeholder="Enter guarantor's full name" value={formData.guarantorName} onChange={handleChange} className={`form-input ${errors.guarantorName ? 'error' : ''}`} />
        </div>
        <div className="form-group">
          <label className="form-label">Guarantor's Country <span className="required">*</span></label>
          <select name="guarantorCountry" value={formData.guarantorCountry} onChange={handleChange} className={`form-input form-select ${errors.guarantorCountry ? 'error' : ''}`}>
            <option value="">Select guarantor's country</option>
            <option value="Morocco">🇲🇦 Morocco</option>
            <option value="Algeria">🇩🇿 Algeria</option>
            <option value="Tunisia">🇹🇳 Tunisia</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Guarantor's Address <span className="required">*</span></label>
          <textarea name="guarantorAddress" placeholder="Enter guarantor's complete address" value={formData.guarantorAddress} onChange={handleChange} className={`form-input ${errors.guarantorAddress ? 'error' : ''}`} rows="3" />
        </div>
        <div className="form-group">
          <label className="form-label">Guarantor's Email Address</label>
          <input type="email" name="guarantorEmail" placeholder="Enter guarantor's email address" value={formData.guarantorEmail} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Guarantor's Workplace</label>
          <input type="text" name="guarantorWorkplace" placeholder="Enter guarantor's workplace" value={formData.guarantorWorkplace} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Workplace Address</label>
          <textarea name="guarantorWorkplaceAddress" placeholder="Enter workplace address" value={formData.guarantorWorkplaceAddress} onChange={handleChange} className="form-input" rows="2" />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Emergency Contact in China</h3>
        <p className="helper-text">If you don't know anyone in China, we'll assume your country's embassy in China.</p>
        <div className="form-group">
          <label className="form-label">Emergency Contact Name</label>
          <input type="text" name="emergencyName" placeholder="Enter emergency contact name" value={formData.emergencyName} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Emergency Contact Country <span className="required">*</span></label>
          <select name="emergencyCountry" value={formData.emergencyCountry} onChange={handleChange} className={`form-input form-select ${errors.emergencyCountry ? 'error' : ''}`}>
            <option value="">Select country</option>
            <option value="China">🇨🇳 China</option>
            <option value="Morocco">🇲🇦 Morocco Embassy in China</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Emergency Contact Email</label>
          <input type="email" name="emergencyEmail" placeholder="Enter emergency contact email" value={formData.emergencyEmail} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Emergency Contact Address</label>
          <textarea name="emergencyAddress" placeholder="Enter complete address" value={formData.emergencyAddress} onChange={handleChange} className="form-input" rows="3" />
        </div>
      </div>
    </>
  );

  // --- Step 3 ---
  const renderStep3 = () => (
    <div className="form-section">
      <h3 className="section-title">Declaration & Agreement</h3>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input type="checkbox" name="acknowledgment" checked={formData.acknowledgment} onChange={handleChange} className="checkbox" />
          I have read and understood the{' '}
          <span className="view-details-btn" onClick={() => setShowModal('terms')}>Terms and Conditions</span>{' '} and {' '}
          <span className="view-details-btn" onClick={() => setShowModal('privacy')}>Privacy Policy</span>{' '}
          of Diravenir.
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="checkbox" />
          I give consent to Diravenir to collect, process, and share my data with relevant parties for the purpose of admission and visa processing.
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="accuracy" checked={formData.accuracy} onChange={handleChange} className="checkbox" />
          I declare that the information and documents provided in my application are accurate and authentic to the best of my knowledge.
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="paymentPolicy" checked={formData.paymentPolicy} onChange={handleChange} className="checkbox" />
          I have read and understood the Payment Policy of Diravenir and agree to its terms.
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="refundPolicy" checked={formData.refundPolicy} onChange={handleChange} className="checkbox" />
          I have read and understood the{' '}
          <span className="view-details-btn" onClick={() => setShowModal('refund')}>Refund Policy</span>{' '}
          of Diravenir and agree to its terms.
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="compliance" checked={formData.compliance} onChange={handleChange} className="checkbox" />
          I agree to attend all required courses, interviews, and exams as outlined in the application process. I will abide by the laws and regulations of the university and Diravenir.
        </label>
        <button type="button" className="agree-all-btn" onClick={() => {
          setFormData(prev => ({
            ...prev,
            acknowledgment: true,
            consent: true,
            accuracy: true,
            paymentPolicy: true,
            refundPolicy: true,
            compliance: true,
          }));
        }}>
          Agree to All
        </button>
      </div>
    </div>
  );

  // --- Step 4 ---
  const DocumentUpload = ({ label, documentType, required = false }) => (
    <div className="document-upload-item">
      <div className="document-info">
        <span className="document-label">
          {label} {required && <span className="required">*</span>}
        </span>
        {formData.documents[documentType] && (
          <span className="file-status">✓ Uploaded</span>
        )}
      </div>
      <div className="document-actions">
        <label className="file-upload-btn">
          <Upload size={16} />
          Choose File
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
            onChange={(e) => handleFileUpload(documentType, e.target.files[0])}
            className="hidden-file-input"
          />
        </label>
        {formData.documents[documentType] && (
          <button type="button" className="remove-file-btn" onClick={() => handleFileUpload(documentType, null)}>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="form-section">
      <h3 className="section-title">Upload Documents</h3>
      <p className="upload-instructions">
        Accepted types: .jpg, .jpeg, .png, .bmp, .doc, .docx, .pdf, .xls, .xlsx | Max file size 5MB
      </p>
      <div className="documents-list">
        <DocumentUpload label="Passport Pages" documentType="passportPages" required />
        <DocumentUpload label="Highest Academic Certificate" documentType="academicCertificate" required />
        <DocumentUpload label="Highest Academic Transcript" documentType="academicTranscript" required />
        <DocumentUpload label="Language Proficiency Certificate" documentType="languageCertificate" />
        <DocumentUpload label="Foreigner Physical Examination Form" documentType="medicalExam" />
        <DocumentUpload label="Non-Criminal Certificate" documentType="criminalRecord" required />
        <DocumentUpload label="Bank Solvency/Statement" documentType="bankStatement" />
        <DocumentUpload label="Personal Photo (passport size)" documentType="personalPhoto" required />
        <DocumentUpload label="Resume / CV" documentType="resume" />
        <DocumentUpload label="Award Certificates" documentType="awards" />
        <DocumentUpload label="Father's/Mother's ID" documentType="parentsId" />
      </div>
    </div>
  );

  // --- Step 5 ---
  const renderStep5 = () => (
    <div className="form-section">
      <h3 className="section-title">Final Step - Payment & Next Steps</h3>
      <div className="payment-summary">
        <h4>Payment Summary</h4>
        <div className="summary-row">
          <span>Application Fee:</span>
          <span>4000 MAD</span>
        </div>
        <div className="summary-row">
          <span>Service Charge:</span>
          <span>11000 MAD</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>15000 MAD</span>
        </div>
      </div>
      <div className="payment-options">
        <h4>Select Payment Method</h4>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="card" className="payment-radio" />
          <span>💳 Credit/Debit Card (Visa/Mastercard)</span>
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="transfer" className="payment-radio" />
          <span>🏦 Bank Transfer</span>
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="wafacash" className="payment-radio" />
          <span>💰 Wafacash / Cashplus</span>
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="cash" className="payment-radio" />
          <span>🏢 Cash in our office</span>
        </label>
      </div>
    </div>
  );

  // --- Modal ---
  const Modal = ({ title, children, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    switch(showModal) {
      case 'terms':
        return (
          <Modal title="Terms & Conditions" onClose={() => setShowModal(null)}>
            <ol>
              <li><strong>Acceptance of Terms</strong> – By applying through the portal, you confirm you have read, understood, and agree to these Terms & Conditions.</li>
              <li><strong>Eligibility</strong> – Applicants must meet the eligibility criteria specified by the university and MalishaEdu; accurate, authentic, and complete information is required.</li>
              <li><strong>Application Process</strong> – Diravenir facilitates applications to universities. Submission of documents and payment of applicable service charges are mandatory. Applications are subject to review and approval by the university and relevant authorities.</li>
              <li><strong>Service Charges</strong> – Service charges are non-refundable unless specified in the Refund Policy. Additional third-party fees (university, visa, travel) are the applicant's responsibility.</li>
              <li><strong>Applicant's Responsibilities</strong> – You are responsible for the accuracy of all provided documents and information and for attending interviews or exams as required.</li>
              <li><strong>Platform Use</strong> – Unauthorized use of the portal (e.g., sharing accounts, fraudulent submissions) is prohibited. Diravenir may suspend or terminate access for misuse.</li>
              <li><strong>Liabilities</strong> – Diravenir is not liable for circumstances beyond its control, including visa rejections, university decisions, or delays caused by third parties. Users are responsible for complying with local laws and regulations.</li>
            </ol>
          </Modal>
        );
      case 'privacy':
        return (
          <Modal title="Privacy Policy" onClose={() => setShowModal(null)}>
            <ol>
              <li><strong>Information Collected</strong> – Personal (name, contact, passport details), Academic (transcripts, certificates), and Payment information (bank details or confirmations for service charges).</li>
              <li><strong>Usage</strong> – Processing university applications; facilitating scholarships; communicating application status; improving services.</li>
              <li><strong>Data Sharing</strong> – With partner universities, government bodies (visa), and authorized third parties required for processing. No sale of personal data to third parties.</li>
              <li><strong>Security</strong> – Encryption and secure servers; access limited to authorized personnel.</li>
              <li><strong>User Rights</strong> – Access, edit, or delete your personal data (not the application itself) by contacting Contact@Diravenir.com. Requests processed within 30 business days.</li>
              <li><strong>Cookies</strong> – Used to enhance experience; you can disable cookies in your browser.</li>
              <li><strong>Compliance</strong> – Diravenir complies with international data-protection laws, including GDPR and relevant regulations in China.</li>
            </ol>
          </Modal>
        );
      case 'refund':
        return (
          <Modal title="Refund Policy" onClose={() => setShowModal(null)}>
            <div>
              <h4>When Diravenir can refund (Full payment):</h4>
              <ol>
                <li>Diravenir fails to provide any admission to students after complete documents were provided.</li>
                <li>Diravenir issues an admission letter without consulting the student and the student does not agree to go there.</li>
              </ol>
              <p><strong>Note:</strong> Refunds cover the service charge deposit, not third-party application fees paid to universities.</p>
              <h4>When Diravenir can refund (Partial):</h4>
              <ol>
                <li>The student does not get a visa because of Diravenir's or the university's problem.</li>
                <li>If the student fails the final examination test (Baccalaureat).</li>
              </ol>
              <h4>When students do not get any refund:</h4>
              <ol>
                <li>The student gives up at any stage.</li>
                <li>The student fails a university interview and disagrees with the outcome (they should apply to another university recommended by Diravenir).</li>
                <li>The student fails to provide documents on time or does not attend interviews/exams, causing admission failure.</li>
                <li>Visa rejection due to the student's own problems.</li>
                <li>Any criminal record.</li>
                <li>Providing fake documents.</li>
                <li>Refusing to attend required English/Chinese language or interview-prep courses provided by Diravenir.</li>
                <li>Already in China and raising disputes/questions that could be resolved before traveling.</li>
              </ol>
            </div>
          </Modal>
        );
      default:
        return null;
    }
  };

  return (
    <div className="application-container">
      <div className="progress-wrapper">
        <div className="progress-bar">
          {["Your Info", "Family", "Agreement", "Documents", "Final Step"].map((label, index) => {
            const stepNumber = index + 1;
            return (
              <div key={index} className={`progress-step ${step >= stepNumber ? 'active' : ''}`}>
                <span className="step-label">{label}</span>
                {stepNumber < 5 && <div className="line" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="application-content">
        <div className="application-form">
          <h2 className="form-title">Your Application</h2>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {globalError && <div className="error-banner">{globalError}</div>}
          {Object.keys(errors).length > 0 && (
            <div className="error-banner">
              <ul>
                {Object.entries(errors).map(([field, msg]) => (
                  <li key={field}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="nav-buttons">
            <button onClick={prevStep} disabled={step === 1} className="prev-btn">Previous</button>
            <button onClick={step === 5 ? handleSubmit : nextStep} className="next-btn">
              {step === 5 ? "Agree & Pay" : "Next"}
            </button>
          </div>
        </div>
        <div className="application-summary">
          <h3>Your Application Summary</h3>
          <div className="summary-details">
            <p><strong>Application ID:</strong> <span className="highlight1">#{applicationId}</span></p>
            <p><strong>Application Fees:</strong> 4000 MAD</p>
            <p><strong>Service Fees:</strong> 11000 MAD</p>
          </div>
          {program ? (
            <div className="program-info">
              <img src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : "/default-logo.png"} alt={`${program.universities} logo`} className="program-logo" onError={(e) => { e.target.src = "/default-logo.png"; }} />
              <h4 className="program-title1">{program.degree_type} in {program.program}</h4>
              <p className="program-status">Current Status: <strong className="status-open">{program.scholarship}</strong></p>
            </div>
          ) : (
            <div className="program-info">
              <div className="program-logo-placeholder">H</div>
              <h4 className="program-title1">Programme en cours de chargement...</h4>
              <p className="program-status">Current Status: <strong>Loading...</strong></p>
            </div>
          )}
        </div>
      </div>
      {showModal && renderModal()}
      <style jsx>{`
        /* CSS fourni */
        .application-container {
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 15px;
          background-color: #f5f5f5;
          min-height: 100vh;
        }
        .progress-wrapper {
          width: 100%;
          margin-bottom: 10px;
        }
        .progress-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .progress-step {
          display: flex;
          align-items: center;
          flex: 1;
          position: relative;
        }
        .circle {
          display: none;
        }
        .step-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
          position: relative;
          padding-bottom: 8px;
        }
        .progress-step.active .step-label {
          color: #541652 !important;
          font-weight: 600;
        }
        .progress-step.active .step-label::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #541652 !important;
          border-radius: 2px;
        }
        .line {
          flex: 1;
          height: 1px;
          background: #ddd;
          margin: 0 20px;
          transition: all 0.3s ease;
        }
        .progress-step.active .line {
          background: #541652 !important;
        }
        .application-content {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .application-form {
          flex: 2;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          min-width: 400px;
        }
        .form-title {
          color: #541652 !important;
          margin-bottom: 30px;
          font-size: 1.8rem;
          font-weight: 600;
          border-bottom: 3px solid #541652 !important;
          padding-bottom: 10px;
        }
        .form-section {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .form-section:last-of-type {
          border-bottom: none;
        }
        .section-title {
          color: #541652 !important;
          margin-bottom: 15px;
          font-size: 1.2rem;
          font-weight: 600;
          padding-bottom: 8px;
          border-bottom: 2px solid #541652 !important;
          display: inline-block;
        }
        .form-input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.3s ease;
          background: #fff;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: #541652 !important;
          box-shadow: 0 0 0 3px rgba(84, 22, 82, 0.1) !important;
        }
        .form-input::placeholder {
          color: #999;
        }
        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 40px;
        }
        .form-row {
          display: flex;
          gap: 15px;
          align-items: flex-end;
        }
        .form-row .form-input {
          flex: 1;
        }
        .full-width {
          width: 100% !important;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 15px;
          width: 100%;
        }
        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          display: block;
        }
        .required {
          color: #e53e3e;
        }
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }
        .add-btn {
          background: #541652 !important;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .add-btn:hover {
          background: #3a0f39 !important;
          transform: translateY(-1px);
        }
        .remove-btn {
          background: #e8d5f0;
          color: #541652 !important;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .remove-btn:hover {
          background: #d4c5e0;
        }
        .nav-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .prev-btn, .next-btn {
          background: #541652 !important;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          min-width: 100px;
        }
        .prev-btn:hover, .next-btn:hover {
          background: #3a0f39 !important;
          transform: translateY(-1px);
        }
        .prev-btn:disabled {
          background: #aaa !important;
          cursor: not-allowed;
          transform: none;
        }
        .prev-btn:disabled:hover {
          background: #aaa !important;
          transform: none;
        }
        .application-summary {
          flex: 1;
          background: linear-gradient(135deg, #541652 0%, #7b1883 100%) !important;
          color: white;
          padding: 25px;
          border-radius: 12px;
          min-width: 300px;
          height: fit-content;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .application-summary h3 {
          margin-bottom: 20px;
          font-size: 1.3rem;
          font-weight: 600;
        }
        .summary-details {
          margin-bottom: 25px;
          font-size: 14px;
        }
        .summary-details p {
          margin: 12px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .highlight1 {
          color: #541652 !important;
          font-weight: bold;
          display: inline-block;
          background: #ffd500;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          margin: 8px 0;
        }
        .program-info {
          background: transparent;
          color: white;
          padding: 20px;
          border-radius: 12px;
          margin-top: 25px;
          text-align: center;
        }
        .program-logo {
          max-width: 80px;
          max-height: 80px;
          margin-bottom: 15px;
          border-radius: 8px;
          object-fit: contain;
        }
        .program-logo-placeholder {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #541652 0%, #7b1883 100%) !important;
          border-radius: 8px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
        }
        .program-logo-placeholder::after {
          content: "H";
        }
        .program-title1 {
          font-size: 1.1rem;
          font-weight: bold;
          margin: 10px 0;
          color: #ffd500;
          line-height: 1.4;
        }
        .program-university {
          margin: 8px 0;
          font-size: 14px;
          color: #ddd;
          font-weight: 500;
        }
        .program-city {
          margin: 8px 0;
          font-size: 13px;
          color: #ccc;
        }
        .program-status {
          margin-top: 15px;
          font-size: 13px;
          color: #ddd;
        }
        .status-open {
          color: #28a745;
        }
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          line-height: 1.5;
          cursor: pointer;
          color: #000;
        }
        .checkbox {
          margin: 0;
          margin-top: 2px;
          flex-shrink: 0;
          accent-color: #541652 !important;
        }
        .view-details-btn {
          background: none;
          border: none;
          color: #541652 !important;
          text-decoration: underline;
          cursor: pointer;
          font-size: 14px;
          font-weight: normal;
          padding: 0;
          margin: 0;
        }
        .view-details-btn:hover {
          color: #3a0f39 !important;
          text-decoration: underline;
        }
        .agree-all-btn {
          margin-top: 20px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background: #541652 !important;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .agree-all-btn:hover {
          background: #3a0f39 !important;
        }
        .documents-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .document-upload-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #fafafa;
        }
        .document-info {
          flex: 1;
        }
        .document-label {
          font-weight: 500;
          color: #333;
        }
        .required {
          color: #e53e3e;
        }
        .file-status {
          font-size: 12px;
          color: #541652 !important;
          margin-left: 10px;
        }
        .document-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .file-upload-btn {
          background: #541652 !important;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .file-upload-btn:hover {
          background: #3a0f39 !important;
        }
        .hidden-file-input {
          display: none;
        }
        .remove-file-btn {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        .remove-file-btn:hover {
          background: #c53030;
        }
        .upload-instructions {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
          background: #f0f0f0;
          padding: 10px;
          border-radius: 6px;
        }
        .error-banner {
          background: #ffe6e6;
          color: #cc0000;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 500;
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
.success-container {
  min-height: 100vh;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.success-card {
  background: white;
  border-radius: 30px;
  padding: 40px;
  text-align: center;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.6s ease-out;
  margin-top: -98px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-title {
  color: #541652 !important;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.application-id-card {
  background: linear-gradient(135deg, #541652 0%, #3a0f39 100%) !important;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.return-dashboard-btn {
  background: linear-gradient(135deg, #541652 0%, #3a0f39 100%) !important;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px auto 0;
  transition: all 0.3s ease;
}

.return-dashboard-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(84, 22, 82, 0.3) !important;
}
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 700px;
          width: 100%;
          max-height: 70vh;
          overflow-y: auto;
          margin: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 25px;
          border-bottom: 1px solid #eee;
          background: white;
        }
        .modal-header h3 {
          margin: 0;
          color: #541652 !important;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          font-size: 20px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }
        .modal-close:hover {
          background-color: #f5f5f5;
        }
        .modal-body {
          padding: 25px;
          line-height: 1.6;
          color: #000;
          background: white;
          font-size: 14px;
        }
        .modal-body h4 {
          color: #541652 !important;
          margin-top: 15px;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 14px;
        }
        .modal-body ol {
          padding-left: 18px;
          color: #000;
        }
        .modal-body ol li {
          margin-bottom: 8px;
          color: #000;
        }
        .modal-body p {
          color: #000;
          margin-bottom: 8px;
        }
        .modal-body strong {
          color: #541652 !important;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .application-container {
            padding: 10px;
          }
          .progress-bar {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }
          .progress-step {
            width: 100%;
            justify-content: flex-start;
          }
          .line {
            display: none;
          }
          .application-content {
            flex-direction: column;
          }
          .application-form {
            min-width: auto;
            padding: 20px;
          }
          .form-title {
            font-size: 1.5rem;
          }
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          .action-buttons {
            flex-direction: column;
          }
          .nav-buttons {
            flex-direction: column;
            gap: 10px;
          }
          .application-summary {
            min-width: auto;
          }
          .document-upload-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .document-actions {
            align-self: flex-end;
          }
          .success-container {
            padding: 10px;
          }
          .success-card {
            padding: 30px 20px;
            margin: 10px;
          }
          .success-title {
            font-size: 24px;
          }
          .application-id-card {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          .return-dashboard-btn {
            width: 100%;
            justify-content: center;
          }
          .modal-content {
            margin: 10px;
            max-width: calc(100vw - 20px);
          }
          .modal-header {
            padding: 15px 20px;
          }
          .modal-body {
            padding: 20px;
          }
          .modal-header h3 {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 480px) {
          .application-container {
            padding: 5px;
          }
          .application-form {
            padding: 15px;
          }
          .form-title {
            font-size: 1.3rem;
          }
          .section-title {
            font-size: 1.1rem;
          }
          .form-input {
            padding: 10px 12px;
            font-size: 13px;
          }
          .checkbox-label {
            font-size: 13px;
          }
          .view-details-btn {
            font-size: 13px;
          }
          .modal-content {
            margin: 5px;
            max-width: calc(100vw - 10px);
            max-height: calc(100vh - 10px);
          }
        }
        .form-input.error, .form-select.error, textarea.error {
          border: 2px solid #e53e3e !important;
          background-color: #fff5f5;
        }
        .payment-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 20px 0;
        }
        .payment-summary {
          background: rgba(255, 255, 255, 0.1);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 8px 0;
          font-size: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .summary-row:last-child {
          font-weight: bold;
          font-size: 1.2rem;
          border-bottom: none;
        }
        .payment-options {
          margin-top: 20px;
        }
        .payment-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .payment-option:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .payment-radio {
          width: 18px;
          height: 18px;
          accent-color: white;
        }
      `}</style>
    </div>
  );
}

export default ApplicationForm;
