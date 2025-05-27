import React, { useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import PopupName from './PopupName';

export default function Sidebar({ filters, onFilterChange, deck, onSaveDeck }) {
  const [showPopup, setShowPopup] = useState(false);

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

  const handleSaveDeck = () => setShowPopup(true);

  const handlePopupConfirm = (filename) => {
    if (filename && filename.trim()) {
      saveDeckAsJSON(filename.trim());
    }
    setShowPopup(false);
  };

  const handlePopupCancel = () => setShowPopup(false);

  return (
    <>
      <aside className="sidebar">
        <div className="filters-header">
          <h3>Filtri</h3>
        </div>

        <div className="sidebar-main-grid">
          <div className="filters-container">
            <FiltersSection filters={filters} onFilterChange={onFilterChange} />
          </div>

          {/* Se vuoi mostrare informazioni sul deck, puoi farlo qui */}
          <div className="deck-info">
            <button onClick={handleSaveDeck}>Salva Deck</button>
          </div>
        </div>
      </aside>

      {showPopup && (
        <PopupName
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}
    </>
  );
}
