import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ApplicationForm.css";

function ApplicationForm() {
  const { programId } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Contact Details
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
    
    // Language Proficiency
    englishLevel: "",
    englishCertificate: "",
    
    // Home Address Details
    country: "",
    homeAddress: "",
    maritalStatus2: "",
    parentsCityState: "",
    
    // Educational Background
    school: "",
    major: "",
    graduatedYear: "",
    branchArea: "",
    scores: "",
    
    // Work Experience
    employer: "",
    jobTitle: "",
    startDate: "",
    endDate: ""
  });

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
      
      // Utiliser l'API existante qui fonctionne
      const response = await axios.get(`http://localhost:8000/api/program-detail-with-similar/${programId}/`);
      
      console.log('Program data loaded:', response.data);
      // Récupérer seulement les données du programme principal
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Logique de soumission
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="application-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des informations du programme...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="application-container">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={() => window.history.back()}>Retour</button>
        </div>
      </div>
    );
  }

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

          {/* Contact Details Section */}
          <div className="form-section">
            <h3 className="section-title">Contact Details</h3>
            
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
            
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
            
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Student's Information Section */}
          <div className="form-section">
            <h3 className="section-title">Student's Information</h3>
            
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
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
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            
            <div className="form-row">
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                value={formData.passportNumber}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="date"
                name="ped"
                placeholder="Passport Expiry Date *"
                value={formData.dob}
                onChange={handleChange}
                className="form-input"
              />              
              <div className="file-upload-wrapper">
                <input type="file" className="file-input" accept=".pdf,.jpg,.png" />
                <span className="file-upload-icon">📎</span>
              </div>
            </div>
          </div>

          {/* Language Proficiency Section */}
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
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
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
                <option value="Cambridge">Cambridge</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Home Address Details Section */}
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
              
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address *"
                value={formData.homeAddress}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <select
                name="maritalStatus2"
                value={formData.maritalStatus2}
                onChange={handleChange}
                className="form-input form-select"
              >
                <option value="">Marital Status *</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
              
              <input
                type="text"
                name="parentsCityState"
                placeholder="Parents City/State *"
                value={formData.parentsCityState}
                onChange={handleChange}
                className="form-input"
              />
              
              <div className="file-upload-wrapper">
                <input type="file" className="file-input" accept=".pdf,.jpg,.png" />
                <span className="file-upload-icon">📎</span>
              </div>
            </div>
          </div>

          {/* Educational Background Section */}
          <div className="form-section">
            <h3 className="section-title">Educational Background</h3>
            
            <div className="form-row">
              <input
                type="text"
                name="school"
                placeholder="School *"
                value={formData.school}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <input
                type="date"
                name="graduatedYear"
                placeholder="Graduated Year *"
                value={formData.graduatedYear}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="grade"
                placeholder="Grade *"
                value={formData.grade}
                onChange={handleChange}
                className="form-input"
              />
              <div className="file-upload-wrapper">
                <input type="file" className="file-input" accept=".pdf,.jpg,.png" />
                <span className="file-upload-icon">📎</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="action-buttons">
              <button className="add-btn">
                Add Educational Background
              </button>
              <button className="remove-btn">
                Remove
              </button>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="form-section">
            <h3 className="section-title">Work Experience</h3>
            
            <input
              type="text"
              name="employer"
              placeholder="Employer *"
              value={formData.employer}
              onChange={handleChange}
              className="form-input full-width"
            />
            
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title *"
              value={formData.jobTitle}
              onChange={handleChange}
              className="form-input full-width"
            />
            
            <div className="form-row">
              <input
                type="date"
                name="startDate"
                placeholder="Start Date *"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <input
                type="date"
                name="endDate"
                placeholder="End Date *"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            {/* Action buttons */}
            <div className="action-buttons">
              <button className="add-btn">
                Add Professional Experience
              </button>
              <button className="remove-btn">
                Remove
              </button>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="nav-buttons">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="prev-btn"
            >
              Back
            </button>
            <button
              onClick={step === 5 ? handleSubmit : nextStep}
              className="next-btn"
            >
              {step === 5 ? "Submit" : "Next"}
            </button>
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="application-summary">
          <h3>Your Application Summary</h3>
          
          <div className="summary-details">
            <p>
              <strong>Application ID:</strong> <span className="highlight1">{Math.floor(Math.random() * 1000000)}</span>
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
    </div>
  );
}

export default ApplicationForm;