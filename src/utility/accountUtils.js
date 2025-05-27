import { auth, db } from '../firebase';
import { signOut, deleteUser } from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

/**
 * Effettua il logout dell'utente corrente e reindirizza
 * @param {function} navigate - funzione di react-router per navigare
 */
export async function logout(navigate) {
  try {
    await signOut(auth);
    navigate('/');
  } catch (error) {
    alert('Errore nel logout: ' + error.message);
  }
}

/**
 * Elimina l'account utente e i dati associati su Firestore
 * @param {object} user - utente Firebase corrente
 * @param {function} navigate - funzione di react-router per navigare
 */
export async function deleteAccount(user, navigate) {
  if (!user) return;

  const confirmed = window.confirm('Sei sicuro di voler eliminare il tuo account?');
  if (!confirmed) return;

  try {
    // Elimina il documento utente da Firestore
    await deleteDoc(doc(db, 'users', user.uid));
    // Elimina l'utente da Firebase Authentication
    await deleteUser(user);
    alert('Account eliminato con successo.');
    navigate('/');
  } catch (error) {
    alert('Errore nell\'eliminazione: ' + error.message);
  }
}

/**
 * Aggiorna il consenso per ricevere email promozionali nel Firestore
 * @param {object} user - utente Firebase corrente
 * @param {boolean} promosConsent - stato del consenso
 */
export async function updatePromosConsent(user, promosConsent) {
  if (!user) return;

  try {
    await updateDoc(doc(db, 'users', user.uid), {
      promosConsent,
    });
    alert('Preferenza aggiornata.');
  } catch (error) {
    alert('Errore nell\'aggiornamento: ' + error.message);
  }
}
