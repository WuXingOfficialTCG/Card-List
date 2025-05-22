// src/pages/DeckBuilder.jsx

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CardGrid from '../components/CardGrid';
import Header from '../components/Header';
import Popup from '../components/Popup';
import SupportPopup from '../components/SupportPopup';

export default function DeckBuilder() {
  const [deck, setDeck] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [filters, setFilters] = useState({
    nome: '',
    effetti: '',
    atk: '',
    res: '',
    elemento: [],
    tipo: [],
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleAddCard = (card) => {
    setDeck(prev => {
      const existing = prev.find(c => c.card.id === card.id);
      if (existing) {
        if (existing.count >= 3) return prev;
        return prev.map(c => c.card.id === card.id ? { ...c, count: c.count + 1 } : c);
      } else {
        return [...prev, { card, count: 1 }];
      }
    });
  };

  const handleRemoveOne = (card) => {
    setDeck(prev => {
      return prev
        .map(c => c.card.id === card.id ? { ...c, count: c.count - 1 } : c)
        .filter(c => c.count > 0);
    });
  };

  return (
    <div className="deck-builder-container">
      <Sidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        deck={deck}
        onAddCard={handleAddCard}
        onRemoveOne={handleRemoveOne}
      />

      <main className="main-area">
        <CardGrid
          filters={filters}
          onCardClick={setSelectedCard}
        />
        {selectedCard && <CardInfo card={selectedCard} />}
      </main>
    </div>
  );
}
