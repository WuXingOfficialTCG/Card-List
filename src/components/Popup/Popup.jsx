import React from 'react';
import './popup.css';
import './PopupResponsive.css;

export default function Popup({ card, onClose, onPrev, onNext, isFirst, isLast }) {
  return (
    <div className="popup-overlay" onClick={() => {
      console.log('Overlay clicked: close popup');
      onClose();
    }}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={() => {
          console.log('Close button clicked');
          onClose();
        }}>×</button>

        {!isFirst && (
          <button
            className="popup-nav popup-prev"
            onClick={e => {
              e.stopPropagation();
              console.log('Prev clicked');
              onPrev();
            }}
            aria-label="Carta precedente"
          >
            ‹
          </button>
        )}

        <img src={card.immagine} alt={card.nome} className="popup-image" />

        {!isLast && (
          <button
            className="popup-nav popup-next"
            onClick={e => {
              e.stopPropagation();
              console.log('Next clicked');
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
