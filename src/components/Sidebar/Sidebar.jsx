import React, { useState, useEffect } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import DeckDropzone from './DeckDropzone';
import PopupName from './PopupName';

export default function Sidebar({
  filters,
  onFilterChange,
  deck,
  onAddCard,
  onRemoveOne,
  onToggleCollapse,
  collapsed
}) {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleFiltersCollapse = () => setFiltersCollapsed(prev => !prev);

  // Salva deck come JSON
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

  // Gestione drag & drop per rimuovere carte trascinate fuori dalla deck dropzone
  useEffect(() => {
    const handleDropOutside = (e) => {
      const cardData = e.dataTransfer.getData('application/deck-card');
      if (!cardData) return;

      const card = JSON.parse(cardData);
      if (!e.target.closest('.deck-dropzone')) {
        onRemoveOne(card);
      }
    };

    const handleDragOver = (e) => e.preventDefault();

    window.addEventListener('drop', handleDropOutside);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('drop', handleDropOutside);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, [onRemoveOne]);

  return (
    <>
      {collapsed && (
        <div
          className="sidebar-hover-trigger"
          onMouseEnter={() => onToggleCollapse(false)}
          aria-label="Espandi Sidebar"
        />
      )}

      <aside
        className={`sidebar${collapsed ? ' collapsed' : ''}${filtersCollapsed ? ' filters-collapsed' : ''}`}
      >
        <div className="filters-header">
          <h3>Filtri</h3>
          <button
            className="collapse-btn"
            onClick={() => onToggleCollapse(!collapsed)}
            aria-label={collapsed ? "Espandi Sidebar" : "Riduci Sidebar"}
          >
            {collapsed ? '›' : '‹'}
          </button>
          {!collapsed && (
            <button
              className="collapse-btn"
              onClick={toggleFiltersCollapse}
              style={{ marginLeft: 10 }}
              aria-label={filtersCollapsed ? "Espandi filtri" : "Riduci filtri"}
            >
              {filtersCollapsed ? '▼' : '▲'}
            </button>
          )}
        </div>

        {!collapsed && (
          <div className="sidebar-main-grid">
            {!filtersCollapsed && (
              <div className="filters-container">
                <FiltersSection filters={filters} onFilterChange={onFilterChange} />
              </div>
            )}

            <div className="deckdropzone-container">
              <DeckDropzone
                deck={deck}
                onAddCard={onAddCard}
                onRemoveOne={onRemoveOne}
                onSave={handleSaveDeck}
              />
            </div>
          </div>
        )}
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
