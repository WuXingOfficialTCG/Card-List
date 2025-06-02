import React, { useState } from 'react';

export default function DeckManager({ decks, onSelectDeck, allCards }) {
  const [selectedDeckCards, setSelectedDeckCards] = useState([]);

  const handleClickDeck = (deck) => {
    if (!deck.cards) {
      console.warn("Il mazzo selezionato non contiene la proprietà 'cards'");
      setSelectedDeckCards([]);
      return;
    }

    const fullDeck = deck.cards.map(({ id, count }) => {
      const card = allCards.find(c => c.id.toLowerCase() === id.toLowerCase());
      if (!card) {
        console.warn(`Carta con id "${id}" non trovata in allCards`);
      }
      return card ? { card, count } : null;
    }).filter(Boolean);

    setSelectedDeckCards(fullDeck);
    onSelectDeck(deck.cards); // aggiorna deck in App.js se serve
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>I tuoi mazzi</h2>
      {decks.length === 0 && <p>Nessun mazzo disponibile.</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {decks.map(deck => (
          <li key={deck.id} style={{ marginBottom: 8 }}>
            <button
              type="button"
              onClick={() => handleClickDeck(deck)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: 4,
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0'
              }}
            >
              {deck.name || `Mazzo ${deck.id}`}
            </button>
          </li>
        ))}
      </ul>

      <h3>Mazzo selezionato</h3>
      {selectedDeckCards.length === 0 && <p>Seleziona un mazzo per vedere le carte.</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
        {selectedDeckCards.map(({ card, count }) =>
          Array.from({ length: count }).map((_, i) => (
            <div
              key={`${card.id}-${i}`}
              style={{
                width: 120,
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 8,
                backgroundColor: '#fff'
              }}
            >
              <img
                src={card.immagine}
                alt={card.nome}
                style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 4 }}
              />
              <div style={{ marginTop: 8, fontWeight: 'bold', fontSize: 14 }}>
                {card.nome}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
