import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';

export default function App() {
  // Inizializza lo stato deck da localStorage oppure vuoto
  const [deck, setDeck] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('deck')) || [];
    } catch {
      return [];
    }
  });

  // Sincronizza il deck su localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  // Funzione per aggiungere una carta al deck
  const onAddCard = (card) => {
    setDeck((prevDeck) => {
      const found = prevDeck.find((c) => c.card.id === card.id);
      if (found) {
        if (found.count >= 3) return prevDeck; // max 3 copie
        return prevDeck.map((c) =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }
      // nuova carta
      return [...prevDeck, { card, count: 1 }];
    });
  };

  // Funzione per rimuovere una copia di una carta dal deck
  const onRemoveOne = (card) => {
    setDeck((prevDeck) =>
      prevDeck
        .map((c) =>
          c.card.id === card.id ? { ...c, count: c.count - 1 } : c
        )
        .filter((c) => c.count > 0)
    );
  };

  // Funzione per esportare il deck in JSON
  const exportDeckAsJSON = (filename) => {
    const deckData = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));

    const blob = new Blob([JSON.stringify(deckData, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename || 'deck'}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Router>
      <FloatingMenu
        onExportDeck={exportDeckAsJSON}
        deck={deck}
        onAddCard={onAddCard}
        onRemoveOne={onRemoveOne}
      />
      <Routes>
        <Route
          path="/"
          element={
            <DeckBuilder
              deck={deck}
              setDeck={setDeck}
              onAddCard={onAddCard}
              onRemoveOne={onRemoveOne}
            />
          }
        />
      </Routes>
    </Router>
  );
}
