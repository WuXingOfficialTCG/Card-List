import { db } from '../firebase';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc
} from 'firebase/firestore';

/**
 * Salva un mazzo nel Firestore sotto l'utente loggato
 * @param {string} uid - ID dell'utente Firebase
 * @param {string} name - Nome del mazzo
 * @param {Array} cards - Array con { id, nome, count }
 */
export async function saveDeckToFirestore(uid, name, cards) {
  const deckRef = doc(collection(db, 'users', uid, 'decks'), name);

  const data = {
    name,
    cards,
    createdAt: new Date()
  };

  await setDoc(deckRef, data);
}

/**
 * Carica tutti i mazzi salvati di un utente
 * @param {string} uid - ID dell'utente Firebase
 * @returns {Array} - Lista dei mazzi
 */
export async function loadUserDecks(uid) {
  const decksCol = collection(db, 'users', uid, 'decks');
  const snapshot = await getDocs(decksCol);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Elimina un mazzo dal Firestore
 * @param {string} uid - ID dell'utente Firebase
 * @param {string} name - Nome del mazzo
 */
export async function deleteDeck(uid, name) {
  const deckRef = doc(db, 'users', uid, 'decks', name);
  await deleteDoc(deckRef);
}
