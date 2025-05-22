import React from 'react';
import './supportpopup.css';

export default function SupportPopup({ onClose }) {
  return (
    <div className="support-overlay">
      <div className="support-popup">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Support Us!</h2>
        <p>If you enjoy the project, consider supporting it 💖</p>
        <a
          href="https://www.paypal.com/donate"
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
