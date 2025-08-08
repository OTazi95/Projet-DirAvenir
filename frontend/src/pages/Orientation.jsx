import React from 'react';
import '../styles/Orientation.css';
import orientationImage from '../assets/orien.png';

function Orientation() {
  return (
    <div className="orientation-wrapper">
      <h1 className="orientation-title">
        Find your <span className="highlight"> major match</span> 
      </h1>

      <div className="orientation-content">
        {/* BOUTONS À GAUCHE */}
        <div className="orientation-form">
          <div className="help-section">
            <p className="help-text">Ok, Let me help you</p>
            <div className="buttons-container">
         <button className="btn-primary"> <span>Start</span>
           <span>The Test</span></button>
         <button className="btn-secondary"><span>Read About</span> <span>Programs</span></button>
           </div>
          </div>
        </div>

        {/* IMAGE À DROITE */}
        <div className="orientation-image">
          <img src={orientationImage} alt="Orientation Visual" />
        </div>
      </div>
    </div>
  );
}

export default Orientation;