import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function PopupDeckList({ userId, onClose, onSelectDeck }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Errore caricamento mazzi:', error);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchDecks();
  }, [userId]);

  return (
    <div className="popup-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Chiudi popup"
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          ×
        </button>

        <h2>I tuoi mazzi</h2>

        {loading ? (
          <p>Caricamento...</p>
        ) : decks.length === 0 ? (
          <p>Nessun mazzo trovato.</p>
        ) : (
          <ul>
            {decks.map(deck => (
              <li key={deck.id}>
                <button
                  onClick={() => onSelectDeck(deck.cards)}
                  aria-label={`Apri mazzo ${deck.name || 'senza nome'}`}
                >
                  {deck.name || 'Deck senza nome'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
