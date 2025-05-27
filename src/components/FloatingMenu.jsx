import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';
import PopupDecklist from './PopupDecklist'; // <-- Usiamo questo
import {
  saveDeckWithName,
  importDeckFromFile,
} from '../utility/importExportUtils';
import useAutoHideMenu from '../utility/useAutoHideMenu';

export default function FloatingMenu({ onExport, user, deck, onImportDeck }) {
  const visible = useAutoHideMenu();
  const [showPopupName, setShowPopupName] = useState(false);
  const [showDecklist, setShowDecklist] = useState(false);
  const navigate = useNavigate();

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
    const file = e.target.files[0];
    if (!file) return;

    try {
      const deckImported = await importDeckFromFile(file);
      if (deckImported && typeof onImportDeck === 'function') {
        onImportDeck(deckImported);
      }
    } catch (err) {
      alert(err.message || 'Errore durante l\'importazione.');
    }
  };

  return (
    <>
      <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
        <button title="Lista Mazzi" onClick={() => setShowDecklist(true)}>📋</button>
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
        <button title="Account" onClick={() => navigate('/account')}>👤</button>
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

      {showDecklist && user?.uid && (
        <PopupDecklist
          userId={user.uid}
          onClose={() => setShowDecklist(false)}
          onSelectDeck={(deck) => {
            if (typeof onImportDeck === 'function') {
              onImportDeck(deck);
            }
          }}
        />
      )}
    </>
  );
}
