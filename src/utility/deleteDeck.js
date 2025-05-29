import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function deleteDeck(userId, deckId) {
  if (!userId || !deckId) throw new Error('userId e deckId sono richiesti');

  const deckDocRef = doc(db, 'users', userId, 'decks', deckId);
  await deleteDoc(deckDocRef);
}
