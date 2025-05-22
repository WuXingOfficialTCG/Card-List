
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';
import Sidebar from './components/Sidebar';
import SupportPopup from './components/SupportPopup';

export default function App() {
  const [popupCard, setPopupCard] = useState(null);
  const [filters, setFilters] = useState({ elemento: '', tipo: '' });
  const [deck, setDeck] = useState([]);
  const [showSupport, setShowSupport] = useState(false);

  const SUPPORT_INTERVAL_HOURS = 6;

  useEffect(() => {
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > SUPPORT_INTERVAL_HOURS * 60 * 60 * 1000) {
      setShowSupport(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }
  }, []);

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

  return (
    <>
      <Header />
      <Sidebar
        filters={availableFilters}
        onFilterChange={handleFilterChange}
        deck={deck}
        onAddCard={handleAddCardToDeck}
        onCardClick={setPopupCard} // ✅ Passaggio aggiunto
        onRemoveOne={handleRemoveOneFromDeck} 
      />
      <div style={{ marginLeft: 220 }}>
        <CardGrid filters={filters} onCardClick={setPopupCard} />
        {popupCard && <Popup card={popupCard} onClose={() => setPopupCard(null)} />}
        {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
      </div>
    </>
  );
}
