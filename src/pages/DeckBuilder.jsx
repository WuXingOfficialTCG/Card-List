import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import CardGrid from '../components/CardGrid/CardGrid';
import Popup from '../components/Popup/Popup';
import Sidebar from '../components/Sidebar/Sidebar';
import SupportPopup from '../components/SupportPopup';

import { initialFilters, availableFilters, filterCards } from '../utility/filters';

export default function DeckBuilder({ deck, onAddCard, onRemoveOne }) {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [showSupport, setShowSupport] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  useEffect(() => {
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();
    if (!lastShown || now - Number(lastShown) > 6 * 60 * 60 * 1000) {
      setShowSupport(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }

    fetch('/data/cards.json')
      .then(res => res.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  const filteredCards = filterCards(cards, filters);

  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const openPopup = (card) => {
    const index = filteredCards.findIndex(c => c.id === card.id);
    if (index !== -1) setPopupIndex(index);
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <Sidebar
          filters={availableFilters}
          onFilterChange={updateFilter}
          deck={deck}
          onAddCard={onAddCard}
          onRemoveOne={onRemoveOne}
        />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <CardGrid
            cards={filteredCards}
            deck={deck}
            onAddCard={onAddCard}
            onRemoveOne={onRemoveOne}
            onCardClick={openPopup}
          />
        </div>
      </div>

      {popupIndex !== null && (
        <Popup
          card={filteredCards[popupIndex]}
          onClose={() => setPopupIndex(null)}
          onPrev={() => setPopupIndex(i => Math.max(0, i - 1))}
          onNext={() => setPopupIndex(i => Math.min(filteredCards.length - 1, i + 1))}
        />
      )}

      {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
    </>
  );
}
