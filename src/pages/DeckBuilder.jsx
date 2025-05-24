import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import CardGrid from '../components/CardGrid/CardGrid';
import Popup from '../components/Popup/Popup';
import Sidebar from '../components/Sidebar/Sidebar';
import SupportPopup from '../components/SupportPopup';

export default function DeckBuilder({ deck, onAddCard, onRemoveOne }) {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({
    elemento: [],
    tipo: [],
    nome: '',
    effetti: '',
    atk: '',
    res: '',
  });
  const [showSupport, setShowSupport] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Show support popup max every 6 hours
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();
    if (!lastShown || now - +lastShown > 6 * 60 * 60 * 1000) {
      setShowSupport(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }

    // Load cards data
    fetch('/data/cards.json')
      .then(res => res.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  const availableFilters = {
    elemento: ['Water', 'Wood', 'Metal', 'Fire', 'Earth'],
    tipo: ['Entity', 'Chakra'],
  };

  const filteredCards = cards.filter(card => {
    if (filters.elemento.length && !filters.elemento.includes(card.elemento)) return false;
    if (filters.tipo.length && !filters.tipo.includes(card.tipo)) return false;
    if (filters.nome && !card.nome?.toLowerCase().includes(filters.nome.toLowerCase())) return false;
    if (filters.effetti && !card.effetti?.toLowerCase().includes(filters.effetti.toLowerCase())) return false;

    if (filters.atk !== '') {
      const atkValue = Number(filters.atk);
      if (isNaN(atkValue) || Number(card.atk) !== atkValue) return false;
    }

    if (filters.res !== '') {
      const resValue = Number(filters.res);
      if (isNaN(resValue) || Number(card.res) !== resValue) return false;
    }

    return true;
  });

  const updateFilter = (field, value) => setFilters(f => ({ ...f, [field]: value }));

  const openPopup = (card) => {
    const index = filteredCards.findIndex(c => c.id === card.id);
    if (index !== -1) setPopupIndex(index);
  };

  const toggleSidebarCollapsed = () => setSidebarCollapsed(prev => !prev);

  return (
    <>
      <Header />
      <div className={`main-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`} style={{ display: 'flex' }}>
        <Sidebar
          filters={availableFilters}
          onFilterChange={updateFilter}
          deck={deck}
          onAddCard={onAddCard}
          onRemoveOne={onRemoveOne}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
        />
        <CardGrid
          cards={filteredCards}
          deck={deck}
          onAddCard={onAddCard}
          onRemoveOne={onRemoveOne}
          onCardClick={openPopup}
          sidebarCollapsed={sidebarCollapsed}  // passa lo stato a CardGrid per adattarsi
        />
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
