import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';
import Sidebar from './components/Sidebar';
import SupportPopup from './components/SupportPopup';

export default function App() {
  const [cards, setCards] = useState([]); // tutte le carte caricate

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

  // Filtra le carte secondo tutti i filtri
const filteredCards = cards.filter(card => {
  // Filtro per elemento (solo se almeno una checkbox è attiva)
  if (filters.elemento.length > 0 && !filters.elemento.includes(card.elemento)) return false;

  // Filtro per tipo
  if (filters.tipo.length > 0 && !filters.tipo.includes(card.tipo)) return false;

  // Filtro per nome (case-insensitive)
  if (filters.nome && !card.nome?.toLowerCase().includes(filters.nome.toLowerCase())) return false;

  // Filtro per effetti (case-insensitive)
  if (filters.effetti && !card.effetti?.toLowerCase().includes(filters.effetti.toLowerCase())) return false;

  // Filtro per ATK
  if (filters.atk !== '' && Number(card.atk) !== Number(filters.atk)) return false;

  // Filtro per RES
  if (filters.res !== '' && Number(card.res) !== Number(filters.res)) return false;

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
        onCardClick={openPopup}
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
