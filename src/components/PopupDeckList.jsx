import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PopupDeck from './PopupDeck';
import './popupDeckList.css';

export default function PopupDeckList({ decks = [], onClose }) {
  const [selectedDeck, setSelectedDeck] = useState(null);

  const closeDeckDetail = () => setSelectedDeck(null);

  const popup = (
    <>
      {/* Backdrop modale */}
      <div
        className="popup-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popupdecklist-title"
      >
        {/* Contenuto popup, blocca il click sul backdrop */}
        <div
          className="popup-content popup-decklist"
          onClick={e => e.stopPropagation()}
          tabIndex={-1}
        >
          <h2 id="popupdecklist-title">Lista Mazzi Salvati</h2>

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

          <button
            onClick={onClose}
            className="popup-close-btn"
            aria-label="Chiudi lista mazzi"
          >
            Chiudi
          </button>
        </div>
      </div>

      {/* Popup dettaglio singolo mazzo */}
      {selectedDeck && (
        <PopupDeck
          deck={selectedDeck.cards || selectedDeck.deck || []}
          onClose={closeDeckDetail}
        />
      )}
    </>
  );

  // Render in portal per sovrapposizione corretta
  return ReactDOM.createPortal(popup, document.getElementById('popup-root'));
}
