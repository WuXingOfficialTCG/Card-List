import React, { useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import PopupDeck from '../PopupDeck/PopupDeck';  // Assicurati che il path sia corretto

export default function Sidebar({ filters, onFilterChange, deck, onResetDeck }) {
  const [showViewDeck, setShowViewDeck] = useState(false);

  const handleResetDeck = () => {
    if (typeof onResetDeck === 'function') {
      onResetDeck();
    }
  };

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

        <div
          className="deck-buttons-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <button onClick={handleResetDeck}>Reset Mazzo</button>
          <button onClick={handleViewDeck} disabled={deck.length === 0}>
            Visualizza Deck
          </button>
        </div>
      </aside>

      {showViewDeck && <PopupDeck deck={deck} onClose={handleCloseViewDeck} />}
    </>
  );
}
