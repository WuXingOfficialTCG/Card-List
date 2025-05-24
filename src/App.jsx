import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';

export default function App() {
  const [deck, setDeck] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('deck')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  const onAddCard = (card) => {
    setDeck(prevDeck => {
      const found = prevDeck.find(c => c.card.id === card.id);
      if (found) {
        if (found.count >= 3) return prevDeck;
        return prevDeck.map(c =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }
      const totalCards = prevDeck.reduce((acc, c) => acc + c.count, 0);
      if (totalCards >= 40) return prevDeck;
      return [...prevDeck, { card, count: 1 }];
    });
  };

  const onRemoveOne = (card) => {
    setDeck(prevDeck =>
      prevDeck
        .map(c => (c.card.id === card.id ? { ...c, count: c.count - 1 } : c))
        .filter(c => c.count > 0)
    );
  };

  const exportDeckAsJSON = (filename) => {
    const deckData = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));

    const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename || 'deck'}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Router>
      <FloatingMenu onExportDeck={exportDeckAsJSON} />
      <Routes>
        <Route
          path="/"
          element={
            <DeckBuilder
              deck={deck}
              onAddCard={onAddCard}
              onRemoveOne={onRemoveOne}
              setDeck={setDeck} // se serve per altre modifiche
            />
          }
        />
      </Routes>
    </Router>
  );
}
