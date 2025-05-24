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

  // Funzione per esportare il deck in JSON
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
      <FloatingMenu onExportDeck={exportDeckAsJSON} deck={deck} />
      <Routes>
        {/* Passa deck e setDeck a DeckBuilder così può modificarlo */}
        <Route path="/" element={<DeckBuilder deck={deck} setDeck={setDeck} />} />
      </Routes>
    </Router>
  );
}
