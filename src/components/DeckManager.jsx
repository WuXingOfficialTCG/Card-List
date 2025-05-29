import React, { useState } from 'react';
import PopupDeckList from './PopupDeck/PopupDeckList';  // path giusto per te
import PopupDeck from './PopupDeck/PopupDeck';          // path giusto per te

export default function DeckManager({ userId }) {
  const [deck, setDeck] = useState([]);
  const [showDeckList, setShowDeckList] = useState(false);
  const [showDeckView, setShowDeckView] = useState(false);

  return (
    <>
      <button onClick={() => setShowDeckList(true)}>Apri Lista Mazzi</button>

      {showDeckList && (
        <PopupDeckList
          userId={userId}
          onClose={() => setShowDeckList(false)}
          onSelectDeck={(selectedDeck) => {
            setDeck(selectedDeck);
            setShowDeckList(false);
            setShowDeckView(true);
          }}
        />
      )}

      {showDeckView && (
        <PopupDeck deck={deck} onClose={() => setShowDeckView(false)} />
      )}
    </>
  );
}
