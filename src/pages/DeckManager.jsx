import React, { useState } from 'react';
import Header from '../components/Header/Header';
import FloatingMenu from '../components/FloatingMenu';

export default function DeckManager({ user }) {
  const [expandedDeckId, setExpandedDeckId] = useState(null);

  // Se user o user.decks non esistono, fallback a []
  const decks = user?.decks || [];

  const toggleDeck = (deckId) => {
    setExpandedDeckId(prev => (prev === deckId ? null : deckId));
  };

  const deleteDeck = (deckId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo mazzo?')) {
      // Qui devi integrare la logica reale di rimozione dal database o stato globale
      alert('Funzione elimina mazzo da implementare!');
    }
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
              <li key={deck.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: 6, padding: '0.5rem' }}>
                <div
                  onClick={() => toggleDeck(deck.id)}
                  style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', userSelect: 'none' }}
                >
                  {deck.name} {expandedDeckId === deck.id ? '▲' : '▼'}
                </div>

                {expandedDeckId === deck.id && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <ul>
                      {deck.cards.map(({ id, nome, count }) => (
                        <li key={id}>
                          {nome} x{count}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => deleteDeck(deck.id)}
                      style={{ marginTop: 10, color: 'red', cursor: 'pointer' }}
                    >
                      Elimina Mazzo
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
