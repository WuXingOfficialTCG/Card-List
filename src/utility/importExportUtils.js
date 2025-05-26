import { saveDeckToFirestore } from './firestoreUtils';

/**
 * Carica mazzi salvati da localStorage.
 * @returns {Array} Lista di mazzi salvati o array vuoto.
 */
export function loadSavedDecksFromStorage() {
  const saved = localStorage.getItem('savedDecks');
  try {
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Salva un mazzo su Firestore con nome fornito via prompt.
 * @param {string} uid - ID utente.
 * @param {Array} deck - Lista carte nel mazzo.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function saveDeckWithName(uid, deck) {
  const name = prompt('Inserisci un nome per il mazzo:');
  if (!name) throw new Error('Salvataggio annullato: nessun nome inserito.');

  const formattedDeck = deck.map(({ card, count }) => ({
    id: card.id,
    nome: card.nome,
    count,
  }));

  try {
    await saveDeckToFirestore(uid, name, formattedDeck);
    return { success: true, message: 'Mazzo salvato con successo!' };
  } catch (error) {
    console.error('Errore salvataggio:', error);
    throw new Error('Errore durante il salvataggio su Firestore.');
  }
}

/**
 * Importa un mazzo da file JSON. Il file deve contenere { name, cards }.
 * @param {File} file - File .json selezionato dall'utente.
 * @returns {Promise<Object>} Oggetto deck completo (name, cards).
 */
export function importDeckFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      try {
        const json = JSON.parse(e.target.result);

        if (!Array.isArray(json) && !json.cards && !json.deck) {
          return reject(new Error('Formato non valido. JSON deve contenere un array o un oggetto deck.'));
        }

        const name = file.name.replace(/\.json$/, '');
        const deck = Array.isArray(json) ? json : (json.cards || json.deck);

        if (!Array.isArray(deck)) {
          return reject(new Error('Il file JSON non contiene una lista di carte valida.'));
        }

        resolve({
          name,
          cards: deck,
        });
      } catch (err) {
        reject(new Error('Errore durante la lettura del file JSON.'));
      }
    };

    reader.onerror = () => reject(new Error('Errore nella lettura del file.'));
    reader.readAsText(file);
  });
}
