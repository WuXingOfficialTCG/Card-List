import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';
import {
  loadSavedDecksFromStorage,
  saveDeckWithName,
  importDeckFromFile
} from '../utility/importExportUtils';
import useAutoHideMenu from '../utility/useAutoHideMenu';

function DeckListPopup({ decks = [], onClose, onLoadDeck }) {
  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <h2>Lista Mazzi Salvati</h2>
        {decks.length === 0 ? (
          <p>Nessun mazzo salvato.</p>
        ) : (
          <ul>
            {decks.map((deck, i) => (
              <li key={i}>
                <button onClick={() => onLoadDeck(deck)}>{deck.name}</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
}

export default function FloatingMenu({ onExport, user, deck, onImportDeck }) {
  const visible = useAutoHideMenu(); // 👈 hook personalizzata
  const [showPopup, setShowPopup] = useState(false);
  const [showDeckList, setShowDeckList] = useState(false);
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  const handleListDecksClick = () => {
    const savedDecks = loadSavedDecksFromStorage();
    setDecks(savedDecks);
    setShowDeckList(true);
  };

  const handleLoadDeck = (deck) => {
    setShowDeckList(false);
    if (typeof onImportDeck === 'function') {
      onImportDeck(deck);
    }
  };

  const handleExportClick = () => setShowPopup(true);

  const handleConfirm = (filename) => {
    if (typeof onExport === 'function') onExport(filename);
    setShowPopup(false);
  };

  const handleSaveDeck = async () => {
    if (!user || !user.uid) {
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
        <button title="Lista Mazzi" aria-label="Lista Mazzi" onClick={handleListDecksClick}>
          📋
        </button>
        <button title="Salva Mazzo" aria-label="Salva Mazzo" onClick={handleSaveDeck}>
          💾
        </button>
        <button onClick={handleExportClick} title="Esporta Mazzo" aria-label="Esporta Mazzo">
          ⬇️
        </button>
        <button
          title="Importa Mazzo"
          aria-label="Importa Mazzo"
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
        <button onClick={() => navigate('/account')} title="Account Personale" aria-label="Account Personale">
          👤
        </button>
      </div>

      {showPopup && <PopupName onConfirm={handleConfirm} onCancel={() => setShowPopup(false)} />}
      {showDeckList && (
        <DeckListPopup decks={decks} onClose={() => setShowDeckList(false)} onLoadDeck={handleLoadDeck} />
      )}
    </>
  );
}
