// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeckBuilder from './pages/DeckBuilder';
// import DecksPage from './pages/DecksPage';  <-- dopo lo facciamo

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeckBuilder />} />
        {/* <Route path="/decks" element={<DecksPage />} /> */}
      </Routes>
    </Router>
  );
}
