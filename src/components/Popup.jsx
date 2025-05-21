import React from 'react';
import './popup.css';

export default function Popup({ cards, currentIndex, onClose, onPrev, onNext }) {
  if (currentIndex === null) return null;

  const card = cards[currentIndex];

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        
        <button className="popup-arrow left" onClick={onPrev} aria-label="Previous card">
          ‹
        </button>
        
        <img src={card.immagine} alt={card.nome} className="popup-image" />
        
        <button className="popup-arrow right" onClick={onNext} aria-label="Next card">
          ›
        </button>
      </div>
    </div>
  );
}
