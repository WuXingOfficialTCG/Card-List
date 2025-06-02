import React, { useState } from 'react';
import Header from '../components/Header/Header';
import FloatingMenu from '../components/FloatingMenu';

export default function DeckManager({
  user,
  decks = [],
  allCards = [],
  onSelectDeck,
  onRemoveCardFromDeck,
}) {
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
    if (!deck.cards || !Array.isArray(deck.cards)) return;

    const resolvedDeck = deck.cards
      .map(({ nome, count }) => {
        const found = allCards.find(c => c.nome?.toLowerCase().trim() === nome?.toLowerCase().trim());
        return found ? { card: found, count } : null;
      })
      .filter(Boolean);

    onSelectDeck(resolvedDeck);
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
                  color: 'black',
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
                  }}
                >
                  {deck.name}
                  <span>{expandedDeckId === deck.id ? '▲' : '▼'}</span>
                </div>

                {expandedDeckId === deck.id && (
                  <div style={{ marginTop: '0.5rem' }}>
                    {deck.cards?.length > 0 ? (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                          gap: '0.5rem',
                        }}
                      >
                        {deck.cards.flatMap(({ nome, count }) => {
                          const found = allCards.find(
                            c => c.nome?.toLowerCase().trim() === nome?.toLowerCase().trim()
                          );
                          if (!found) {
                            return (
                              <div
                                key={`missing-${nome}`}
                                style={{
                                  border: '1px dashed gray',
                                  padding: 4,
                                  borderRadius: 4,
                                  background: '#ffeaea',
                                  fontSize: 12,
                                  color: '#a00',
                                }}
                              >
                                Carta non trovata: {nome}
                              </div>
                            );
                          }

                          return Array.from({ length: count }, (_, i) => (
                            <div key={`${found.id}-${i}`} style={{ position: 'relative' }}>
                              {found.immagine ? (
                                <img
                                  src={found.immagine}
                                  alt={found.nome}
                                  style={{
                                    width: '100%',
                                    borderRadius: 4,
                                    display: 'block',
                                  }}
                                  draggable={false}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: '100%',
                                    height: 100,
                                    background: '#ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                  }}
                                >
                                  {found.nome}
                                </div>
                              )}

                              <button
                                onClick={() =>
                                  onRemoveCardFromDeck?.(deck.id, found.id)
                                }
                                type="button"
                                style={{
                                  position: 'absolute',
                                  top: 2,
                                  right: 2,
                                  background: 'rgba(255,255,255,0.8)',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: 20,
                                  height: 20,
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                                aria-label={`Rimuovi una copia di ${found.nome}`}
                              >
                                −
                              </button>
                            </div>
                          ));
                        })}
                      </div>
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
                          cursor: 'pointer',
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
