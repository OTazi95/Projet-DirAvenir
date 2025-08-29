import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X, Plus, CheckCircle, ArrowLeft } from "lucide-react";
import axios from "axios";

function ApplicationForm() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  
  // Fonction utilitaire pour récupérer les données d'authentification
  const getAuthData = () => {
    // Récupérer les données d'authentification
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
    // Step 1 - Contact Details
    email: "",
    phone: "",
    whatsapp: "",
    
    // Student's Information
    firstName: "",
    lastName: "",
    dob: "",
    placeOfBirth: "",
    gender: "",
    maritalStatus: "",
    passportNumber: "",
    passportExpiry: "",
    
    // Language Proficiency
    englishLevel: "",
    englishCertificate: "",
    certificateScore: "",
    
    // Home Address Details
    country: "",
    fullAddress: "",
    
    // Educational Background (array of objects)
    educationalBackground: [{
      school: "",
      major: "",
      startDate: "",
      finishDate: "",
      grade: ""
    }],
    
    // Work Experience (array of objects)
    workExperience: [{
      employer: "",
      jobTitle: "",
      startDate: "",
      endDate: ""
    }],
    
    // Step 2 - Family
    familyContacts: [{
      name: "",
      nationality: "",
      email: "",
      workplace: "",
      position: "",
      relationship: ""
    }],
    
    // Financial Supporter
    guarantorRelationship: "",
    guarantorName: "",
    guarantorCountry: "",
    guarantorAddress: "",
    guarantorEmail: "",
    guarantorWorkplace: "",
    guarantorWorkplaceAddress: "",
    
    // Emergency Contact in China
    emergencyName: "",
    emergencyCountry: "",
    emergencyEmail: "",
    emergencyAddress: "",
    
    // Step 3 - Agreements
    acknowledgment: false,
    consent: false,
    accuracy: false,
    paymentPolicy: false,
    refundPolicy: false,
    compliance: false,
    
    // Step 4 - Documents
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

  // Vérifier l'authentification au chargement du composant
  useEffect(() => {
    const { authUser, token } = getAuthData();
    
    if (!authUser || !token) {
      console.error('Utilisateur non authentifié');
      navigate('/login');
      return;
    }
    
    // Pré-remplir les champs avec les données utilisateur
    setFormData(prev => ({
      ...prev,
      email: authUser.email || '',
      firstName: authUser.prenom || authUser.first_name || '',
      lastName: authUser.nom || authUser.last_name || ''
    }));
  }, [navigate]);

  // Charger les données du programme depuis l'API
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
        console.log('Program data loaded:', response.data);
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

  const [showModal, setShowModal] = useState(null);
  const [applicationId] = useState(Math.floor(Math.random() * 900000) + 100000);
  const [errors, setErrors] = useState({});

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
    
    switch(currentStep) {
      case 1:
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        break;
      case 3:
        if (!formData.acknowledgment) newErrors.acknowledgment = "Required";
        if (!formData.consent) newErrors.consent = "Required";
        if (!formData.accuracy) newErrors.accuracy = "Required";
        if (!formData.paymentPolicy) newErrors.paymentPolicy = "Required";
        if (!formData.refundPolicy) newErrors.refundPolicy = "Required";
        if (!formData.compliance) newErrors.compliance = "Required";
        break;
    }
    
    setErrors(newErrors);
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
      // Récupérer les données d'authentification
      const { authUser, token } = getAuthData();
      
      if (!authUser || !token) {
        alert("Erreur d'authentification. Veuillez vous reconnecter.");
        navigate('/login');
        return;
      }

      console.log('Données d\'authentification:', { authUser: !!authUser, token: !!token });
      
      // Préparer les données de soumission
      const submissionPayload = {
        program: program?.program || "Programme non spécifié",
        university: program?.universities || "Université non spécifiée",
        formData: {
          ...formData,
          applicationId: applicationId
        }
      };

      console.log('Payload à envoyer:', submissionPayload);

      // Envoyer la requête avec le token d'authentification
      const response = await fetch('http://localhost:8000/api/applications/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(submissionPayload)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Candidature soumise avec succès:', result);
        
        setSubmissionData({
          applicationId: result.application?.application_id || applicationId,
          submissionDate: new Date().toISOString(),
          status: 'sent'
        });
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erreur de réponse:', response.status, errorData);
        throw new Error(errorData.error || `Erreur ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      alert(`Erreur lors de l'envoi de la candidature: ${error.message}`);
    }
  };

  // Component de succès
  const ApplicationSuccess = () => (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={80} color="#10B981" />
        </div>
        
        <h2 className="success-title">Candidature Envoyée avec Succès!</h2>
        
        <div className="success-details">
          <p className="success-message">
            Votre candidature a été soumise avec succès. Nous avons reçu toutes vos informations 
            et documents requis.
          </p>
          
          <div className="application-id-card">
            <span className="id-label">ID de candidature:</span>
            <span className="id-value">#{submissionData?.applicationId || applicationId}</span>
          </div>
          
          <div className="next-steps">
            <h3>Prochaines étapes:</h3>
            <ul>
              <li>Nous examinerons votre candidature dans les 3-5 jours ouvrables</li>
              <li>Vous recevrez une notification par email du statut</li>
              <li>Vous pouvez suivre l'évolution dans votre dashboard</li>
            </ul>
          </div>
        </div>
        
        <button 
          className="return-dashboard-btn"
          onClick={() => navigate('/welcome-etudiant')}
        >
          <ArrowLeft size={20} />
          Retourner au Dashboard
        </button>
      </div>
    </div>
  );

  // Vérification de soumission
  if (isSubmitted) {
    return <ApplicationSuccess />;
  }

  // Reste du code inchangé pour les fonctions de rendu des steps...
  const renderStep1 = () => (
    <>
      <div className="form-section">
        <h3 className="section-title">Contact Details</h3>
        
        <input
          type="email"
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'error' : ''}`}
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (+212) *"
          value={formData.phone}
          onChange={handleChange}
          className={`form-input ${errors.phone ? 'error' : ''}`}
        />
        
        <input
          type="tel"
          name="whatsapp"
          placeholder="WhatsApp Number (if different)"
          value={formData.whatsapp}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-section">
        <h3 className="section-title">Student's Information</h3>
        
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-input ${errors.firstName ? 'error' : ''}`}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-input ${errors.lastName ? 'error' : ''}`}
          />
        </div>
        
        <div className="form-row">
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth *"
            value={formData.dob}
            onChange={handleChange}
            className="form-input"
          />
          <input
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth *"
            value={formData.placeOfBirth}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="form-row">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="">Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="">Marital Status *</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        
        <div className="form-row">
          <input
            type="text"
            name="passportNumber"
            placeholder="Passport Number *"
            value={formData.passportNumber}
            onChange={handleChange}
            className="form-input"
            style={{ textTransform: 'uppercase' }}
          />
          <input
            type="date"
            name="passportExpiry"
            placeholder="Passport Expiry Date *"
            value={formData.passportExpiry}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Language Proficiency</h3>
        
        <div className="form-row">
          <select
            name="englishLevel"
            value={formData.englishLevel}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="">English Level *</option>
            <option value="Poor">Poor</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Very Good">Very Good</option>
            <option value="Excellent">Excellent</option>
          </select>
          
          <select
            name="englishCertificate"
            value={formData.englishCertificate}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="">Certificate of English Proficiency *</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="Duolingo">Duolingo</option>
            <option value="other">Other</option>
            <option value="None">None</option>
          </select>
        </div>
        
        {formData.englishCertificate && formData.englishCertificate !== 'None' && (
          <input
            type="text"
            name="certificateScore"
            placeholder="Score/Grade"
            value={formData.certificateScore}
            onChange={handleChange}
            className="form-input"
          />
        )}
      </div>

      <div className="form-section">
        <h3 className="section-title">Home Address Details</h3>
        
        <div className="form-row">
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="">Country *</option>
            <option value="Morocco">Morocco</option>
            <option value="Algeria">Algeria</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Egypt">Egypt</option>
          </select>
        </div>
        
        <textarea
          name="fullAddress"
          placeholder="Full Address (street, city, province, postal code) *"
          value={formData.fullAddress}
          onChange={handleChange}
          className="form-input"
          rows="3"
        />
      </div>

      <div className="form-section">
        <h3 className="section-title">Educational Background</h3>
        
        {formData.educationalBackground.map((edu, index) => (
          <div key={index} className="repeatable-block">
            <div className="form-row">
              <input
                type="text"
                placeholder="School *"
                value={edu.school}
                onChange={(e) => handleArrayChange('educationalBackground', index, 'school', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Major"
                value={edu.major}
                onChange={(e) => handleArrayChange('educationalBackground', index, 'major', e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <input
                type="date"
                placeholder="Start Date *"
                value={edu.startDate}
                onChange={(e) => handleArrayChange('educationalBackground', index, 'startDate', e.target.value)}
                className="form-input"
              />
              <input
                type="date"
                placeholder="Finish Date *"
                value={edu.finishDate}
                onChange={(e) => handleArrayChange('educationalBackground', index, 'finishDate', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Grade/GPA"
                value={edu.grade}
                onChange={(e) => handleArrayChange('educationalBackground', index, 'grade', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        ))}
        
        <div className="action-buttons">
          <button
            type="button"
            className="add-btn"
            onClick={() => addArrayItem('educationalBackground', {
              school: "", major: "", startDate: "", finishDate: "", grade: ""
            })}
          >
            <Plus size={16} /> Add Educational Background
          </button>
          {formData.educationalBackground.length > 1 && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeArrayItem('educationalBackground', formData.educationalBackground.length - 1)}
            >
              <X size={16} /> Remove
            </button>
          )}
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Work Experience</h3>
        
        {formData.workExperience.map((work, index) => (
          <div key={index} className="repeatable-block">
            <input
              type="text"
              placeholder="Employer *"
              value={work.employer}
              onChange={(e) => handleArrayChange('workExperience', index, 'employer', e.target.value)}
              className="form-input full-width"
            />
            
            <input
              type="text"
              placeholder="Job Title *"
              value={work.jobTitle}
              onChange={(e) => handleArrayChange('workExperience', index, 'jobTitle', e.target.value)}
              className="form-input full-width"
            />
            
            <div className="form-row">
              <input
                type="date"
                placeholder="Start Date *"
                value={work.startDate}
                onChange={(e) => handleArrayChange('workExperience', index, 'startDate', e.target.value)}
                className="form-input"
              />
              <input
                type="date"
                placeholder="End Date"
                value={work.endDate}
                onChange={(e) => handleArrayChange('workExperience', index, 'endDate', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        ))}
        
        <div className="action-buttons">
          <button
            type="button"
            className="add-btn"
            onClick={() => addArrayItem('workExperience', {
              employer: "", jobTitle: "", startDate: "", endDate: ""
            })}
          >
            <Plus size={16} /> Add Work Experience
          </button>
          {formData.workExperience.length > 1 && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeArrayItem('workExperience', formData.workExperience.length - 1)}
            >
              <X size={16} /> Remove
            </button>
          )}
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="form-section">
        <h3 className="section-title">Family Contact</h3>
        
        {formData.familyContacts.map((contact, index) => (
          <div key={index} className="repeatable-block">
            <div className="form-row">
              <input
                type="text"
                placeholder="Name *"
                value={contact.name}
                onChange={(e) => handleArrayChange('familyContacts', index, 'name', e.target.value)}
                className="form-input"
              />
              <select
                value={contact.nationality}
                onChange={(e) => handleArrayChange('familyContacts', index, 'nationality', e.target.value)}
                className="form-input form-select"
              >
                <option value="">Nationality *</option>
                <option value="Morocco">🇲🇦 Morocco</option>
                <option value="Algeria">🇩🇿 Algeria</option>
                <option value="Tunisia">🇹🇳 Tunisia</option>
              </select>
            </div>
            
            <input
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => handleArrayChange('familyContacts', index, 'email', e.target.value)}
              className="form-input"
            />
            
            <div className="form-row">
              <input
                type="text"
                placeholder="Workplace"
                value={contact.workplace}
                onChange={(e) => handleArrayChange('familyContacts', index, 'workplace', e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Position"
                value={contact.position}
                onChange={(e) => handleArrayChange('familyContacts', index, 'position', e.target.value)}
                className="form-input"
              />
            </div>
            
            <select
              value={contact.relationship}
              onChange={(e) => handleArrayChange('familyContacts', index, 'relationship', e.target.value)}
              className="form-input form-select"
            >
              <option value="">Relationship *</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
              <option value="Spouse">Spouse</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
            </select>
          </div>
        ))}
        
        <div className="action-buttons">
          <button
            type="button"
            className="add-btn"
            onClick={() => addArrayItem('familyContacts', {
              name: "", nationality: "", email: "", workplace: "", position: "", relationship: ""
            })}
          >
            <Plus size={16} /> Add A Family Member
          </button>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Financial Supporter (Guarantor)</h3>
        
        <select
          name="guarantorRelationship"
          value={formData.guarantorRelationship}
          onChange={handleChange}
          className="form-input form-select"
        >
          <option value="">Relationship *</option>
          <option value="Self">Self</option>
          <option value="Parent">Parent</option>
          <option value="Guardian">Guardian</option>
          <option value="Friend">Friend</option>
          <option value="Company">Company</option>
          <option value="Government">Government</option>
        </select>
        
        <input
          type="text"
          name="guarantorName"
          placeholder="Guarantor's Name *"
          value={formData.guarantorName}
          onChange={handleChange}
          className="form-input"
        />
        
        <div className="form-row">
          <select
            name="guarantorCountry"
            value={formData.guarantorCountry}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="">Guarantor's Country *</option>
            <option value="Morocco">🇲🇦 Morocco</option>
            <option value="Algeria">🇩🇿 Algeria</option>
            <option value="Tunisia">🇹🇳 Tunisia</option>
          </select>
        </div>
        
        <textarea
          name="guarantorAddress"
          placeholder="Guarantor's Address *"
          value={formData.guarantorAddress}
          onChange={handleChange}
          className="form-input"
          rows="3"
        />
        
        <input
          type="email"
          name="guarantorEmail"
          placeholder="Guarantor's Email"
          value={formData.guarantorEmail}
          onChange={handleChange}
          className="form-input"
        />
        
        <input
          type="text"
          name="guarantorWorkplace"
          placeholder="Workplace"
          value={formData.guarantorWorkplace}
          onChange={handleChange}
          className="form-input"
        />
        
        <textarea
          name="guarantorWorkplaceAddress"
          placeholder="Workplace Address"
          value={formData.guarantorWorkplaceAddress}
          onChange={handleChange}
          className="form-input"
          rows="2"
        />
      </div>

      <div className="form-section">
        <h3 className="section-title">Emergency Contact in China</h3>
        <p className="helper-text">If you don't know anyone in China, we'll assume your country's embassy in China.</p>
        
        <input
          type="text"
          name="emergencyName"
          placeholder="Name"
          value={formData.emergencyName}
          onChange={handleChange}
          className="form-input"
        />
        
        <select
          name="emergencyCountry"
          value={formData.emergencyCountry}
          onChange={handleChange}
          className="form-input form-select"
        >
          <option value="">Country *</option>
          <option value="China">🇨🇳 China</option>
          <option value="Morocco">🇲🇦 Morocco Embassy in China</option>
        </select>
        
        <input
          type="email"
          name="emergencyEmail"
          placeholder="Email"
          value={formData.emergencyEmail}
          onChange={handleChange}
          className="form-input"
        />
        
        <textarea
          name="emergencyAddress"
          placeholder="Complete Address"
          value={formData.emergencyAddress}
          onChange={handleChange}
          className="form-input"
          rows="3"
        />
      </div>
    </>
  );

  const renderStep3 = () => (
    <div className="form-section">
      <h3 className="section-title">Declaration & Agreement</h3>
      
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="acknowledgment"
            checked={formData.acknowledgment}
            onChange={handleChange}
            className="checkbox"
          />
          I have read and understood the{' '}
  <span 
    className="view-details-btn" 
    onClick={() => setShowModal('terms')}
  >
    Terms and Conditions
  </span>{' '} and {' '}
  <span 
    className="view-details-btn" 
    onClick={() => setShowModal('privacy')}
  >
    Privacy Policy
  </span>{' '}
  of Diravenir.
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="checkbox"
          />
          I give consent to Diravenir to collect, process, and share my data with relevant parties for the purpose of admission and visa processing.
            View details
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="accuracy"
            checked={formData.accuracy}
            onChange={handleChange}
            className="checkbox"
          />
          I declare that the information and documents provided in my application are accurate and authentic to the best of my knowledge.
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="paymentPolicy"
            checked={formData.paymentPolicy}
            onChange={handleChange}
            className="checkbox"
          />
          I have read and understood the Payment Policy of Diravenir and agree to its terms.
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="refundPolicy"
            checked={formData.refundPolicy}
            onChange={handleChange}
            className="checkbox"
          />
          I have read and understood the{' '}
  <span 
    className="view-details-btn" 
    onClick={() => setShowModal('refund')}
  >
    Refund Policy
  </span>{' '}  of Diravenir and agree to its terms.
        </label>
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="compliance"
            checked={formData.compliance}
            onChange={handleChange}
            className="checkbox"
          />
          I agree to attend all required courses, interviews, and exams as outlined in the application process. I will abide by the laws and regulations of the university and Diravenir.
        </label>
      </div>
    </div>
  );

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
          <button
            type="button"
            className="remove-file-btn"
            onClick={() => handleFileUpload(documentType, null)}
          >
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
        <h4>Payment Options</h4>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="card" />
          Credit/Debit Card (Visa/Mastercard)
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="transfer" />
          Bank Transfer
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="wafacash" />
          Wafacash / Cashplus
        </label>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="cash" />
          Cash in our office
        </label>
      </div>
    </div>
  );

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
      {/* Progress bar */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          {["Your Info", "Family", "Agreement", "Documents", "Final Step"].map(
            (label, index) => {
              const stepNumber = index + 1;
              return (
                <div
                  key={index}
                  className={`progress-step ${
                    step >= stepNumber ? "active" : ""
                  }`}
                >
                  <div className="circle">{stepNumber}</div>
                  <span className="step-label">{label}</span>
                  {stepNumber < 5 && <div className="line" />}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Layout principal */}
      <div className="application-content">
        {/* Formulaire principal */}
        <div className="application-form">
          <h2 className="form-title">Your Application</h2>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}

          {/* Navigation buttons */}
          <div className="nav-buttons">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="prev-btn"
            >
              Previous
            </button>
            <button
              onClick={step === 5 ? handleSubmit : nextStep}
              className="next-btn"
            >
              {step === 5 ? "Agree & Pay" : "Next"}
            </button>
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="application-summary">
          <h3>Your Application Summary</h3>
          
          <div className="summary-details">
            <p>
              <strong>Application ID:</strong> <span className="highlight1">{applicationId}</span>
            </p>
            <p>
              <strong>Application Fees:</strong> 4000 MAD
            </p>
            <p>
              <strong>Service Fees:</strong> 11000 MAD
            </p>
          </div>

          {/* Program info block */}
          {program ? (
            <div className="program-info">
              <img
                src={program.logo ? `http://localhost:8000/media/logo/${program.logo}` : "/default-logo.png"}
                alt={`${program.universities} logo`}
                className="program-logo"
                onError={(e) => {
                  e.target.src = "/default-logo.png";
                }}
              />
              <h4 className="program-title">{program.degree_type} in {program.program}</h4>
              <span className="program-degree"></span>
              <p className="program-status">
                Current Status: <strong className="status-open">{program.scholarship}</strong>
              </p>
            </div>
          ) : (
            <div className="program-info">
              <div className="program-logo-placeholder"></div>
              <h4 className="program-title">Programme en cours de chargement...</h4>
              <span className="program-degree">-</span>
              <p className="program-university">-</p>
              <p className="program-city">-</p>
              <p className="program-status">
                Current Status: <strong className="status-loading">Loading...</strong>
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Modals */}
      {showModal && renderModal()}

      <style jsx>{`
        .application-container {
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 15px;
          background-color: #f5f5f5;
          min-height: 100vh;
        }

        .success-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .success-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.6s ease-out;
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

        .success-icon {
          margin-bottom: 24px;
        }

        .success-title {
          color: #111827;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .success-message {
          color: #6B7280;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .application-id-card {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          margin: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .id-label {
          font-size: 14px;
          opacity: 0.9;
        }

        .id-value {
          font-size: 18px;
          font-weight: 700;
        }

        .next-steps {
          text-align: left;
          background: #F9FAFB;
          padding: 24px;
          border-radius: 12px;
          margin: 20px 0;
        }

        .next-steps h3 {
          color: #111827;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .next-steps ul {
          list-style: none;
          padding: 0;
        }

        .next-steps li {
          color: #6B7280;
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }

        .next-steps li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #10B981;
          font-weight: bold;
        }

        .return-dashboard-btn {
          background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
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
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
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
          color: #5e2ca5;
          font-weight: 600;
        }

        .progress-step.active .step-label::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #5e2ca5;
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
          background: #5e2ca5;
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
          color: #5e2ca5;
          margin-bottom: 30px;
          font-size: 1.8rem;
          font-weight: 600;
          border-bottom: 3px solid #5e2ca5;
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
          color: #fbbf24;
          margin-bottom: 15px;
          font-size: 1.2rem;
          font-weight: 600;
          padding-bottom: 8px;
          border-bottom: 2px solid #fbbf24;
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
          border-color: #5e2ca5;
          box-shadow: 0 0 0 3px rgba(94, 44, 165, 0.1);
        }

        .form-input.error {
          border-color: #e53e3e;
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

        .repeatable-block {
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 15px;
          background: #fafafa;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .add-btn {
          background: #5e2ca5;
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
          background: #4a1e87;
          transform: translateY(-1px);
        }

        .remove-btn {
          background: #e8d5f0;
          color: #5e2ca5;
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
        }

        .checkbox {
          margin: 0;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .view-details-btn {
          background: none;
          border: none;
          color: #5e2ca5;
          text-decoration: underline;
          cursor: pointer;
          font-size: 13px;
          margin-left: 8px;
        }

        .helper-text {
          font-size: 13px;
          color: #666;
          margin-bottom: 15px;
          font-style: italic;
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
          color: #28a745;
          margin-left: 10px;
        }

        .document-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .file-upload-btn {
          background: #5e2ca5;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
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
        }

        .upload-instructions {
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
          background: #f0f0f0;
          padding: 10px;
          border-radius: 6px;
        }

        .payment-summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .payment-summary h4 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #5e2ca5;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .summary-row.total {
          font-weight: bold;
          border-top: 1px solid #ddd;
          padding-top: 10px;
          margin-top: 15px;
        }

        .payment-options {
          margin-top: 20px;
        }

        .payment-options h4 {
          margin-bottom: 15px;
          color: #5e2ca5;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 10px;
          cursor: pointer;
        }

        .payment-option:hover {
          background: #f8f9fa;
        }

        .nav-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .prev-btn, .next-btn {
          background: #5e2ca5;
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
          background: #4a1e87;
          transform: translateY(-1px);
        }

        .prev-btn:disabled {
          background: #aaa;
          cursor: not-allowed;
          transform: none;
        }

        .prev-btn:disabled:hover {
          background: #aaa;
          transform: none;
        }

        .application-summary {
          flex: 1;
          background: linear-gradient(135deg, #4b014e 0%, #7b1883 100%);
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
          color: #4b014e;
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

        .program-logo-placeholder {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #7b1883 0%, #9b2aa3 100%);
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

        .program-title {
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
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          margin: 20px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
          margin: 0;
          color: #5e2ca5;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
        }

        .modal-body {
          padding: 25px;
          line-height: 1.6;
        }

        .modal-body ol {
          padding-left: 20px;
        }

        .modal-body li {
          margin-bottom: 12px;
        }

        .modal-body h4 {
          color: #5e2ca5;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .application-container {
            padding: 10px;
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
        }
      `}</style>
    </div>
  );
}

export default ApplicationForm;