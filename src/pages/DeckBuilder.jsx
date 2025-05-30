import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../components/Header/Header';
import CardGrid from '../components/CardGrid/CardGrid';
import Popup from '../components/Popup/Popup';
import Sidebar from '../components/Sidebar/Sidebar';
import SupportPopup from '../components/SupportPopup';
import { initialFilters, availableFilters, filterCards } from '../utility/filters';

const containerStyle = {
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
};

export default function DeckBuilder({ deck, onAddCard, onRemoveOne, onResetDeck }) {
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

  const updateFilter = useCallback((field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  }, []);

  const openPopup = useCallback((card) => {
    const index = filteredCards.findIndex(c => c.id === card.id);
    if (index !== -1) setPopupIndex(index);
  }, [filteredCards]);

  const deckCountForCard = useCallback((cardId) => {
    const found = deck.find(c => c.card.id === cardId);
    return found ? found.count : 0;
  }, [deck]);

  return (
    <>
      <Header />
      <div style={containerStyle}>
        <Sidebar
          filters={availableFilters}
          onFilterChange={updateFilter}
          deck={deck}
          onAddCard={onAddCard}
          onRemoveOne={onRemoveOne}
          onResetDeck={onResetDeck}
        />
        <CardGrid
          cards={filteredCards}
          deck={deck}
          onAddCard={onAddCard}
          onRemoveOne={onRemoveOne}
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
          onAddCard={onAddCard}
          onRemoveOne={onRemoveOne}
          deckCount={deckCountForCard(filteredCards[popupIndex].id)}
        />
      )}

      {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
    </>
  );
}
