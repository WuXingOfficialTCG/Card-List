import React, { useState } from 'react';
import PopupDeck from './PopupDeck';
import './popupDeckList.css';

export default function PopupDeckList({ decks = [], onClose }) {
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Funzione per chiudere il dettaglio mazzo e tornare alla lista
  const closeDeckDetail = () => setSelectedDeck(null);

  return (
    <>
      <div className="popup-backdrop" onClick={onClose}>
        <div
          className="popup-content popup-decklist"
          onClick={e => e.stopPropagation()} // previene chiusura cliccando dentro popup
        >
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
                    aria-label={`Apri mazzo ${deck.name}`}
                  >
                    {deck.name}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button onClick={onClose} className="popup-close-btn">
            Chiudi
          </button>
        </div>
      </div>

      {/* Popup dettaglio mazzo */}
      {selectedDeck && (
        <PopupDeck
          deck={selectedDeck.cards || selectedDeck.deck || []}
          onClose={closeDeckDetail}
        />
      )}
    </>
  );
}

