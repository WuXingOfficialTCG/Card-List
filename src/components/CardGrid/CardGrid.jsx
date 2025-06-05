import React from 'react';
import './cardgrid.css';
import './cardgridResponsive.css';

export default function CardGrid({ cards, onCardClick, showItalian }) {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify(card));
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * 15; // max 15 gradi
    const tiltY = ((centerX - x) / centerX) * 15;

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <>
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
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      )}
    </>
  );
}
