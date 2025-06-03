import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';
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

  if (loading) {
    return null; // oppure uno spinner leggero se preferisci
  }

  return (
    <nav className={`navigation-bar navigation-bar-responsive ${isAdmin ? 'six-buttons' : 'five-buttons'}`}>
      <Link to="/" className={getClass('/', 'home')}>HOME</Link>
      <Link to="/deck-builder" className={getClass('/deck-builder', 'deck-builder')}>CARDS</Link>
      <Link to="/shop" className={getClass('/shop', 'shop')}>SHOP</Link>
      <Link to="/events" className={getClass('/events', 'events')}>EVENTS</Link>
      <Link to="/account" className={getClass('/account', 'account')}>ACCOUNT</Link>
      {isAdmin && (
        <Link to="/admin" className={getClass('/admin', 'admin')}>ADMIN</Link>
      )}
    </nav>
  );
}
