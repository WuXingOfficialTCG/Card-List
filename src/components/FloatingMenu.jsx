import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';
import { saveDeckToFirestore } from '../utility/firestoreUtils';

// Componente popup che mostra la lista dei mazzi salvati
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

export default function FloatingMenu({ onExport, user, deck }) {
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeckList, setShowDeckList] = useState(false);
  const [decks, setDecks] = useState([]);
  const hideTimer = useRef(null);
  const navigate = useNavigate();

  // Gestione visibilità menu vicino bordo destro
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

  // Carica mazzi salvati da localStorage (puoi sostituire con Firestore)
  const loadSavedDecks = () => {
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
    console.log('Carica mazzo:', deck);
    setShowDeckList(false);
    // TODO: aggiungi callback o aggiorna stato globale se serve
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

  const handleSaveDeck = async () => {
    if (!user) {
      alert("Devi essere loggato per salvare il mazzo.");
      return;
    }

    const name = prompt("Inserisci un nome per il mazzo:");
    if (!name) return;

    if (!deck || deck.length === 0) {
      alert("Il mazzo è vuoto, non puoi salvarlo.");
      return;
    }

    const formattedDeck = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));

    try {
      await saveDeckToFirestore(user.uid, name, formattedDeck);
      alert("Mazzo salvato con successo!");
    } catch (err) {
      console.error("Errore salvataggio mazzo:", err);
      alert("Errore durante il salvataggio.");
    }
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
        <button
          title="Salva Mazzo"
          aria-label="Salva Mazzo"
          onClick={handleSaveDeck}
        >
          💾
        </button>
        <button
          onClick={handleExportClick}
          title="Esporta Mazzo"
          aria-label="Esporta Mazzo"
        >
          ⬇️
        </button>
        <button
          title="Importa Mazzo"
          aria-label="Importa Mazzo"
        >
          ⬆️
        </button>
        <button
          onClick={() => navigate('/account')}
          title="Account Personale"
          aria-label="Account Personale"
        >
          👤
        </button>
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
