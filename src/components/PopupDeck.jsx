import React from 'react';
import './popupDeck.css';

export default function PopupDeck({ deck = [], onClose }) {
  if (!deck || deck.length === 0) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-content popup-deck-view">
        <h2>Mazzo</h2>
        <div className="deck-image-grid">
          {deck.map(({ card, count }, index) => (
            <div key={index} className="deck-card-wrapper">
              <img
                src={card.immagine}
                alt={card.nome}
                className="deck-card-img"
                title={card.nome}
              />
              <span className={`card-count-badge ${count === 3 ? 'max-copies' : ''}`}>
                {count}
              </span>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
}
