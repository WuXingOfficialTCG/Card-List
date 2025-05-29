import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { deleteDeck } from '../utility/deleteDeck';
import PopupDeck from './PopupDeck/PopupDeck';
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

  async function handleOpenDeck(deckId) {
    try {
      const docRef = doc(db, 'users', userId, 'decks', deckId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const deckData = docSnap.data();
        setSelectedDeck({ id: deckId, ...deckData });
      } else {
        alert('Mazzo non trovato.');
      }
    } catch (error) {
      console.error('Errore durante l\'apertura del mazzo:', error);
    }
  }

  async function handleDeleteDeck(deckId) {
    const conferma = window.confirm('Sei sicuro di voler eliminare questo mazzo?');
    if (!conferma) return;

    try {
      await deleteDeck(userId, deckId);
      setDecks(prev => prev.filter(deck => deck.id !== deckId));
      if (selectedDeck?.id === deckId) setSelectedDeck(null);
    } catch (error) {
      console.error('Errore durante la cancellazione:', error);
      alert('Errore durante la cancellazione del mazzo.');
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        selectedDeck ? setSelectedDeck(null) : onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDeck, onClose]);

  if (selectedDeck) {
    return (
      <PopupDeck
        deck={selectedDeck}
        onClose={() => setSelectedDeck(null)}
      />
    );
  }

  return (
    <div
      className="popup-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="close-button"
        onClick={onClose}
        aria-label="Chiudi popup"
      >
        ×
      </button>

      <div
        className="popup-decklist"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <h2>I tuoi Mazzi</h2>

        {loading ? (
          <p>Caricamento...</p>
        ) : decks.length === 0 ? (
          <p>Nessun mazzo trovato.</p>
        ) : (
          <ul className="deck-list" role="list">
            {decks.map((deck) => (
              <li key={deck.id} className="deck-list-item">
                <button
                  className="deck-list-button"
                  onClick={() => handleOpenDeck(deck.id)}
                  aria-label={`Apri il mazzo ${deck.name || 'senza nome'}`}
                >
                  {deck.name || 'Deck senza nome'}
                </button>
                <button
                  className="delete-deck-button"
                  onClick={() => handleDeleteDeck(deck.id)}
                  aria-label={`Elimina il mazzo ${deck.name || 'senza nome'}`}
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
