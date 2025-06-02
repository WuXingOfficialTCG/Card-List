import React, { useState } from 'react';
import Header from '../components/Header/Header';
import FloatingMenu from '../components/FloatingMenu';

export default function DeckManager({ user, decks = [], allCards = [], onSelectDeck, onRemoveCardFromDeck }) {
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
    if (onSelectDeck) {
      onSelectDeck(deck.cards || []);
    }
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
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                          gap: '0.5rem',
                        }}
                      >
                        {deck.cards.flatMap(({ id, count }) => {
                          const card = allCards.find(c => c.id === id);
                          if (!card) return [];
                          return Array.from({ length: count }).map((_, i) => (
                            <div
                              key={`${id}-${i}`}
                              style={{
                                position: 'relative',
                                borderRadius: 4,
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={card.immagine}
                                alt={card.nome}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                draggable={false}
                              />
                              <button
                                onClick={() => onRemoveCardFromDeck && onRemoveCardFromDeck(deck.id, card.id)}
                                aria-label={`Rimuovi una copia di ${card.nome}`}
                                style={{
                                  position: 'absolute',
                                  top: 2,
                                  right: 2,
                                  backgroundColor: 'rgba(255,255,255,0.8)',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: 20,
                                  height: 20,
                                  cursor: 'pointer',
                                  color: 'black',
                                  fontWeight: 'bold',
                                  lineHeight: '18px',
                                  textAlign: 'center',
                                  padding: 0,
                                }}
                                type="button"
                              >
                                −
                              </button>
                            </div>
                          ));
                        })}
                      </div>
                    ) : (
                      <p style={{ color: 'black' }}>Mazzo vuoto</p>
                    )}
                    <button
                      onClick={() => handleDeleteDeck(deck.id)}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 4,
                        border: '1px solid red',
                        backgroundColor: 'white',
                        color: 'red',
                        cursor: 'pointer'
                      }}
                      type="button"
                    >
                      Elimina mazzo
                    </button>
                    <button
                      onClick={() => handleSelectDeck(deck)}
                      style={{
                        marginLeft: '1rem',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 4,
                        border: '1px solid green',
                        backgroundColor: 'white',
                        color: 'green',
                        cursor: 'pointer'
                      }}
                      type="button"
                    >
                      Usa questo mazzo
                    </button>
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
