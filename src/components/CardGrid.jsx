import React, { useEffect, useState } from 'react';
import './cardgrid.css';

export default function CardGrid() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/data/cards.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Errore caricamento carte:', err));
  }, []);

  return (
    <main>
      <div className="card-grid">
        {cards.map(card => (
          <img 
            key={card.id} 
            src={card.immagine} 
            alt={card.nome} 
            className="card-image" 
          />
        ))}
      </div>
    </main>
  );
}
