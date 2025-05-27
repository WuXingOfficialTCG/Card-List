import React from 'react';
import './popupDeck.css';

export default function PopupDeck({ deck = [], onClose }) {
  if (!deck || deck.length === 0) return null;

  const expandedCards = deck.flatMap(({ card, count }) =>
    Array.from({ length: count }, () => card)
  );

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content popup-deck-view" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Chiudi popup">×</button>
        <h2>Carte del Mazzo</h2>
        <div className="deck-image-grid">
          {expandedCards.map((card, index) => (
            <img
              key={index}
              src={card.immagine}
              alt={card.nome}
              title={card.nome}
              className="deck-card-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
