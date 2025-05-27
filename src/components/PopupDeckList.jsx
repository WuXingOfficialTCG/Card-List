import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './popupDeckList.css';

export default function PopupDeckList({ userId, onClose }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Carica i mazzi da Firestore
  useEffect(() => {
    async function fetchDecks() {
      try {
        const deckRef = collection(db, 'users', userId, 'decks');
        const snapshot = await getDocs(deckRef);
        const loadedDecks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDecks(loadedDecks);
      } catch (error) {
        console.error('Errore nel caricamento dei mazzi:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchDecks();
    }
  }, [userId]);

  // Chiudi popup con ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        selectedDeck ? setSelectedDeck(null) : onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedDeck]);

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popupdecklist-title"
    >
      <div
        className="popup-content"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="popup-close"
          onClick={() => selectedDeck ? setSelectedDeck(null) : onClose()}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        {!selectedDeck ? (
          <>
            <h2 id="popupdecklist-title">I tuoi Mazzi</h2>

            {loading ? (
              <p>Caricamento...</p>
            ) : decks.length === 0 ? (
              <p>Nessun mazzo trovato.</p>
            ) : (
              <ul className="decklist" role="list">
                {decks.map(deck => (
                  <li
                    key={deck.id}
                    className="decklist-item"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedDeck(deck.cards)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedDeck(deck.cards);
                      }
                    }}
                    aria-label={`Apri il mazzo ${deck.name || 'senza nome'}`}
                  >
                    {deck.name || 'Deck senza nome'}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <PopupDeck
            deck={selectedDeck}
            onClose={() => setSelectedDeck(null)}
          />
        )}
      </div>
    </div>
  );
}
