import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header/Header';
import CardGrid from '../components/CardGrid/CardGrid';
import Popup from '../components/Popup/Popup';
import Sidebar from '../components/Sidebar/Sidebar';
import SupportPopup from '../components/SupportPopup';
import { initialFilters, availableFilters, filterCards } from '../utility/filters';

export default function DeckBuilder({ deck, onAddCard, onRemoveOneFromDeck, onResetDeck }) {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [showSupport, setShowSupport] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [showItalian, setShowItalian] = useState(false);

  useEffect(() => {
    // Imposta gli stili di base su body senza nascondere overflow
    const originalStyle = document.body.getAttribute('style');

    document.body.style.margin = '0';
    document.body.style.fontFamily = "'Lato', Arial, sans-serif";
    document.body.style.backgroundColor = 'var(--color-bg-main)';
    document.body.style.color = 'var(--color-text)';
    document.body.style.height = 'auto';  // lascia auto per scroll naturale
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto'; // permette scroll pagina

    return () => {
      if (originalStyle) {
        document.body.setAttribute('style', originalStyle);
      } else {
        document.body.removeAttribute('style');
      }
    };
  }, []);

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

  const openPopup = (card) => {
    const index = filteredCards.findIndex(c => c.id === card.id);
    if (index !== -1) setPopupIndex(index);
  };

  const deckCountForCard = (cardId) => {
    const found = deck.find(c => c.card.id === cardId);
    return found ? found.count : 0;
  };

  const toggleLanguage = () => {
    setShowItalian(prev => !prev);
  };

  const languageToggle = (
    <button
      onClick={toggleLanguage}
      style={{
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        backgroundColor: '#eee',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={showItalian ? 'Switch to English' : 'Passa all\'Italiano'}
    >
      <img
        src={showItalian ? '/flags/it.png' : '/flags/gb.png'}
        alt={showItalian ? 'Bandiera italiana' : 'British flag'}
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
        }}
      />
    </button>
  );

  return (
    <>
      <Header languageToggle={languageToggle} />

      <div
        style={{
          backgroundColor: '#cccccc',
          minHeight: 'calc(100vh - 60px)', // altezza minima per il container
          display: 'flex',
          overflow: 'visible', // lascia visibilità e scroll al body
          width: '100%',
        }}
      >
        <Sidebar
          filters={availableFilters}
          onFilterChange={updateFilter}
          deck={deck}
          onAddCard={onAddCard}
          onRemoveOneFromDeck={onRemoveOneFromDeck}
          onResetDeck={onResetDeck}
          style={{
            flexShrink: 0,
            width: '300px',
            overflow: 'visible',
          }}
        />

        <div
          style={{
            flexGrow: 1,
            overflow: 'visible', // lascia visibilità e scroll al body
            padding: '1rem',
          }}
        >
          <CardGrid
            cards={filteredCards}
            deck={deck}
            onAddCard={onAddCard}
            onRemoveOne={onRemoveOneFromDeck}
            onCardClick={openPopup}
            showItalian={showItalian}
            setShowItalian={setShowItalian}
          />
        </div>
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
          onRemoveOne={onRemoveOneFromDeck}
          deckCount={deckCountForCard(filteredCards[popupIndex].id)}
          showItalian={showItalian}
        />
      )}

      {showSupport && <SupportPopup onClose={() => setShowSupport(false)} />}
    </>
  );
}
