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
    padding: '2rem',
    background: '#1e1e1e',
    color: '#fff',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  infoText: {
    color: '#ccc',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginTop: 20,
    color: '#eee',
    fontWeight: 500,
  },
  checkbox: {
    marginRight: '8px',
    transform: 'scale(1.2)',
  },
  hr: {
    margin: '30px 0 20px',
    border: 'none',
    borderTop: '1px solid #444',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  saveBtn: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  logoutBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
  privacyLink: {
    color: '#aaa',
    textDecoration: 'underline',
    fontSize: '0.95rem',
    marginTop: '30px',
    display: 'inline-block',
    transition: 'color 0.2s ease',
  },
};

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

  if (loading) return <p style={{ textAlign: 'center', color: '#fff' }}>Caricamento...</p>;

  return (
    <>
      <Header />
      <NavigationBar />
      <div style={styles.container}>
        <h2 style={styles.title}>Il tuo account</h2>

        <p style={styles.infoText}>
          <strong>Email:</strong> {user?.email}
        </p>

        <label style={styles.label}>
          <input
            type="checkbox"
            checked={promosConsent}
            onChange={e => setPromosConsent(e.target.checked)}
            style={styles.checkbox}
          />
          Ricevi email promozionali
        </label>

        <div style={styles.buttonGroup}>
          <button onClick={updateConsent} style={{ ...styles.button, ...styles.saveBtn }}>
            Salva preferenza
          </button>
        </div>

        <hr style={styles.hr} />

        <div style={styles.buttonGroup}>
          <button onClick={handleLogout} style={{ ...styles.button, ...styles.logoutBtn }}>
            Logout
          </button>
          <button onClick={handleDeleteAccount} style={{ ...styles.button, ...styles.deleteBtn }}>
            Elimina account
          </button>
        </div>

        <a
          href="/disclaimer"
          style={styles.privacyLink}
          onMouseEnter={e => (e.target.style.color = '#fff')}
          onMouseLeave={e => (e.target.style.color = '#aaa')}
        >
          Privacy policy
        </a>
      </div>
    </>
  );
}
