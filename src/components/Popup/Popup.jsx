import React, { useRef } from 'react';
import './popup.css';
import './PopupResponsive.css';

export default function Popup({ card, onClose, onPrev, onNext, isFirst, isLast }) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && !isFirst) {
        console.log('Swipe right: prev');
        onPrev();
      } else if (deltaX < 0 && !isLast) {
        console.log('Swipe left: next');
        onNext();
      }
    }
  };

  return (
    <div
      className="popup-overlay"
      onClick={() => {
        console.log('Overlay clicked: close popup');
        onClose();
      }}
    >
      <div
        className="popup-content"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="popup-close"
          onClick={() => {
            console.log('Close button clicked');
            onClose();
          }}
        >
          ×
        </button>

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
