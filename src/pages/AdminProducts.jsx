import Header from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isUserAdmin } from '../utility/firebaseHelpers';
import ProductsManager from '../components/ProductsManager';
import EventsManager from '../components/EventsManager';
import './AdminProducts.css';

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const adminCheck = await isUserAdmin(u.uid);
        setIsAdmin(adminCheck);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoadingUser(false);
    });
    return unsubscribe;
  }, []);

  if (loadingUser) return <div>Caricamento utente...</div>;
  if (!user) return <div>Devi essere loggato per accedere a questa pagina.</div>;
  if (!isAdmin) return <div>Accesso negato. Non sei un amministratore.</div>;

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <ProductsManager />
      <hr style={{ margin: '2rem 0' }} />
      <EventsManager />
    </div>
  );
}
