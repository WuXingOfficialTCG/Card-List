import React, { useState, useEffect } from 'react';
// ... importazioni componenti

export default function App() {
  const [popupIndex, setPopupIndex] = useState(null);
  const [filters, setFilters] = useState({ elemento: '', tipo: '' });
  const [deck, setDeck] = useState([]);
  const [showSupport, setShowSupport] = useState(false);
  const [cards, setCards] = useState([]); // memorizziamo tutte le carte

  const SUPPORT_INTERVAL_HOURS = 6;

  useEffect(() => {
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > SUPPORT_INTERVAL_HOURS * 60 * 60 * 1000) {
      setShowSupport(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }

    // Carica le carte qui (in App) per poter filtrare e gestire l'indice
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
    return (
      (filters.elemento === '' || card.elemento === filters.elemento) &&
      (filters.tipo === '' || card.tipo === filters.tipo)
    );
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAddCardToDeck = (card) => {
    // codice come prima ...
  };

  const handleRemoveOneFromDeck = (card) => {
    // codice come prima ...
  };

  // Apri popup passando indice
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
        onCardClick={openPopup}  // usa openPopup con indice
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
