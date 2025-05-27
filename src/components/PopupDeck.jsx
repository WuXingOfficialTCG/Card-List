import React from 'react';
import './popupDeck.css';

export default function PopupDeck({ deck = [], onClose }) {
  if (!deck || deck.length === 0) return null;

  return (
    <div className="popup-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="popupdeck-title">
      <div className="popup-content popup-deck-view" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <h2 id="popupdeck-title">Mazzo</h2>
        <div className="deck-image-grid">
          {deck.map(({ card, count }, index) => (
            <div key={index} className="deck-card-wrapper">
              {[...Array(count)].map((_, i) => (
                <img
                  key={i}
                  src={card.immagine}
                  alt={card.nome}
                  className="deck-card-img"
                  title={card.nome}
                />
              ))}
            </div>
          ))}
        </div>
        <button className="popup-close" onClick={onClose} aria-label="Chiudi popup">×</button>
      </div>
    </div>
  );
}
