import React, { useState } from 'react';
import Header from '../components/Header/Header';
import FloatingMenu from '../components/FloatingMenu';

export default function DeckManager({ user, decks = [], onSelectDeck }) {
  const [expandedDeckId, setExpandedDeckId] = useState(null);

  const toggleDeck = (deckId) => {
    setExpandedDeckId(prevId => (prevId === deckId ? null : deckId));
  };

  const handleDeleteDeck = (deckId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo mazzo?')) {
      // TODO: Aggiungi qui la logica per rimuovere il mazzo da Firestore
      alert('Funzione elimina mazzo da implementare!');
    }
  };

  const handleSelectDeck = (deck) => {
    onSelectDeck(deck.cards || []);
  };

  return (
    <>
      <Header />
      <FloatingMenu user={user} deck={[]} />

      <main style={{ padding: '1rem', maxWidth: 800, margin: 'auto' }}>
        <h1>I tuoi Mazzi</h1>

        {decks.length === 0 ? (
          <p>Non hai ancora creato nessun mazzo.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {decks.map((deck) => (
              <li
                key={deck.id}
                style={{
                  marginBottom: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: 6,
                  padding: '0.75rem',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div
                  onClick={() => toggleDeck(deck.id)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {deck.name}
                  <span>{expandedDeckId === deck.id ? '▲' : '▼'}</span>
                </div>

                {expandedDeckId === deck.id && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {deck.cards?.length > 0 ? (
                      <ul>
                        {deck.cards.map(({ id, nome, count }) => (
                          <li key={id}>
                            {nome} × {count}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Questo mazzo è vuoto.</p>
                    )}

                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={() => handleSelectDeck(deck)}
                        style={{ cursor: 'pointer' }}
                      >
                        Usa questo mazzo
                      </button>

                      <button
                        onClick={() => handleDeleteDeck(deck.id)}
                        style={{
                          color: 'white',
                          backgroundColor: 'red',
                          border: 'none',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 4,
                          cursor: 'pointer'
                        }}
                      >
                        Elimina Mazzo
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
