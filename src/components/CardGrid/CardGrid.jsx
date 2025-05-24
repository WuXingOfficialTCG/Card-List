import React from 'react';
import './cardgrid.css';
import './cardgridResponsive.css';

export default function CardGrid({ cards, onCardClick }) {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify(card));
  };

  return (
    <main>
      <div className="card-grid">
        {cards.length === 0 ? (
          <p>Nessuna carta trovata.</p>
        ) : (
          cards.map(card => (
            <img
              key={card.id}
              src={card.immagine}
              alt={card.nome}
              className="card-image"
              onClick={() => onCardClick(card)}
              draggable
              onDragStart={e => handleDragStart(e, card)}
            />
          ))
        )}
      </div>
    </main>
  );
}
