import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header/Header';
import CardGrid from '../components/CardGrid/CardGrid';
import Popup from '../components/Popup/Popup';
import Sidebar from '../components/Sidebar/Sidebar';
import SupportPopup from '../components/SupportPopup';
import { initialFilters, availableFilters, filterCards } from '../utility/filters';

export default function App() {
  const [deck, setDeck] = useState([]);
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

  const filteredCards = useMemo(() => filterCards(cards, filters), [cards, filters]);

  useEffect(() => {
    if (popupIndex !== null && (popupIndex < 0 || popupIndex >= filteredCards.length)) {
      setPopupIndex(null);
    }
  }, [filteredCards, popupIndex]);

  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCard = (card) => {
    setDeck(prev => {
      const existing = prev.find(c => c.card.id === card.id);
      if (existing) {
        return prev.map(c =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }
      return [...prev, { card, count: 1 }];
    });
  };

  const handleRemoveOne = (card) => {
    setDeck(prev => {
      const existing = prev.find(c => c.card.id === card.id);
      if (!existing) return prev;
      if (existing.count === 1) {
        return prev.filter(c => c.card.id !== card.id);
      }
      return prev.map(c =>
        c.card.id === card.id ? { ...c, count: c.count - 1 } : c
      );
    });
  };

  const handleResetDeck = () => {
    setDeck([]); // ✅ qui resetta il mazzo
  };

  const openPopup = (card) => {
    const index = filteredCards.findIndex(c => c.id === card.id);
    if (index !== -1) setPopupIndex(index);
  };

  const deckCountForCard = (cardId) => {
    const found = deck.find(c => c.card.id === cardId);
    return found ? found.count : 0;
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Sidebar
          filters={availableFilters}
          onFilterChange={updateFilter}
          deck={deck}
          onAddCard={handleAddCard}
          onRemoveOne={handleRemoveOne}
          onResetDeck={handleResetDeck}
        />
        <CardGrid
          cards={filteredCards}
          deck={deck}
          onAddCard={handleAddCard}
          onRemoveOne={handleRemoveOne}
          onCardClick={openPopup}
        />
      </div>

      {popupIndex !== null && (
        <Popup
          card={filteredCards[popupIndex]}
          onClose={() => setPopupIndex(null)}
          onPrev={() => setPopupIndex(i => Math.max(0, i - 1))}
          onNext={() => setPopupIndex(i => Math.min(filteredCards.length - 1, i + 1))}
          isFirst={popupIndex === 0}
          isLast={popupIndex === filteredCards.length - 1}
          onAddCard={handleAddCard}
          onRemoveOne={handleRemoveOne}
          deckCount={deckCountForCard(filteredCards[popupIndex].id)}
        />
      )}

      {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
    </>
  );
}
