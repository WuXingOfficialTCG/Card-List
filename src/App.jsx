import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import Shop from './pages/Shop';
import DeckBuilder from './pages/DeckBuilder';
import DeckManager from './pages/DeckManager';
import Events from './pages/Events';
import Disclaimer from './pages/Disclaimer';
import AccountPage from './pages/AccountPage';
import AdminProducts from './pages/AdminProducts';

import FloatingMenu from './components/FloatingMenu';
import SignupModal from './SignupModal';
import SupportPopupManager from './components/SupportPopupManager';

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

  // Rimuove una copia del card, passando anche opzionalmente l'indice copia cliccata
  const onRemoveOneFromDeck = (card, copyIndex = 0) => {
    setDeck(prevDeck => {
      const foundIndex = prevDeck.findIndex(c => c.card.id === card.id);
      if (foundIndex === -1) return prevDeck;

      const item = prevDeck[foundIndex];

      if (item.count === 1) {
        // Rimuovi completamente l'elemento se è l'ultima copia
        return prevDeck.filter((_, i) => i !== foundIndex);
      }

      // Altrimenti decrementa solo il count
      return prevDeck.map((c, i) =>
        i === foundIndex ? { ...c, count: c.count - 1 } : c
      );
    });
  };

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
                onRemoveOneFromDeck={onRemoveOneFromDeck}
                onResetDeck={() => setDeck([])}
              />
            }
          />
          <Route
            path="/deck-manager"
            element={
              <DeckManager
                user={user}
                onSelectDeck={selectedDeck => setDeck(selectedDeck)}
              />
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/events" element={<Events />} />
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

      {ReactDOM.createPortal(<div id="popup-root" />, document.body)}
    </Router>
  );
}
