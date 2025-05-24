import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';

export default function App() {
  const deck = JSON.parse(localStorage.getItem('deck')) || [];

  const exportDeckAsJSON = (filename) => {
    const deckData = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));
    const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <Router>
      <FloatingMenu onExportDeck={exportDeckAsJSON} />
      <Routes>
        <Route path="/" element={<DeckBuilder />} />
      </Routes>
    </Router>
  );
}
