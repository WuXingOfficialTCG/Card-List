import React from 'react';
import './popup.css';

export default function Popup({ card, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <img src={card.immagine} alt={card.nome} className="popup-image" />
      </div>
    </div>
  );
}
