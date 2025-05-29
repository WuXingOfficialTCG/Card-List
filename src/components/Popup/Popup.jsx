import React from 'react';
import './popup.css';

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
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>

        {!isFirst && (
          <button
            className="popup-nav popup-prev"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            ‹
          </button>
        )}

        <div className="popup-image-zoom-container">
          <img
            src={card.immagine}
            alt={card.nome}
            className="popup-image"
            draggable={false}
          />
        </div>

        <div className="popup-controls">
          <button
            onClick={() => onRemoveOne(card)}
            disabled={deckCount <= 0}
            aria-label="Rimuovi una copia"
          >
            −
          </button>
          <span className="popup-count">{deckCount}</span>
          <button
            onClick={() => onAddCard(card)}
            disabled={deckCount >= 3}
            aria-label="Aggiungi una copia"
          >
            +
          </button>
        </div>

        {!isLast && (
          <button
            className="popup-nav popup-next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
