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
    setDeck(deck => {
      const found = deck.find(c => c.card.id === card.id);
      const total = deck.reduce((sum, c) => sum + c.count, 0);
      if (found) {
        if (found.count >= 3) return deck;
        return deck.map(c => c.card.id === card.id ? { ...c, count: c.count + 1 } : c);
      }
      if (total >= 40) return deck;
      return [...deck, { card, count: 1 }];
    });
  };

  const onRemoveOne = (card) => {
    setDeck(deck =>
      deck
        .map(c => c.card.id === card.id ? { ...c, count: c.count - 1 } : c)
        .filter(c => c.count > 0)
    );
  };

  const handleExport = () => {
    const data = deck.map(({ card, count }) => ({ id: card.id, nome: card.nome, count }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'deck.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <Router>
      <FloatingMenu onExport={handleExport} />
      <Routes>
        <Route path="/" element={<DeckBuilder deck={deck} onAddCard={onAddCard} onRemoveOne={onRemoveOne} setDeck={setDeck} />} />
      </Routes>
    </Router>
  );
}
