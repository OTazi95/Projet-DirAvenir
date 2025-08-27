import React from 'react';
import '../styles/TermsOfService.css';

const PrivacyPolicy = () => {
  return (
    <div className="terms-container">
      <div className="terms-wrapper">
        {/* Header */}
        <header className="terms-header">
          <h1 className="terms-title">PRIVACY POLICY</h1>
          <p className="terms-subtitle">
            This Privacy Policy explains how Diravenir, operated by Diravenir (a company registered in Morocco), collects, uses, and protects your personal data when you use our online platform, in full compliance with Moroccan Law No. 09-08.
          </p>
          <div className="terms-notice">
            <div className="notice-icon">🔒</div>
            <p>
              By using our platform, you acknowledge that you have read and understood this Privacy Policy, including your rights under Law No. 09-08 and the oversight of the CNDP.
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="terms-content">
          {/* Section 1 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">1</span>
              <h2>Information We Collect</h2>
            </div>
            <div className="section-content">
              <p>
                We collect data only as necessary and proportionate to deliver and improve our services, in line with Law No. 09-08.
              </p>
              <div className="subsection">
                <h3>1.1. Personal Information</h3>
                <p>
                  Data you provide during registration and application, such as full name, date of birth, contact details (email, phone number), and passport information.
                </p>
              </div>
              <div className="subsection">
                <h3>1.2. Academic Information</h3>
                <p>
                  Transcripts, academic certificates, diplomas, and any other educational records required for your application.
                </p>
              </div>
              <div className="subsection">
                <h3>1.3. Payment Information</h3>
                <p>
                  For processing service charges, we may collect details such as bank information, card confirmations, or other transaction data.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">2</span>
              <h2>How We Use Your Information</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>2.1. Purposes of Processing</h3>
                <p>
                  We use your data to: (a) process and submit applications to partner universities and programs; (b) facilitate and manage scholarship applications; (c) communicate application status and provide support; and (d) improve our services, user experience, and platform functionality.
                </p>
              </div>
              <div className="subsection">
                <h3>2.2. Legal Basis & Consent</h3>
                <p>
                  Collection and processing are carried out with your explicit and informed consent, as required by Law No. 09-08.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">3</span>
              <h2>Data Sharing</h2>
            </div>
            <div className="section-content">
              <p>
                We only share your personal data with authorized third parties when necessary to provide our services:
              </p>
              <div className="subsection">
                <h3>3.1. Partner Universities</h3>
                <p>
                  To process your admission applications.
                </p>
              </div>
              <div className="subsection">
                <h3>3.2. Governmental Bodies</h3>
                <p>
                  To facilitate visa or study permit applications where required by law.
                </p>
              </div>
              <div className="subsection">
                <h3>3.3. Authorized Service Providers</h3>
                <p>
                  Payment processors and other essential providers who support our operations.
                </p>
              </div>
              <div className="subsection warning-box">
                <h3>3.4. International Transfers & CNDP Authorization</h3>
                <p>
                  Any transfer of personal data to a foreign country is subject to prior authorization by the CNDP, in accordance with Law No. 09-08.
                </p>
              </div>
              <div className="subsection">
                <h3>3.5. No Sale of Data</h3>
                <p>
                  We do not sell, rent, or trade your personal data for marketing or commercial purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">4</span>
              <h2>Data Security</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>4.1. Technical & Organizational Measures</h3>
                <p>
                  We apply appropriate safeguards—including encryption, secure servers, and strict access controls—to protect against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
                </p>
              </div>
              <div className="subsection">
                <h3>4.2. Continuous Improvement</h3>
                <p>
                  We regularly review and update our security practices to maintain compliance with Law No. 09-08.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">5</span>
              <h2>Your Rights (Law No. 09-08)</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>5.1. Access & Copy</h3>
                <p>
                  Obtain a copy of your personal data held by us.
                </p>
              </div>
              <div className="subsection">
                <h3>5.2. Rectification</h3>
                <p>
                  Request correction of inaccurate or incomplete data.
                </p>
              </div>
              <div className="subsection">
                <h3>5.3. Objection</h3>
                <p>
                  Object to processing for legitimate reasons.
                </p>
              </div>
              <div className="subsection">
                <h3>5.4. Deletion</h3>
                <p>
                  Request deletion when data is no longer necessary for its original purpose.
                </p>
              </div>
              <div className="subsection">
                <h3>5.5. Contact</h3>
                <p>
                  You can exercise these rights by contacting us at <strong>Contact@Diravenir.com</strong>. We will process your request within a reasonable timeframe, consistent with CNDP procedures.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">6</span>
              <h2>Cookies</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>6.1. Usage</h3>
                <p>
                  We use cookies and similar technologies to enhance user experience, analyze platform usage, and personalize content.
                </p>
              </div>
              <div className="subsection">
                <h3>6.2. Preferences</h3>
                <p>
                  You can manage cookie preferences in your browser. Disabling cookies may affect certain platform features.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">7</span>
              <h2>Compliance, CNDP & Changes</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>7.1. CNDP Declaration</h3>
                <p>
                  As a data controller operating in Morocco, Diravenir has submitted a prior declaration to the CNDP regarding the processing of personal data and is committed to upholding the principles of Law No. 09-08.
                </p>
              </div>
              <div className="subsection">
                <h3>7.2. Updates to this Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you by posting the new policy on this page and encourage you to review it periodically.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="terms-footer">
          <div className="footer-content">
            <p>This Privacy Policy is governed by Moroccan law.</p>
            <div className="footer-info">
              <span>© 2024 Diravenir</span>
              <span>•</span>
              <span>All rights reserved</span>
              <span>•</span>
              <span>Company registered in Morocco</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
