import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, deleteUser, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1rem 2rem',
    background: 'transparent',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '2rem',
  },
  label: {
    display: 'block',
    marginTop: 20,
    color: '#fff',
    fontWeight: 500,
    userSelect: 'none',
  },
  hr: {
    margin: '30px 0',
    border: 'none',
    borderTop: '1px solid #444',
  },
  buttonBase: {
    cursor: 'pointer',
    padding: '0.5rem 1.2rem',
    marginTop: 10,
    marginRight: 10,
    fontSize: '1rem',
    borderRadius: 5,
    border: '2px solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
    userSelect: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  buttonRed: {
    borderColor: '#ff4d4d',
    color: '#ff4d4d',
  },
};

function HoverButton({ onClick, children, red }) {
  const [hover, setHover] = useState(false);

  const baseStyle = { ...styles.buttonBase };
  if (red) {
    Object.assign(baseStyle, styles.buttonRed);
  }

  const hoverStyle = red
    ? { backgroundColor: '#ff4d4d', color: '#fff', borderColor: '#ff4d4d' }
    : { backgroundColor: '#fff', color: '#121212', borderColor: '#fff' };

  return (
    <button
      type="button"
      onClick={onClick}
      style={hover ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
}

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [promosConsent, setPromosConsent] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setPromosConsent(docSnap.data().promosConsent || false);
        }
        setLoading(false);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Sei sicuro di voler eliminare il tuo account?')) {
      try {
        const uid = user.uid;
        await deleteDoc(doc(db, 'users', uid));
        await deleteUser(user);
        alert('Account eliminato con successo.');
        navigate('/');
      } catch (error) {
        alert('Errore nell\'eliminazione: ' + error.message);
      }
    }
  };

  const updateConsent = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), { promosConsent });
      alert('Preferenza aggiornata.');
    }
  };

  if (loading) return <p style={styles.loadingText}>Caricamento...</p>;

  return (
    <>
      <Header />
      <NavigationBar />
      <div style={styles.container}>
        <h2 style={{ color: '#fff', marginTop: 0 }}>Il tuo account</h2>
        <p style={{ color: '#fff', margin: '0.5rem 0' }}>
          <strong>Email:</strong> {user?.email}
        </p>

        <label style={styles.label}>
          <input
            type="checkbox"
            checked={promosConsent}
            onChange={e => setPromosConsent(e.target.checked)}
          />{' '}
          Ricevi email promozionali
        </label>

        <HoverButton onClick={updateConsent}>Salva preferenza</HoverButton>

        <hr style={styles.hr} />

        <HoverButton onClick={handleLogout}>Logout</HoverButton>
        <HoverButton onClick={handleDeleteAccount} red>
          Elimina account
        </HoverButton>
      </div>
    </>
  );
}
