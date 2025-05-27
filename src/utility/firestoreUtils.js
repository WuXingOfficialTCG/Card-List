import { db } from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection
} from 'firebase/firestore';

// 🔹 Salva un mazzo permanente dell’utente (manuale)
export async function saveDeckToFirestore(uid, name, cards) {
  const deckRef = doc(collection(db, 'users', uid, 'decks'), name);
  const data = {
    name,
    cards,
    createdAt: new Date()
  };
  await setDoc(deckRef, data);
}

// 🔹 Carica tutti i mazzi salvati manualmente
export async function loadUserDecks(uid) {
  const decksCol = collection(db, 'users', uid, 'decks');
  const snapshot = await getDocs(decksCol);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// 🔹 Elimina un mazzo manuale
export async function deleteDeck(uid, name) {
  const deckRef = doc(db, 'users', uid, 'decks', name);
  await deleteDoc(deckRef);
}

// 🔸 Salva il mazzo temporaneo in Firestore (non definitivo)
export async function saveTempDeck(uid, cards) {
  const tempRef = doc(db, 'users', uid, 'temp', 'current');
  await setDoc(tempRef, {
    cards,
    updatedAt: new Date()
  });
}

// 🔸 Carica il mazzo temporaneo da Firestore
export async function loadTempDeck(uid) {
  const tempRef = doc(db, 'users', uid, 'temp', 'current');
  const snapshot = await getDoc(tempRef);
  return snapshot.exists() ? snapshot.data().cards : null;
}

// 🔸 Elimina il mazzo temporaneo
export async function deleteTempDeck(uid) {
  const tempRef = doc(db, 'users', uid, 'temp', 'current');
  await deleteDoc(tempRef);
}
