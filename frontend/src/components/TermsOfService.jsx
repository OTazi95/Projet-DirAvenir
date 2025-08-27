import React from 'react';
import '../styles/TermsOfService.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-wrapper">
        {/* Header */}
        <header className="terms-header">
          <h1 className="terms-title">TERMES ET CONDITIONS</h1>
          <p className="terms-subtitle">
            Bienvenue sur Diravenir, une plateforme en ligne pour l'orientation académique et les candidatures aux programmes à l'étranger.
          </p>
          <div className="terms-notice">
            <div className="notice-icon">⚠️</div>
            <p>
              En accédant, utilisant ou soumettant une candidature via notre plateforme, vous confirmez avoir lu, 
              compris et accepté d'être lié par ces Termes et Conditions.
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="terms-content">
          {/* Section 1 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">1</span>
              <h2>Acceptation des Termes</h2>
            </div>
            <div className="section-content">
              <p>
                Il s'agit d'un accord juridiquement contraignant entre vous, le Candidat ou Utilisateur, 
                et Diravenir, exploité par Diravenir, une société enregistrée sous le droit marocain. 
                Ces Termes et Conditions, ainsi que notre Politique de Confidentialité, constituent 
                l'accord complet concernant votre utilisation de la plateforme.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">2</span>
              <h2>Éligibilité</h2>
            </div>
            <div className="section-content">
              <p>
                Nos services sont disponibles aux individus qui remplissent les critères d'éligibilité 
                pour les universités, institutions et programmes spécifiques auxquels ils candidatent. 
                Vous devez fournir des informations exactes, authentiques et complètes à toutes les 
                étapes du processus de candidature, conformément au droit marocain applicable.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">3</span>
              <h2>Processus de Candidature</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>3.1. Fonction du Service</h3>
                <p>
                  Diravenir facilite le processus de candidature en fournissant un portail centralisé 
                  pour soumettre des documents et informations à diverses universités et programmes éducatifs.
                </p>
              </div>
              <div className="subsection">
                <h3>3.2. Soumission de Documents</h3>
                <p>
                  Vous êtes tenu de télécharger tous les documents nécessaires spécifiés pour 
                  votre/vos programme(s) choisi(s).
                </p>
              </div>
              <div className="subsection">
                <h3>3.3. Révision et Approbation</h3>
                <p>
                  La soumission d'une candidature ne garantit pas l'admission. Toutes les candidatures 
                  sont soumises à une révision approfondie et à l'approbation finale par l'université 
                  ou l'institution éducative respective et toute autre autorité gouvernementale ou 
                  réglementaire pertinente.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">4</span>
              <h2>Frais et Charges de Service</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>4.1. Frais de Service Diravenir</h3>
                <p>
                  En utilisant notre plateforme, vous acceptez de payer les frais de service applicables 
                  pour les services fournis par Diravenir. Ces frais sont décrits sur la plateforme ou 
                  vous sont communiqués avant le paiement.
                </p>
              </div>
              <div className="subsection warning-box">
                <h3>4.2. Politique de Non-Remboursement</h3>
                <p>
                  <strong>Tous les frais de service payés à Diravenir sont non-remboursables</strong> 
                  sauf indication contraire explicite dans une Politique de Remboursement séparée. 
                  Cette politique est conforme aux réglementations de protection des consommateurs au Maroc.
                </p>
              </div>
              <div className="subsection">
                <h3>4.3. Frais de Tiers</h3>
                <p>
                  Vous êtes seul responsable de tous les frais supplémentaires, y compris mais sans 
                  s'y limiter, les frais de candidature universitaires, les frais de demande de visa, 
                  les frais d'examens de compétence linguistique, les frais de voyage, ou tout autre 
                  coût imposé par des tiers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">5</span>
              <h2>Responsabilités du Candidat</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>5.1. Exactitude des Informations</h3>
                <p>
                  Vous êtes responsable de vous assurer que toutes les informations, documents et données 
                  que vous fournissez à Diravenir sont vrais, exacts et complets. 
                  <span className="highlight-danger">
                    Fournir des informations fausses, trompeuses ou frauduleuses est strictement interdit
                  </span> 
                  et peut entraîner la résiliation de votre compte et candidature, et peut vous exposer 
                  à des conséquences légales sous le droit marocain.
                </p>
              </div>
              <div className="subsection">
                <h3>5.2. Conformité</h3>
                <p>
                  Vous êtes responsable d'assister à tout entretien, examen ou réunion requis par 
                  les universités ou par Diravenir.
                </p>
              </div>
              <div className="subsection">
                <h3>5.3. Conformité Légale</h3>
                <p>
                  Vous devez vous conformer à toutes les lois et réglementations locales, nationales 
                  et internationales applicables liées à votre candidature et à vos études à l'étranger.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">6</span>
              <h2>Utilisation de la Plateforme</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>6.1. Conduite Interdite</h3>
                <p>Vous acceptez de ne pas vous engager dans les activités interdites suivantes :</p>
                <div className="prohibited-list">
                  <ul>
                    <li>Partager vos identifiants de compte avec une tierce partie</li>
                    <li>Soumettre des informations frauduleuses, malveillantes ou non autorisées</li>
                    <li>Tenter d'interférer avec le bon fonctionnement de la plateforme</li>
                  </ul>
                </div>
              </div>
              <div className="subsection">
                <h3>6.2. Résiliation d'Accès</h3>
                <p>
                  Diravenir se réserve le droit de suspendre ou de résilier votre accès à la plateforme 
                  sans préavis si nous croyons, à notre seule discrétion, que vous avez violé ces Termes 
                  et Conditions ou vous êtes engagé dans un comportement frauduleux ou illégal.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="terms-section">
            <div className="section-header">
              <span className="section-number">7</span>
              <h2>Limitations de Responsabilité</h2>
            </div>
            <div className="section-content">
              <div className="subsection">
                <h3>7.1. Circonstances Hors de Notre Contrôle</h3>
                <p>Diravenir n'est pas responsable des résultats ou circonstances hors de son contrôle raisonnable, notamment :</p>
                <div className="liability-list">
                  <ul>
                    <li>Rejet de votre candidature par une université</li>
                    <li>Retard ou rejet d'un visa ou permis d'études</li>
                    <li>Retards causés par des tiers, tels que les services postaux, universités ou organismes gouvernementaux</li>
                  </ul>
                </div>
              </div>
              <div className="subsection">
                <h3>7.2. Clause de Non-Responsabilité Générale</h3>
                <p>
                  Les services sont fournis "tels quels" et "selon disponibilité". Diravenir ne fait 
                  aucune garantie, expresse ou implicite, concernant l'exactitude, l'exhaustivité ou 
                  la fiabilité des services. Vous utilisez la plateforme à vos propres risques.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="terms-footer">
          <div className="footer-content">
            <p>Ces Termes et Conditions sont régis par le droit marocain.</p>
            <div className="footer-info">
              <span>© 2024 Diravenir</span>
              <span>•</span>
              <span>Tous droits réservés</span>
              <span>•</span>
              <span>Société enregistrée au Maroc</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;