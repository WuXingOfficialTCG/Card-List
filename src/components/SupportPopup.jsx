import React, { useState } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';
import Sidebar from './components/Sidebar';

export default function App() {
  const [popupCard, setPopupCard] = useState(null);
  const [filters, setFilters] = useState({ elemento: '', tipo: '' });
  const [deck, setDeck] = useState([]);

  const availableFilters = {
    elemento: ['Water', 'Wood', 'Metal', 'Fire', 'Earth'],
    tipo: ['Entity', 'Chakra']
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCardToDeck = (card) => {
    setDeck(prevDeck => {
      const found = prevDeck.find(c => c.card.id === card.id);
      if (found) {
        // Incrementa count max 3
        if (found.count >= 3) return prevDeck;
        return prevDeck.map(c =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      } else {
        // Aggiungi nuova carta
        if (prevDeck.reduce((acc, c) => acc + c.count, 0) >= 40) return prevDeck;
        return [...prevDeck, { card, count: 1 }];
      }
    });
  };

  return (
    <>
      <Header />
      <Sidebar
        filters={availableFilters}
        onFilterChange={handleFilterChange}
        deck={deck}
        onAddCard={handleAddCardToDeck}
      />
      <div style={{ marginLeft: 220 }}>
        <CardGrid filters={filters} onCardClick={setPopupCard} />
        {popupCard && <Popup card={popupCard} onClose={() => setPopupCard(null)} />}
      </div>
    </>
  );
}
