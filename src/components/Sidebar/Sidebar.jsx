import React, { useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import DeckDropzone from './DeckDropzone';
import PopupName from './PopupName';

export default function Sidebar({ filters, onFilterChange, deck, onAddCard, onRemoveOne }) {
  const [collapsed, setCollapsed] = useState(false);
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleCollapse = () => setCollapsed(c => !c);
  const toggleFiltersCollapse = () => setFiltersCollapsed(f => !f);

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
    saveDeckAsJSON(filename);
    setShowPopup(false);
  };
  const handlePopupCancel = () => setShowPopup(false);

  return (
    <>
      {collapsed && (
        <div className="sidebar-hover-trigger" onMouseEnter={() => setCollapsed(false)} />
      )}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${filtersCollapsed ? 'filters-collapsed' : ''}`}>
        <div className="filters-header">
          <h3>Filtri</h3>
          <button className="collapse-btn" onClick={toggleCollapse}>{collapsed ? '›' : '‹'}</button>
          {!collapsed && (
            <button className="collapse-btn" onClick={toggleFiltersCollapse} style={{ marginLeft: '10px' }}>
              {filtersCollapsed ? '▼' : '▲'}
            </button>
          )}
        </div>

        {!collapsed && (
          <>
            {!filtersCollapsed && (
              <FiltersSection filters={filters} onFilterChange={onFilterChange} />
            )}
            <hr />
            <DeckDropzone deck={deck} onAddCard={onAddCard} onRemoveOne={onRemoveOne} onSave={handleSaveDeck} />
          </>
        )}
      </aside>

      {showPopup && (
        <PopupName onConfirm={handlePopupConfirm} onCancel={handlePopupCancel} />
      )}
    </>
  );
}
