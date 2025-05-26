// AccountPage.jsx
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, deleteUser, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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
        navigate('/'); // O login page
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
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2>Il tuo account</h2>
      <p><strong>Email:</strong> {user?.email}</p>

      <label style={{ display: 'block', marginTop: '20px' }}>
        <input
          type="checkbox"
          checked={promosConsent}
          onChange={e => setPromosConsent(e.target.checked)}
        /> Ricevi email promozionali
      </label>
      <button onClick={updateConsent} style={{ marginTop: '10px' }}>Salva preferenza</button>

      <hr style={{ margin: '30px 0' }} />

      <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
      <button onClick={handleDeleteAccount} style={{ backgroundColor: 'red', color: 'white' }}>
        Elimina account
      </button>

      <hr style={{ margin: '30px 0' }} />

      <h3>Vuoi supportare il progetto?</h3>
      <form action="https://www.paypal.com/donate" method="post" target="_blank">
        <input type="hidden" name="hosted_button_id" value="IL_TUO_ID_PAYPAL" />
        <button type="submit">Fai una donazione</button>
      </form>
    </div>
  );
}
