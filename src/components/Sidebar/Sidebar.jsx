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
  collapsed,
}) {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Toggle visibility of the filters section
  const toggleFiltersCollapse = () => setFiltersCollapsed(prev => !prev);

  // Save the current deck as a JSON file
  const saveDeckAsJSON = (filename) => {
    if (!filename.trim()) return;
    const deckData = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));

    const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename.trim()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Show popup to input filename before saving deck
  const handleSaveDeck = () => setShowPopup(true);

  const handlePopupConfirm = (filename) => {
    saveDeckAsJSON(filename);
    setShowPopup(false);
  };

  const handlePopupCancel = () => setShowPopup(false);

  // Listen for drag & drop outside deck dropzone to remove card from deck
  useEffect(() => {
    const handleDropOutside = (e) => {
      const cardData = e.dataTransfer.getData('application/deck-card');
      if (!cardData) return;

      // If dropped outside deck dropzone, remove one copy of card from deck
      if (!e.target.closest('.deck-dropzone')) {
        const card = JSON.parse(cardData);
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
      {/* Hover area to expand sidebar when collapsed */}
      {collapsed && (
        <div
          className="sidebar-hover-trigger"
          onMouseEnter={() => onToggleCollapse(false)}
          aria-label="Expand Sidebar"
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
