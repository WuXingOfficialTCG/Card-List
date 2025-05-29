import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { deleteDeck } from '../utility/deleteDeck';
import { db } from '../firebase';
import PopupDeck from './PopupDeck';
import './popupDeckList.css';

export default function PopupDeckList({ userId, onClose }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeckCards, setSelectedDeckCards] = useState(null);

  // Carica tutti i mazzi disponibili (solo id e nome)
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

  // Carica il mazzo specifico da Firestore al click
  const handleOpenDeck = async (deckId) => {
    try {
      const deckDoc = await getDoc(doc(db, 'users', userId, 'decks', deckId));
      if (deckDoc.exists()) {
        const deckData = deckDoc.data();
        if (deckData.cards) {
          setSelectedDeckCards(deckData.cards);
        } else {
          alert('Questo mazzo non ha carte.');
        }
      } else {
        alert('Mazzo non trovato.');
      }
    } catch (error) {
      console.error('Errore durante l\'apertura del mazzo:', error);
      alert('Errore durante il caricamento del mazzo.');
    }
  };

  const handleDeleteDeck = async (deckId) => {
    const conferma = window.confirm('Sei sicuro di voler eliminare questo mazzo?');
    if (!conferma) return;

    try {
      await deleteDeck(userId, deckId);
      setDecks(prev => prev.filter(deck => deck.id !== deckId));
      setSelectedDeckCards(null);
    } catch (error) {
      console.error('Errore durante la cancellazione del mazzo:', error);
      alert('Errore durante la cancellazione del mazzo.');
    }
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        selectedDeckCards ? setSelectedDeckCards(null) : onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedDeckCards]);

  // 🔁 Render
  return (
    <>
      {selectedDeckCards ? (
        <PopupDeck
          deck={selectedDeckCards}
          onClose={() => setSelectedDeckCards(null)}
        />
      ) : (
        <div
          className="popup-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popupdecklist-title"
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
            <h2 id="popupdecklist-title">I tuoi Mazzi</h2>

            {loading ? (
              <p>Caricamento...</p>
            ) : decks.length === 0 ? (
              <p>Nessun mazzo trovato.</p>
            ) : (
              <ul className="deck-list" role="list">
                {decks.map(deck => (
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
      )}
    </>
  );
}
