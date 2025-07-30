import React from 'react';
import '../styles/Notification.css';

function Notification({ message }) {
  return (
    <div className="notification">
      {message}
    </div>
  );
}

export default Notification;
