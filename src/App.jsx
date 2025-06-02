import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

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
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Deck di lavoro (build current deck)
  const [deck, setDeck] = useState(() => {
    try {
      const saved = localStorage.getItem('deck');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mazzi dell'utente
  const [decks, setDecks] = useState([]);

  // Pool carte completo (tutte le carte)
  const [allCards, setAllCards] = useState([]);

  // Carica tutte le carte da file JSON
  useEffect(() => {
    fetch('/cards.json')
      .then(res => res.json())
      .then(setAllCards)
      .catch(err => console.error("Errore caricamento cards.json:", err));
  }, []);

  // Autenticazione e caricamento mazzi utente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);

      if (currentUser) {
        try {
          const decksRef = collection(db, `users/${currentUser.uid}/decks`);
          const snapshot = await getDocs(decksRef);
          const userDecks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDecks(userDecks);
        } catch (error) {
          console.error("Errore nel recupero dei mazzi:", error);
          setDecks([]);
        }
      } else {
        setDecks([]);
      }
    });

    return unsubscribe;
  }, []);

  // Salva il deck di lavoro in localStorage
  useEffect(() => {
    localStorage.setItem('deck', JSON.stringify(deck));
  }, [deck]);

  // Aggiunge carta al deck di lavoro (deckBuilder)
  const addCardToDeck = (card) => {
    setDeck(prev => {
      const found = prev.find(c => c.card.id === card.id);
      if (found) {
        return prev.map(c => (c.card.id === card.id ? { ...c, count: c.count + 1 } : c));
      } 
      return [...prev, { card, count: 1 }];
    });
  };

  // Rimuove una copia di carta dal deck di lavoro
  const removeOneCardFromDeck = (card) => {
    setDeck(prev => {
      const idx = prev.findIndex(c => c.card.id === card.id);
      if (idx === -1) return prev;
      
      const item = prev[idx];
      if (item.count === 1) {
        return prev.filter((_, i) => i !== idx);
      }
      
      return prev.map((c, i) => (i === idx ? { ...c, count: c.count - 1 } : c));
    });
  };

  // Reset deck di lavoro
  const resetDeck = () => setDeck([]);

  // Importa mazzo selezionato (deckManager)
  const importDeck = (cardsInDeck) => {
    if (!allCards.length) {
      console.warn("Pool carte non ancora caricato");
      return;
    }
    const fullDeck = cardsInDeck.map(({ id, count }) => {
      const card = allCards.find(c => c.id === id);
      if (!card) console.warn(`Carta con id ${id} non trovata nel pool`);
      return card ? { card, count } : null;
    }).filter(Boolean);

    setDeck(fullDeck);
  };

  // Esporta deck di lavoro in file JSON
  const exportDeck = () => {
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
      <div className="app-container" style={{ position: 'relative', zIndex: 0 }}>
        {!user && <SignupModal show={true} onClose={() => {}} onSuccess={() => {}} />}
        <SupportPopupManager />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/deck-builder"
            element={
              <DeckBuilder
                deck={deck}
                onAddCard={addCardToDeck}
                onRemoveOneFromDeck={removeOneCardFromDeck}
                onResetDeck={resetDeck}
              />
            }
          />
          <Route
            path="/deck-manager"
            element={
              <DeckManager
                user={user}
                decks={decks}
                onSelectDeck={importDeck}
                allCards={allCards}
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
            onExport={exportDeck}
            onImportDeck={setDeck}
          />
        )}
      </div>

      {ReactDOM.createPortal(<div id="popup-root" />, document.body)}
    </Router>
  );
}
