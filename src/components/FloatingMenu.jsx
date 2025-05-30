import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PopupName from './Sidebar/PopupName';
import PopupDeck from './PopupDeck/PopupDeck';
import './floatingMenu.css';
import {
  saveDeckWithName,
  importDeckFromFile,
} from '../utility/importExportUtils';
import useAutoHideMenu from '../utility/useAutoHideMenu';

export default function FloatingMenu({ onExport, user, deck, onImportDeck }) {
  const visible = useAutoHideMenu();
  const [showPopupName, setShowPopupName] = useState(false);
  const [showPopupDeck, setShowPopupDeck] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Mostra il menu solo in /deck-builder o /deck-manager
  const isDeckBuilder = location.pathname === '/deck-builder';
  const isDeckManager = location.pathname === '/deck-manager';

  if (!isDeckBuilder && !isDeckManager) {
    return null;
  }

  const handleSaveDeck = async () => {
    if (!user?.uid) {
      alert('Devi essere loggato per salvare il mazzo.');
      return;
    }
    if (!deck || deck.length === 0) {
      alert('Il mazzo è vuoto, non puoi salvarlo.');
      return;
    }

    try {
      const result = await saveDeckWithName(user.uid, deck);
      alert(result.message);
    } catch (err) {
      alert(err.message || 'Errore durante il salvataggio.');
    }
  };

  const handleImportDeck = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const deckImported = await importDeckFromFile(file);
      if (deckImported && typeof onImportDeck === 'function') {
        onImportDeck(deckImported);
      }
    } catch (err) {
      alert(err.message || "Errore durante l'importazione.");
    }
  };

  const handleToggleDeckPage = () => {
    if (isDeckManager) {
      navigate('/deck-builder');
    } else {
      navigate('/deck-manager');
    }
  };

  const handleOpenPopupDeck = (deckCards) => {
    setSelectedDeck(deckCards);
    setShowPopupDeck(true);
  };

  const handleClosePopupDeck = () => {
    setSelectedDeck(null);
    setShowPopupDeck(false);
  };

  return (
    <>
      <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
        <button
          title={isDeckManager ? 'Deck Builder' : 'Deck Manager'}
          onClick={handleToggleDeckPage}
        >
          🗂️
        </button>
        <button title="Salva Mazzo" onClick={handleSaveDeck}>💾</button>
        <button title="Esporta Mazzo" onClick={() => setShowPopupName(true)}>⬇️</button>
        <button
          title="Importa Mazzo"
          onClick={() => document.getElementById('file-input').click()}
        >
          ⬆️
        </button>
        <input
          id="file-input"
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleImportDeck}
        />
        <button title="Home" onClick={() => navigate('/')}>🏠</button>
      </div>

      {showPopupName && (
        <PopupName
          onConfirm={(filename) => {
            if (typeof onExport === 'function') onExport(filename);
            setShowPopupName(false);
          }}
          onCancel={() => setShowPopupName(false)}
        />
      )}

      {showPopupDeck && selectedDeck && (
        <PopupDeck deck={selectedDeck} onClose={handleClosePopupDeck} />
      )}
    </>
  );
}
