import React, { useState } from 'react';
import Header from '../components/Header/Header';
import FloatingMenu from '../components/FloatingMenu';

export default function DeckManager({ user, decks = [], cards = [], onSelectDeck }) {
  const [expandedDeckId, setExpandedDeckId] = useState(null);

  const toggleDeck = (deckId) => {
    setExpandedDeckId(prevId => (prevId === deckId ? null : deckId));
  };

  const handleDeleteDeck = (deckId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo mazzo?')) {
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
        <h1 style={{ color: 'white' }}>I tuoi Mazzi</h1>

        {decks.length === 0 ? (
          <p style={{ color: 'black' }}>Non hai ancora creato nessun mazzo.</p>
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
                  backgroundColor: '#f9f9f9',
                  color: 'black'
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
                    alignItems: 'center',
                    color: 'black'
                  }}
                >
                  {deck.name}
                  <span>{expandedDeckId === deck.id ? '▲' : '▼'}</span>
                </div>

                {expandedDeckId === deck.id && (
                  <div style={{ marginTop: '0.5rem', color: 'black' }}>
                    {deck.cards?.length > 0 ? (
                      <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {deck.cards.map(({ id, count }) => {
                          const card = cards.find(c => c.id === id);
                          if (!card) return null;
                          return (
                            <li key={id} style={{ display: 'flex', gap: '0.25rem' }}>
                              {Array.from({ length: count }).map((_, i) => (
                                <img
                                  key={i}
                                  src={card.immagine}
                                  alt={card.nome}
                                  style={{ width: 80, height: 'auto', borderRadius: 4 }}
                                />
                              ))}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>Questo mazzo è vuoto.</p>
                    )}

                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={() => handleSelectDeck(deck)}
                        style={{ cursor: 'pointer', color: 'black' }}
                      >
                        Rinomina
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
