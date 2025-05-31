import React, { useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import PopupDeck from '../PopupDeck/PopupDeck';

export default function Sidebar({ filters, onFilterChange, deck, onResetDeck, onRemoveOneFromDeck }) {
  const [showViewDeck, setShowViewDeck] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleResetDeck = () => {
    if (window.confirm('Sei sicuro di voler resettare il mazzo?')) {
      if (typeof onResetDeck === 'function') {
        onResetDeck();
      }
    }
  };

  const handleViewDeck = () => setShowViewDeck(true);
  const handleCloseViewDeck = () => setShowViewDeck(false);

  // Toggle sidebar su mobile
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Bottone toggle visibile solo su mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Apri/Chiudi sidebar">
        ☰
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="filters-header">
          <h3>Filtri</h3>
          {/* Bottone chiusura sidebar solo su mobile */}
          <button className="sidebar-close" onClick={toggleSidebar} aria-label="Chiudi sidebar">×</button>
        </div>

        <div className="filters-container">
          <FiltersSection filters={filters} onFilterChange={onFilterChange} />
        </div>

        <hr className="divider" />

        <div className="deck-buttons-container">
          <button onClick={handleResetDeck}>Reset Mazzo</button>
          <button onClick={handleViewDeck} disabled={deck.length === 0}>
            Visualizza Deck
          </button>
        </div>
      </aside>

      {showViewDeck && (
        <PopupDeck
          deck={deck}
          onClose={handleCloseViewDeck}
          onRemoveCard={onRemoveOneFromDeck}
        />
      )}
    </>
  );
}
