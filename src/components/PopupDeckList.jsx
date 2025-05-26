import React, { useState } from 'react';
import PopupDeck from './PopupDeck';
import './popupDeckList.css';

export default function PopupDeckList({ decks = [], onClose }) {
  const [selectedDeck, setSelectedDeck] = useState(null);

  return (
    <>
      <div className="popup-backdrop">
        <div className="popup-content popup-decklist">
          <h2>Lista Mazzi Salvati</h2>

          {decks.length === 0 ? (
            <p>Nessun mazzo salvato.</p>
          ) : (
            <ul className="deck-list">
              {decks.map((deck, i) => (
                <li key={i}>
                  <button
                    className="deck-list-button"
                    onClick={() => setSelectedDeck(deck)}
                  >
                    {deck.name}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button onClick={onClose}>Chiudi</button>
        </div>
      </div>

      {selectedDeck && (
        <PopupDeck
          deck={selectedDeck.cards || selectedDeck.deck || []}
          onClose={() => setSelectedDeck(null)}
        />
      )}
    </>
  );
}
