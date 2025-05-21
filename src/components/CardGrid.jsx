import React, { useEffect, useState } from 'react';
import './cardgrid.css';

export default function CardGrid({ filters, onCardClick }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/data/cards.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Errore caricamento carte:', err));
  }, []);

  const filteredCards = cards.filter(card => {
    return (
      (filters.elemento === '' || card.elemento === filters.elemento) &&
      (filters.tipo === '' || card.tipo === filters.tipo)
    );
  });

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify(card));
  };

  return (
    <main>
      <div className="card-grid">
        {filteredCards.map(card => (
          <img
            key={card.id}
            src={card.immagine}
            alt={card.nome}
            className="card-image"
            onClick={() => onCardClick(card)}
            draggable
            onDragStart={e => handleDragStart(e, card)}
          />
        ))}
      </div>
    </main>
  );
}
