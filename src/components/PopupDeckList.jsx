import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './popup.css';

export default function PopupDecklist({ userId, onClose, onSelectDeck }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDecks() {
      try {
        const q = query(collection(db, 'decks'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const fetchedDecks = [];
        querySnapshot.forEach(doc => {
          fetchedDecks.push({ id: doc.id, ...doc.data() });
        });
        setDecks(fetchedDecks);
      } catch (error) {
        console.error('Errore nel caricamento dei deck:', error);
      } finally {
        setLoading(false);
      }
    }
    if (userId) {
      fetchDecks();
    }
  }, [userId]);

  // Chiude il popup premendo ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="popupdecklist-title">
      <div className="popup-content" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button
          className="popup-close"
          onClick={onClose}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        <h2 id="popupdecklist-title">Lista dei Deck Salvati</h2>

        {loading ? (
          <p>Caricamento...</p>
        ) : decks.length === 0 ? (
          <p>Nessun deck trovato.</p>
        ) : (
          <ul className="decklist" role="list" style={{ paddingLeft: 0 }}>
            {decks.map(deck => (
              <li
                key={deck.id}
                className="decklist-item"
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectDeck(deck);
                  onClose();
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectDeck(deck);
                    onClose();
                  }
                }}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  borderBottom: '1px solid #ccc',
                  userSelect: 'none',
                }}
                aria-label={`Seleziona il deck ${deck.name || 'senza nome'}`}
              >
                {deck.name || 'Deck senza nome'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
