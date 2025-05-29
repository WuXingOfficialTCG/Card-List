import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { deleteDeck } from '../utility/deleteDeck';
import { db } from '../firebase';
import './popupDeckList.css';

export default function PopupDeckList({ userId, onClose }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Carica i mazzi
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

  // Funzione per eliminare un mazzo con conferma
  const handleDeleteDeck = async (deckId) => {
    const conferma = window.confirm('Sei sicuro di voler eliminare questo mazzo? Questa operazione non può essere annullata.');
    if (!conferma) return;

    try {
      await deleteDeck(userId, deckId);
      // Aggiorna la lista mazzi eliminando quello cancellato
      setDecks(prev => prev.filter(deck => deck.id !== deckId));
      // Se il mazzo selezionato è stato cancellato, chiudi la selezione
      if (selectedDeck && selectedDeck.id === deckId) setSelectedDeck(null);
    } catch (error) {
      console.error('Errore durante la cancellazione del mazzo:', error);
      alert('Errore durante la cancellazione del mazzo. Riprova.');
    }
  };

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
      <button
        className="close-button"
        onClick={() => (selectedDeck ? setSelectedDeck(null) : onClose())}
        aria-label="Chiudi popup"
      >
        ×
      </button>

      <div
        className="popup-decklist"
        onClick={e => e.stopPropagation()}
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
                  <li key={deck.id} className="deck-list-item">
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
          </>
        ) : (
          <div>
            <h3>Mazzo selezionato</h3>
            <button
              onClick={() => setSelectedDeck(null)}
              aria-label="Chiudi mazzo selezionato"
            >
              Chiudi mazzo
            </button>
            {/* Qui puoi inserire visualizzazione mazzo */}
          </div>
        )}
      </div>
    </div>
  );
}
