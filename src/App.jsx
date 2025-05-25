import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';
import SignupModal from './SignupModal';

export default function App() {
  const [deck, setDeck] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('deck')) || [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Controllo autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setShowModal(!currentUser); // Mostra il modal se non loggato
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Salvataggio del mazzo nel localStorage
  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  const onAddCard = (card) => {
    setDeck((deck) => {
      const found = deck.find((c) => c.card.id === card.id);
      const total = deck.reduce((sum, c) => sum + c.count, 0);
      if (found) {
        if (found.count >= 3) return deck;
        return deck.map((c) =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }
      if (total >= 40) return deck;
      return [...deck, { card, count: 1 }];
    });
  };

  const onRemoveOne = (card) => {
    setDeck((deck) =>
      deck
        .map((c) =>
          c.card.id === card.id ? { ...c, count: c.count - 1 } : c
        )
        .filter((c) => c.count > 0)
    );
  };

  const handleExport = () => {
    const data = deck.map(({ card, count }) => ({
      id: card.id,
      nome: card.nome,
      count,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'deck.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (checkingAuth) return <div>Caricamento autenticazione...</div>;

  return (
    <Router>
      {showModal && (
        <SignupModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
      {user && <FloatingMenu onExport={handleExport} />}
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
