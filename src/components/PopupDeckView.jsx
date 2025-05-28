import React from 'react';
import './popupDeckView.css';  // Assicurati che contenga il CSS che hai scritto

export default function PopupDeck({ deck, onClose }) {
  return (
    <div className="popup-deck-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="popup-deck-content"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="popup-deck-close"
          onClick={onClose}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        <h2>Deck ({deck.length} carte)</h2>

        <div className="deck-grid">
          {deck.map(({ card, count }, index) => (
            <div key={index} className="deck-card">
              <img
                src={card.immagine}
                alt={card.nome}
                className="deck-card-image"
                draggable={false}
              />
              <div className="deck-card-count">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
