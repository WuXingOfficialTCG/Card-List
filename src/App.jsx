import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import DeckBuilder from './pages/DeckBuilder';
import FloatingMenu from './components/FloatingMenu';
import SignupModal from './SignupModal';
import Disclaimer from './pages/Disclaimer';
import AccountPage from './pages/AccountPage';
import SupportPopupManager from './components/SupportPopupManager';

function AppContent() {
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

  const location = useLocation();

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

  const onAddCard = card => {
    // Implementa la logica per aggiungere una carta
  };
  const onRemoveOne = card => {
    // Implementa la logica per rimuovere una carta
  };
  const handleExport = () => {
    // Implementa la logica per esportare il mazzo
  };

  if (checkingAuth) return <div>Caricamento autenticazione...</div>;

  // Mostra il modal solo se non loggato e non su /disclaimer
  const showSignupModal = !user && location.pathname !== '/disclaimer';

  return (
    <>
      <div className="app-container" style={{ position: 'relative', zIndex: 0 }}>
        {showSignupModal && (
          <SignupModal
            show={true}
            onClose={() => {
              // Opzionale: puoi aggiungere logica per chiudere modal
            }}
            onSuccess={() => {
              // Opzionale: azione dopo login/registrazione
            }}
          />
        )}

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

      {ReactDOM.createPortal(<div id="popup-root" />, document.body)}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
