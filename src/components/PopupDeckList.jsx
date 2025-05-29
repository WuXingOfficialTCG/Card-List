import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { deleteDeck } from '../utility/deleteDeck';
import { db } from '../firebase';
import './popupDeckList.css';

export default function PopupDecklist({ userId, onClose, onSelectDeck }) {
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
        console.error('Errore nel caricamento dei mazzi:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchDecks();
  }, [userId]);

  const handleDeleteDeck = async (deckId) => {
    const conferma = window.confirm('Sei sicuro di voler eliminare questo mazzo?');
    if (!conferma) return;
    try {
      await deleteDeck(userId, deckId);
      setDecks(prev => prev.filter(deck => deck.id !== deckId));
    } catch (error) {
      console.error(error);
      alert('Errore durante la cancellazione.');
    }
  };

  return (
    <div className="popup-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="popup-decklist" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button onClick={onClose} className="close-button" aria-label="Chiudi popup">×</button>

        <h2>I tuoi Mazzi</h2>
        {loading ? (
          <p>Caricamento...</p>
        ) : decks.length === 0 ? (
          <p>Nessun mazzo trovato.</p>
        ) : (
          <ul className="deck-list" role="list">
            {decks.map(deck => (
              <li key={deck.id} className="deck-list-item">
                <button
                  onClick={() => onSelectDeck(deck.cards)}
                  className="deck-list-button"
                  aria-label={`Apri mazzo ${deck.name || 'senza nome'}`}
                >
                  {deck.name || 'Deck senza nome'}
                </button>
                <button
                  onClick={() => handleDeleteDeck(deck.id)}
                  className="delete-deck-button"
                  aria-label={`Elimina mazzo ${deck.name || 'senza nome'}`}
                  title="Elimina mazzo"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
