import React, { useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import PopupName from './PopupName';

export default function Sidebar({ filters, onFilterChange, deck }) {
  const [showSavePopup, setShowSavePopup] = useState(false);

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
          <button onClick={handleSaveDeck}>Salva Deck</button>
          <button /* nessuna funzione */>Visualizza Deck</button>
        </div>
      </aside>

      {showSavePopup && (
        <PopupName
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}
    </>
  );
}
