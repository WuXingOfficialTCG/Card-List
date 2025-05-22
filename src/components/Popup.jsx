import React from 'react';
import './popup.css';

export default function Popup({ card, onClose, onPrev, onNext, isFirst, isLast }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        
        {/* Freccia sinistra */}
        {!isFirst && (
          <button
            className="popup-nav popup-prev"
            onClick={e => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Carta precedente"
          >
            ‹
          </button>
        )}
        
        <img src={card.immagine} alt={card.nome} className="popup-image" />
        
        {/* Freccia destra */}
        {!isLast && (
          <button
            className="popup-nav popup-next"
            onClick={e => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Carta successiva"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
