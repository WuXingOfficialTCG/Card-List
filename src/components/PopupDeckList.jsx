import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './popupDeckList.css';

function PopupDeck({ deck, onClose }) {
  return (
    <div className="popup-deck-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="popupdeck-title">
      <div className="popup-deck-content" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button className="popup-deck-close" onClick={onClose} aria-label="Chiudi popup">×</button>
        <h2 id="popupdeck-title">{deck.name || 'Deck senza nome'}</h2>

        <div className="deck-grid">
          {deck.cards && deck.cards.length > 0 ? (
            deck.cards.map((card, index) => (
              <div key={index} className="deck-card" title={card.nome || 'Carta senza nome'}>
                <img
                  src={card.image || card.img || ''}
                  alt={card.nome || 'Carta'}
                  className="deck-card-image"
                  loading="lazy"
                />
                <div className="deck-card-count">{card.count || 1}</div>
              </div>
            ))
          ) : (
            <p>Questo mazzo non contiene carte.</p>
          )}
        </div>
      </div>
    </div>
  );
}

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
      <div
        className="popup-decklist"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className="close-button"
          onClick={() => (selectedDeck ? setSelectedDeck(null) : onClose())}
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
              <ul className="deck-list" role="list">
                {decks.map(deck => (
                  <li key={deck.id}>
                    <button
                      className="deck-list-button"
                      onClick={() => setSelectedDeck(deck)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedDeck(deck);
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
          <PopupDeck deck={selectedDeck} onClose={() => setSelectedDeck(null)} />
        )}
      </div>
    </div>
  );
}
