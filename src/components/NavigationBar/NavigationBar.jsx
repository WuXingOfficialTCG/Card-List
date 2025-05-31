import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';
import './NavigationBarResponsive.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function NavigationBar() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setIsAdmin(data.admin === true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Errore recupero dati admin:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const getClass = (path, name) => {
    const base = location.pathname === path ? 'nav-button active' : 'nav-button';
    return `${base} ${name}`;
  };

  // Se vuoi evitare di mostrare la barra finché non sai se è admin
  if (loading) {
    return null; // oppure uno spinner leggero se preferisci
  }

  return (
    <nav className={`navigation-bar navigation-bar-responsive ${isAdmin ? 'six-buttons' : 'five-buttons'}`}>
      <Link to="/" className={getClass('/', 'home')}>Home</Link>
      <Link to="/deck-builder" className={getClass('/deck-builder', 'deck-builder')}>Card List</Link>
      <Link to="/shop" className={getClass('/shop', 'shop')}>Shop</Link>
      <Link to="/events" className={getClass('/events', 'events')}>Events</Link>
      <Link to="/account" className={getClass('/account', 'account')}>Account</Link>
      {isAdmin && (
        <Link to="/admin" className={getClass('/admin', 'admin')}>Admin</Link>
      )}
    </nav>
  );
}
