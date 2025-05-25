import React, { useEffect, useState, useRef } from 'react';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';

// Componente popup che mostra la lista dei mazzi
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

export default function FloatingMenu({ onExport }) {
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeckList, setShowDeckList] = useState(false);
  const [decks, setDecks] = useState([]);
  const hideTimer = useRef(null);

  useEffect(() => {
    const EDGE_MARGIN = 30;

    const resetTimer = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 5000);
    };

    const handleMouseMove = (e) => {
      if (e.clientX >= window.innerWidth - EDGE_MARGIN) {
        resetTimer();
      }
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

  // Simulazione caricamento mazzi salvati, da backend o localStorage
  const loadSavedDecks = () => {
    // Esempio: carica da localStorage (puoi adattare per backend)
    const saved = localStorage.getItem('savedDecks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDecks(parsed);
      } catch {
        setDecks([]);
      }
    } else {
      setDecks([]);
    }
  };

  const handleListDecksClick = () => {
    loadSavedDecks();
    setShowDeckList(true);
  };

  const handleLoadDeck = (deck) => {
    // Passa il mazzo selezionato al parent o gestisci qui
    console.log('Carica mazzo:', deck);
    // TODO: qui puoi chiamare una callback o aggiornare lo stato globale
    setShowDeckList(false);
  };

  const handleExportClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = (filename) => {
    if (typeof onExport === 'function') {
      onExport(filename);
    }
    setShowPopup(false);
  };

  return (
    <>
      <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
        <button 
          title="Lista Mazzi" 
          aria-label="Lista Mazzi" 
          onClick={handleListDecksClick}
        >
          📋
        </button>
        <button title="Salva Mazzo" aria-label="Salva Mazzo">💾</button>
        <button onClick={handleExportClick} title="Esporta Mazzo" aria-label="Esporta Mazzo">⬇️</button>
        <button title="Importa Mazzo" aria-label="Importa Mazzo">⬆️</button>
      </div>

      {showPopup && (
        <PopupName
          onConfirm={handleConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}

      {showDeckList && (
        <DeckListPopup
          decks={decks}
          onClose={() => setShowDeckList(false)}
          onLoadDeck={handleLoadDeck}
        />
      )}
    </>
  );
}
