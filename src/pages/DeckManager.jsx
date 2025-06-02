import React, { useState } from 'react';
import Header from './components/Header'; // Adatta il path se serve

export default function DeckManager({ userData }) {
  const [openDeckId, setOpenDeckId] = useState(null);

  if (!userData || !userData.decks) {
    return (
      <>
        <Header />
        <main style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
          <p>Nessun mazzo trovato.</p>
        </main>
      </>
    );
  }

  function toggleDeck(deckId) {
    setOpenDeckId(openDeckId === deckId ? null : deckId);
  }

  return (
    <>
      <Header />
      <main style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
        <h1>Gestione Mazzi</h1>
        <div>
          {userData.decks.map((deck) => (
            <section key={deck.id} style={{ marginBottom: '1rem' }}>
              <button
                onClick={() => toggleDeck(deck.id)}
                aria-expanded={openDeckId === deck.id}
                aria-controls={`deck-cards-${deck.id}`}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                }}
              >
                {deck.nome}
              </button>

              {openDeckId === deck.id && (
                <div
                  id={`deck-cards-${deck.id}`}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 4,
                    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 15,
                  }}
                >
                  {deck.cards && deck.cards.length > 0 ? (
                    deck.cards.map((card) => (
                      <div
                        key={card.id}
                        style={{
                          borderRadius: 6,
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          userSelect: 'none',
                        }}
                      >
                        <img
                          src={card.immagine}
                          alt={card.nome}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                          draggable={false}
                        />
                      </div>
                    ))
                  ) : (
                    <p style={{ gridColumn: '1/-1' }}>Nessuna carta in questo mazzo.</p>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
