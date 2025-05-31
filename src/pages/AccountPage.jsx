import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, deleteUser, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';

import './AccountPage.css';

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
      await updateDoc(doc(db, 'users', user.uid), {
        promosConsent
      });
      alert('Preferenza aggiornata.');
    }
  };

  if (loading) return <p>Caricamento...</p>;

  return (
    <>
      <Header />
      <NavigationBar />

      <div className="account-page-container">
        <h2>Il tuo account</h2>
        <p><strong>Email:</strong> {user?.email}</p>

        <label className="promos-consent-label">
          <input
            type="checkbox"
            checked={promosConsent}
            onChange={e => setPromosConsent(e.target.checked)}
          /> Ricevi email promozionali
        </label>
        <button className="btn save-btn" onClick={updateConsent}>Salva preferenza</button>

        <hr className="divider" />

        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        <button className="btn delete-btn" onClick={handleDeleteAccount}>
          Elimina account
        </button>

        <hr className="divider" />

        <h3>Vuoi supportare il progetto?</h3>
        {/* Pulsante donazione rimosso */}
      </div>
    </>
  );
}
