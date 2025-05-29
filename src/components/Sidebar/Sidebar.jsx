import React, { useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import PopupName from './PopupName';
import PopupDeck from '../PopupDeck/PopupDeck';  // Assicurati che il path sia corretto

export default function Sidebar({ filters, onFilterChange, deck, onResetDeck }) {
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showViewDeck, setShowViewDeck] = useState(false);

  const saveDeckAsJSON = (filename) => {
    const deckData = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));

    const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleSaveDeck = () => setShowSavePopup(true);
  const handlePopupConfirm = (filename) => {
    if (filename && filename.trim()) {
      saveDeckAsJSON(filename.trim());
    }
    setShowSavePopup(false);
  };
  const handlePopupCancel = () => setShowSavePopup(false);

  const handleViewDeck = () => setShowViewDeck(true);
  const handleCloseViewDeck = () => setShowViewDeck(false);

  return (
    <>
      <aside className="sidebar">
        <div className="filters-header">
          <h3>Filtri</h3>
        </div>

        <div className="filters-container">
          <FiltersSection filters={filters} onFilterChange={onFilterChange} />
        </div>

        <div className="deck-buttons-container">
          <button onClick={() => {
            if (typeof onResetDeck === 'function') {
              onResetDeck();
            }
          }}>
            Reset Mazzo
          </button>
          <button onClick={handleSaveDeck}>Salva Deck</button>
          <button onClick={handleViewDeck} disabled={deck.length === 0}>
            Visualizza Deck
          </button>
        </div>
      </aside>

      {showSavePopup && (
        <PopupName
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}

      {showViewDeck && (
        <PopupDeck deck={deck} onClose={handleCloseViewDeck} />
      )}
    </>
  );
}
