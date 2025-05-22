import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';
import Sidebar from './components/Sidebar';
import SupportPopup from './components/SupportPopup';

export default function App() {
  const [cards, setCards] = useState([]); // tutte le carte caricate
  const [filters, setFilters] = useState({ elemento: '', tipo: '' });
  const [deck, setDeck] = useState([]);
  const [showSupport, setShowSupport] = useState(false);

  const [popupIndex, setPopupIndex] = useState(null); // indice carta nel popup

  const SUPPORT_INTERVAL_HOURS = 6;

  useEffect(() => {
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > SUPPORT_INTERVAL_HOURS * 60 * 60 * 1000) {
      setShowSupport(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }

    // Caricamento carte
    fetch('/data/cards.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Errore caricamento carte:', err));
  }, []);

  const availableFilters = {
    elemento: ['Water', 'Wood', 'Metal', 'Fire', 'Earth'],
    tipo: ['Entity', 'Chakra']
  };

  // Carte filtrate da mostrare
  const filteredCards = cards.filter(card => {
    return (
      (filters.elemento === '' || card.elemento === filters.elemento) &&
      (filters.tipo === '' || card.tipo === filters.tipo)
    );
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
        .map(c =>
          c.card.id === card.id ? { ...c, count: c.count - 1 } : c
        )
        .filter(c => c.count > 0)
    );
  };

  // Apertura popup: trova indice carta filtrata
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
        onCardClick={openPopup}  // usa openPopup per gestire indice
        onRemoveOne={handleRemoveOneFromDeck}
      />
      <div style={{ marginLeft: 220 }}>
        <CardGrid filters={filters} onCardClick={openPopup} />
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
