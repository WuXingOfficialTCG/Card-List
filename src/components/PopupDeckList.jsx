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
        // Supponendo che la collezione si chiami 'decks' e abbia un campo 'userId'
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
    fetchDecks();
  }, [userId]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>

        <h2>Lista dei Deck Salvati</h2>

        {loading ? (
          <p>Caricamento...</p>
        ) : decks.length === 0 ? (
          <p>Nessun deck trovato.</p>
        ) : (
          <ul className="decklist">
            {decks.map(deck => (
              <li
                key={deck.id}
                className="decklist-item"
                onClick={() => {
                  onSelectDeck(deck);
                  onClose();
                }}
                style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ccc' }}
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
