import React from 'react';
import './supportpopup.css';

export default function SupportPopup({ onClose }) {
  // Chiude il popup se clicchi sull'overlay (fuori dal popup)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="support-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="support-popup-title">
      <div className="support-popup">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Chiudi popup di supporto"
        >
          ✕
        </button>
        <h2 id="support-popup-title">Support Us!</h2>
        <p>If you enjoy the project, consider supporting it 💖</p>
        <a
          href="paypal.me/WuXingOfficial"
          target="_blank"
          rel="noopener noreferrer"
          className="paypal-btn"
        >
          Donate via PayPal
        </a>
      </div>
    </div>
  );
}
