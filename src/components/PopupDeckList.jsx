import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './popupDeckList.css';

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchDecks();
  }, [userId]);

  // Al click apro il mazzo, carico i dettagli e chiamo onSelectDeck
  async function handleOpenDeck(deckId) {
    try {
      const docRef = doc(db, 'users', userId, 'decks', deckId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const deckData = docSnap.data();
        // Passo l’array di carte a onSelectDeck
        if (typeof onSelectDeck === 'function') {
          onSelectDeck(deckData.cards || []);
        }
        onClose();
      } else {
        alert('Mazzo non trovato.');
      }
    } catch (error) {
      console.error(error);
      alert('Errore durante il caricamento del mazzo.');
    }
  }

  return (
    <div
      className="popup-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popupdecklist-title"
    >
      <div
        className="popup-decklist"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        <h2 id="popupdecklist-title">I tuoi Mazzi</h2>

        {loading ? (
          <p>Caricamento...</p>
        ) : decks.length === 0 ? (
          <p>Nessun mazzo trovato.</p>
        ) : (
          <ul className="deck-list">
            {decks.map(deck => (
              <li key={deck.id} className="deck-list-item">
                <button
                  className="deck-list-button"
                  onClick={() => handleOpenDeck(deck.id)}
                  aria-label={`Apri mazzo ${deck.name || 'Senza nome'}`}
                >
                  {deck.name || 'Senza nome'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
