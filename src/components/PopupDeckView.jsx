import React from 'react';
import './popupDeckView.css';

export default function PopupDeck({ deck, onClose }) {
  return (
    <div
      className="popup-deck-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizzazione del mazzo"
    >
      <section
        className="popup-deck-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="popup-deck-close"
          onClick={onClose}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        <header className="popup-deck-header">
          <h2 className="popup-deck-title">Mazzo ({deck.length} carte)</h2>
        </header>

        <div className="deck-grid">
          {deck.map(({ card, count }) => (
            <div key={card.id || card.nome} className="deck-card">
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
      </section>
    </div>
  );
}
