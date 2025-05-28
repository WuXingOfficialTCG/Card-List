import React from 'react';
import './popupDeckView.css';

export default function PopupDeckView({ deck, onClose }) {
  return (
    <div className="popup-deck-overlay" onClick={onClose}>
      <div className="popup-deck-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-deck-close" onClick={onClose}>×</button>
        <h2>Deck</h2>

        {deck.length === 0 ? (
          <p>Deck vuoto</p>
        ) : (
          <div className="deck-grid">
            {deck.map(({ card, count }, index) => (
              <div key={index} className="deck-card">
                <img src={card.immagine} alt={card.nome} className="deck-card-image" />
                <span className="deck-card-count">×{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
