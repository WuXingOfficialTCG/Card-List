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
      const saved = localStorage.getItem('deck');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setShowModal(!currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  // Persist deck changes to localStorage
  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  const onAddCard = (card) => {
    setDeck((currentDeck) => {
      const totalCards = currentDeck.reduce((sum, c) => sum + c.count, 0);
      const existingCard = currentDeck.find((c) => c.card.id === card.id);

      if (totalCards >= 40) return currentDeck;
      if (existingCard && existingCard.count >= 3) return currentDeck;

      if (existingCard) {
        return currentDeck.map((c) =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      }
      return [...currentDeck, { card, count: 1 }];
    });
  };

  const onRemoveOne = (card) => {
    setDeck((currentDeck) =>
      currentDeck
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
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deck.json';
    a.click();
    URL.revokeObjectURL(url);
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
