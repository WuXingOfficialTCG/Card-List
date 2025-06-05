import React, { useState } from 'react';
import './cardgrid.css';
import './cardgridResponsive.css';

export default function CardGrid({ cards, onCardClick }) {
  const [showItalian, setShowItalian] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify(card));
  };

  const toggleLanguage = () => {
    setShowItalian(prev => !prev);
  };

  return (
    <div className="card-grid-container">
      <button className="language-toggle-button" onClick={toggleLanguage}>
        {showItalian ? 'Versione Inglese' : 'Versione Italiana'}
      </button>

      {cards.length === 0 ? (
        <p className="no-cards-message">Nessuna carta trovata.</p>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <img
              key={card.id}
              src={showItalian ? card.immagineIta : card.immagine}
              alt={card.nome}
              className="card-image"
              onClick={() => onCardClick(card)}
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
