import React from 'react';
import TiltCard from './TiltCard';  // aggiorna il percorso corretto
import './cardgrid.css';

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
            />
          ))}
        </div>
      )}
    </main>
  );
}
