import React, { useEffect, useState } from 'react';
import './sidebar.css';
import FiltersSection from './FiltersSection';
import DeckDropzone from './DeckDropzone';
import PopupName from './PopupName';

export default function Sidebar({ filters, onFilterChange, deck, onAddCard, onRemoveOne, onSaveDeck }) {
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
      <aside className="sidebar">
        <div className="filters-header">
          <h3>Filtri</h3>
          {/* Bottone collapse rimosso */}
        </div>

        <div className="sidebar-main-grid">
          <div className="filters-container">
            <FiltersSection filters={filters} onFilterChange={onFilterChange} />
          </div>

          <div className="deckdropzone-container">
            <DeckDropzone
              deck={deck}
              onAddCard={onAddCard}
              onRemoveOne={onRemoveOne}
              onSave={handleSaveDeck}
            />
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
