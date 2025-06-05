import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

import Home from './pages/Home';
import Shop from './pages/Shop';
import DeckBuilder from './pages/DeckBuilder';
import Events from './pages/Events';
import Disclaimer from './pages/Disclaimer';
import AccountPage from './pages/AccountPage';
import AdminProducts from './pages/AdminProducts';

import FloatingMenu from './components/FloatingMenu';
import SignupModal from './SignupModal';
import SupportPopupManager from './components/SupportPopupManager';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [deck, setDeck] = useState(() => {
    try {
      const saved = localStorage.getItem('deck');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [decks, setDecks] = useState([]);
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    fetch('/cards.json')
      .then(res => res.json())
      .then(data => setAllCards(data))
      .catch(err => console.error("Errore caricamento cards.json:", err));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
      setShowModal(!currentUser);

      if (currentUser) {
        try {
          const decksRef = collection(db, `users/${currentUser.uid}/decks`);
          const snapshot = await getDocs(decksRef);
          const userDecks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDecks(userDecks);
        } catch (error) {
          console.error("Errore nel recupero dei mazzi:", error);
        }
      } else {
        setDecks([]);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  const onAddCard = (card) => {
    setDeck(prevDeck => {
      const existing = prevDeck.find(c => c.card.id === card.id);
      return existing
        ? prevDeck.map(c =>
            c.card.id === card.id ? { ...c, count: c.count + 1 } : c
          )
        : [...prevDeck, { card, count: 1 }];
    });
  };

  const onRemoveOneFromDeck = (card) => {
    setDeck(prevDeck => {
      const foundIndex = prevDeck.findIndex(c => c.card.id === card.id);
      if (foundIndex === -1) return prevDeck;

      const item = prevDeck[foundIndex];
      if (item.count === 1) {
        return prevDeck.filter((_, i) => i !== foundIndex);
      }

      return prevDeck.map((c, i) =>
        i === foundIndex ? { ...c, count: c.count - 1 } : c
      );
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

  if (checkingAuth) {
    return <div>Caricamento autenticazione...</div>;
  }

  return (
    <Router>
      <div
        className="app-container"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header fisso in alto */}
        <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />

        {/* Navbar fissa sotto header */}
        <NavigationBar style={{ position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 1000 }} />

        {/* Contenuto scrollabile sotto header + navbar */}
        <div
          className="app-scroll-container"
          style={{
            flexGrow: 1,
            marginTop: '110px', // altezza header + navbar (60 + 50)
            overflowY: 'auto',
            padding: '20px',
          }}
        >
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/events" element={<Events />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminProducts />} />
          </Routes>
        </div>

        {user && (
          <FloatingMenu
            user={user}
            deck={deck}
            onExport={handleExport}
            onImportDeck={setDeck}
          />
        )}

        <SignupModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
        <SupportPopupManager />

        {ReactDOM.createPortal(<div id="popup-root" />, document.body)}
      </div>
    </Router>
  );
}
