import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckBuilder from './pages/DeckBuilder';
// import DecksPage from './pages/DecksPage'; // <-- verrà aggiunto in seguito
import FloatingMenu from './components/FloatingMenu'; // importa il menu

export default function App() {
  return (
    <Router>
      <FloatingMenu /> {/* Menu sempre visibile sopra tutte le pagine */}
      <Routes>
        <Route path="/" element={<DeckBuilder />} />
        {/* <Route path="/decks" element={<DecksPage />} /> */}
      </Routes>
    </Router>
  );
}
