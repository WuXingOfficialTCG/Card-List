import React from 'react'; // stile base specifico per DeckView

export default function PopupDeckView({ deck, onClose }) {
  return (
    <div className="deckview-popup-overlay" onClick={onClose}>
      <div className="deckview-popup-content" onClick={e => e.stopPropagation()}>
        <button className="deckview-popup-close" onClick={onClose}>×</button>
        <h2>Deck Attuale</h2>

        <div className="deckview-image-grid">
          {deck.map(({ card, count }) => (
            <div key={card.id} className="deckview-card-image-wrapper">
              <img src={card.immagine} alt={card.nome} className="deckview-card-image" />
              <span className="deckview-card-count-badge">{count}x</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
