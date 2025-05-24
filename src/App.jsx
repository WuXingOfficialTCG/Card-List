import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';

export default function App() {
  // Inizializza il deck da localStorage o array vuoto
  const [deck, setDeck] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('deck')) || [];
    } catch {
      return [];
    }
  });

  // Sincronizza deck su localStorage
  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  // Aggiunge una carta al deck
  const onAddCard = (card) => {
    setDeck(currentDeck => {
      const found = currentDeck.find(c => c.card.id === card.id);
      const totalCount = currentDeck.reduce((sum, c) => sum + c.count, 0);

      if (found) {
        if (found.count >= 3) return currentDeck; // max 3 copie
        return currentDeck.map(c =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }

      if (totalCount >= 40) return currentDeck; // max 40 carte totali

      return [...currentDeck, { card, count: 1 }];
    });
  };

  // Rimuove una copia di una carta dal deck
  const onRemoveOne = (card) => {
    setDeck(currentDeck =>
      currentDeck
        .map(c => c.card.id === card.id ? { ...c, count: c.count - 1 } : c)
        .filter(c => c.count > 0)
    );
  };

  // Esporta il deck in un file JSON scaricabile
  const handleExport = () => {
    const data = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'deck.json';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Router>
      <FloatingMenu onExport={handleExport} />
      <Routes>
        <Route
          path="/"
          element={
            <DeckBuilder
              deck={deck}
              onAddCard={onAddCard}
              onRemoveOne={onRemoveOne}
              setDeck={setDeck}
            />
          }
        />
      </Routes>
    </Router>
  );
}
