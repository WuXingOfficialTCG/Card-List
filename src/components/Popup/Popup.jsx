import React, { useRef } from 'react';
import TiltCard from './TiltCard'; // importa tilt senza + e -
import './popup.css';
import './PopupResponsive.css';

export default function Popup({
  card,
  onClose,
  onPrev,
  onNext,
  isFirst,
  isLast,
  onAddCard,
  onRemoveOne,
  deckCount = 0,
}) {
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
        onPrev();
      } else if (deltaX < 0 && !isLast) {
        onNext();
      }
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="popup-close" onClick={onClose}>×</button>

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

        <TiltCard src={card.immagine} alt={card.nome} className="popup-image" />

        <div
          className="popup-controls"
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={() => onRemoveOne(card)}
            disabled={deckCount <= 0}
            style={{
              fontSize: '20px',
              padding: '6px 12px',
              cursor: deckCount <= 0 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Rimuovi una copia"
          >
            −
          </button>

          <span style={{ fontSize: '18px', alignSelf: 'center' }}>{deckCount}</span>

          <button
            onClick={() => onAddCard(card)}
            disabled={deckCount >= 3}  // disabilita se 3 copie raggiunte
            style={{
              fontSize: '20px',
              padding: '6px 12px',
              cursor: deckCount >= 3 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Aggiungi una copia"
          >
            +
          </button>
        </div>

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
