// src/pages/DeckBuilder.jsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardGrid from '../components/CardGrid';
import Popup from '../components/Popup';
import Sidebar from '../components/Sidebar/Sidebar';
import SupportPopup from '../components/SupportPopup';

export default function DeckBuilder() {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({
    elemento: [],
    tipo: [],
    nome: '',
    effetti: '',
    atk: '',
    res: '',
  });
  const [deck, setDeck] = useState([]);
  const [showSupport, setShowSupport] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const SUPPORT_INTERVAL_HOURS = 6;

  useEffect(() => {
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > SUPPORT_INTERVAL_HOURS * 60 * 60 * 1000) {
      setShowSupport(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }

    fetch('/data/cards.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Errore caricamento carte:', err));
  }, []);

  const availableFilters = {
    elemento: ['Water', 'Wood', 'Metal', 'Fire', 'Earth'],
    tipo: ['Entity', 'Chakra']
  };

  const filteredCards = cards.filter(card => {
    if (filters.elemento.length > 0 && !filters.elemento.includes(card.elemento)) return false;
    if (filters.tipo.length > 0 && !filters.tipo.includes(card.tipo)) return false;
    if (filters.nome && !card.nome?.toLowerCase().includes(filters.nome.toLowerCase())) return false;
    if (filters.effetti && !card.effetti?.toLowerCase().includes(filters.effetti.toLowerCase())) return false;

    if (filters.atk !== '') {
      const atkValue = Number(filters.atk);
      const cardAtk = Number(card.atk);
      if (isNaN(atkValue) || isNaN(cardAtk) || cardAtk !== atkValue) return false;
    }

    if (filters.res !== '') {
      const resValue = Number(filters.res);
      const cardRes = Number(card.res);
      if (isNaN(resValue) || isNaN(cardRes) || cardRes !== resValue) return false;
    }

    return true;
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCardToDeck = (card) => {
    setDeck(prevDeck => {
      const found = prevDeck.find(c => c.card.id === card.id);
      if (found) {
        if (found.count >= 3) return prevDeck;
        return prevDeck.map(c =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }

      const totalCards = prevDeck.reduce((acc, c) => acc + c.count, 0);
      if (totalCards >= 40) return prevDeck;

      return [...prevDeck, { card, count: 1 }];
    });
  };

  const handleRemoveOneFromDeck = (card) => {
    setDeck(prevDeck =>
      prevDeck
        .map(c => (c.card.id === card.id ? { ...c, count: c.count - 1 } : c))
        .filter(c => c.count > 0)
    );
  };

  const openPopup = (card) => {
    const index = filteredCards.findIndex(c => c.id === card.id);
    if (index !== -1) setPopupIndex(index);
  };

  const closePopup = () => setPopupIndex(null);
  const goPrev = () => setPopupIndex(i => (i > 0 ? i - 1 : i));
  const goNext = () => setPopupIndex(i => (i < filteredCards.length - 1 ? i + 1 : i));

  return (
    <>
      <Header />
      <Sidebar
        filters={availableFilters}
        onFilterChange={handleFilterChange}
        deck={deck}
        onAddCard={handleAddCardToDeck}
        onCardClick={openPopup}
        onRemoveOne={handleRemoveOneFromDeck}
      />
      <div style={{ marginLeft: 220 }}>
        <CardGrid filters={filters} onCardClick={openPopup} cards={filteredCards} />
        {popupIndex !== null && (
          <Popup
            card={filteredCards[popupIndex]}
            onClose={closePopup}
            onPrev={goPrev}
            onNext={goNext}
            isFirst={popupIndex === 0}
            isLast={popupIndex === filteredCards.length - 1}
          />
        )}
        {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
      </div>
    </>
  );
}
