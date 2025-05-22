import React from 'react';
import './popup.css';

export default function Popup({ card, onClose, onPrev, onNext, isFirst, isLast }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        {/* Pulsante freccia sinistra */}
        {!isFirst && (
          <button className="popup-nav popup-prev" onClick={onPrev}>
            ‹
          </button>
        )}

        {/* Immagine della carta */}
        <img src={card.immagine} alt={card.nome} className="popup-image" />

        {/* Pulsante freccia destra */}
        {!isLast && (
          <button className="popup-nav popup-next" onClick={onNext}>
            ›
          </button>
        )}

        {/* Pulsante di chiusura */}
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
