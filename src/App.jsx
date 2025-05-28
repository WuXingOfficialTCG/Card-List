// src/App.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import Shop from './pages/Shop';
import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';
import SignupModal from './SignupModal';
import Disclaimer from './pages/Disclaimer';
import AccountPage from './pages/AccountPage';
import SupportPopupManager from './components/SupportPopupManager';
import AdminProducts from './pages/AdminProducts';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  // Aggiunge una carta al mazzo, o incrementa count se già presente
  const onAddCard = (card) => {
    setDeck(prevDeck => {
      const existing = prevDeck.find(c => c.card.id === card.id);
      if (existing) {
        return prevDeck.map(c =>
          c.card.id === card.id ? { ...c, count: c.count + 1 } : c
        );
      } else {
        return [...prevDeck, { card, count: 1 }];
      }
    });
  };

  // Rimuove una copia della carta dal mazzo, o la elimina se count arriva a zero
  const onRemoveOne = (card) => {
    setDeck(prevDeck => {
      return prevDeck
        .map(c =>
          c.card.id === card.id ? { ...c, count: c.count - 1 } : c
        )
        .filter(c => c.count > 0);
    });
  };

  // Funzione di esportazione (esempio placeholder)
  const handleExport = () => {
    const dataStr = JSON.stringify(deck, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deck-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checkingAuth) return <div>Caricamento autenticazione...</div>;

  return (
    <Router>
      <div className="app-container" style={{ position: 'relative', zIndex: 0 }}>
        {!user && (
          <SignupModal
            show={true}
            onClose={() => {}}
            onSuccess={() => {}}
          />
        )}

        <SupportPopupManager />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/deck-builder"
            element={
              <DeckBuilder
                deck={deck}
                onAddCard={onAddCard}
                onRemoveOne={onRemoveOne}
                setDeck={setDeck}
              />
            }
          />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminProducts />} />
        </Routes>

        {user && (
          <FloatingMenu
            user={user}
            deck={deck}
            onExport={handleExport}
            onImportDeck={imported => setDeck(imported)}
          />
        )}
      </div>
      {ReactDOM.createPortal(
        <div id="popup-root" />,
        document.body
      )}
    </Router>
  );
}
