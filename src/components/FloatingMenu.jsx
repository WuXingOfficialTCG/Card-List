import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';
import { saveDeckToFirestore } from '../utility/firestoreUtils';
import {
  loadSavedDecksFromStorage,
  saveDeckWithName,
  importDeckFromFile
} from '../utility/importExportUtils';

// Popup lista mazzi
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
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeckList, setShowDeckList] = useState(false);
  const [decks, setDecks] = useState([]);
  const hideTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const EDGE_MARGIN = 30;

    const resetTimer = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 5000);
    };

    const handleMouseMove = (e) => {
      if (e.clientX >= window.innerWidth - EDGE_MARGIN) resetTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', resetTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // Carica mazzi salvati da storage (modulata)
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

  // Salvataggio delegato a importExportUtils
  const handleSaveDeck = async () => {
    if (!user) {
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

  // Importa mazzo da file e passa a callback esterno
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
        {/* Bottone file input nascosto per importazione */}
        <label title="Importa Mazzo" aria-label="Importa Mazzo" htmlFor="file-input" style={{ cursor: 'pointer' }}>
          ⬆️
        </label>
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
