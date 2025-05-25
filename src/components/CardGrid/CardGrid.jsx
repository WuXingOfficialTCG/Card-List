import React from 'react';
import TiltCard from './TiltCard';

export default function CardGrid({ cards, onCardClick }) {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify(card));
  };

  return (
    <main className="card-grid-container">
      {cards.length === 0 ? (
        <p className="no-cards-message">Nessuna carta trovata.</p>
      ) : (
        <div className="card-grid">
          {cards.map((card) => (
            <TiltCard
              key={card.id}
              src={card.immagine}
              alt={card.nome}
              className="card-image"
              onClick={() => onCardClick(card)}
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
              style={{
                width: '140px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
