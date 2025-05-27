import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PopupDeck from './PopupDeck';
import './popupDeckList.css';

export default function PopupDecklist({ userId, onClose }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    async function fetchDecks() {
      try {
        const q = query(collection(db, 'users', userId, 'decks'));
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
        if (selectedDeck) {
          setSelectedDeck(null);
        } else {
          onClose();
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedDeck]);

  return (
    <div className="popup-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="popupdecklist-title">
      <div className="popup-content" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button
          className="popup-close"
          onClick={() => {
            if (selectedDeck) setSelectedDeck(null);
            else onClose();
          }}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        {!selectedDeck ? (
          <>
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
                    onClick={() => setSelectedDeck(deck.cards)} // supponendo la proprietà cards contenga le carte
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedDeck(deck.cards);
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
          </>
        ) : (
          <PopupDeck deck={selectedDeck} onClose={() => setSelectedDeck(null)} />
        )}
      </div>
    </div>
  );
}
