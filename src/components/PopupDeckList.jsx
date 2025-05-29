import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './popupDeckList.css';

export default function PopupDeckList({ userId, onClose }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState(null);

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

    if (userId) fetchDecks();
  }, [userId]);

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
      className="popup-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popupdecklist-title"
    >
      {/* Bottone chiudi fuori dal contenuto popup */}
      <button
        className="close-button"
        onClick={() => (selectedDeck ? setSelectedDeck(null) : onClose())}
        aria-label="Chiudi popup"
      >
        ×
      </button>

      <div
        className="popup-decklist"
        onClick={e => e.stopPropagation()} // blocca la propagazione del click
        tabIndex={-1}
      >
        {!selectedDeck ? (
          <>
            <h2 id="popupdecklist-title">I tuoi Mazzi</h2>

            {loading ? (
              <p>Caricamento...</p>
            ) : decks.length === 0 ? (
              <p>Nessun mazzo trovato.</p>
            ) : (
              <ul className="deck-list" role="list">
                {decks.map(deck => (
                  <li key={deck.id}>
                    <button
                      className="deck-list-button"
                      onClick={() => setSelectedDeck(deck.cards)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedDeck(deck.cards);
                        }
                      }}
                      aria-label={`Apri il mazzo ${deck.name || 'senza nome'}`}
                    >
                      {deck.name || 'Deck senza nome'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          // Se vuoi che ti scriva il PopupDeck fammi sapere, qui metto solo la lista
          <div>
            <h3>Mazzo selezionato</h3>
            <button
              onClick={() => setSelectedDeck(null)}
              aria-label="Chiudi mazzo selezionato"
            >
              Chiudi mazzo
            </button>
            {/* Puoi aggiungere qui la visualizzazione delle carte */}
          </div>
        )}
      </div>
    </div>
  );
}
