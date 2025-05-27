// src/App.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';
import SignupModal from './SignupModal';
import Disclaimer from './pages/Disclaimer';
import AccountPage from './pages/AccountPage';
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

  const onAddCard = card => { /* ... */ };
  const onRemoveOne = card => { /* ... */ };
  const handleExport = () => { /* ... */ };

  if (checkingAuth) return <div>Caricamento autenticazione...</div>;

  return (
    <Router>
      {/* 1) Il tuo contenitore principale ha z-index 0 */}
      <div className="app-container" style={{ position: 'relative', zIndex: 0 }}>
        {/* Modale di signup (puoi trasformarlo in portal se vuoi) */}
        {!user && (
          <SignupModal
            show={true}
            onClose={() => {}}
            onSuccess={() => {}}
          />
        )}

        {/* Popup di supporto (usa il suo manager interno) */}
        <SupportPopupManager />

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
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/account" element={<AccountPage />} />
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

      {/* 2) Qui montiamo il div per i portal dei tuoi popup */}
      {ReactDOM.createPortal(
        <div id="popup-root" />,
        document.body
      )}
    </Router>
  );
}
