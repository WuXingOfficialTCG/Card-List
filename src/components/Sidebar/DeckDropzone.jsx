import React from 'react';

export default function DeckDropzone({ deck, onAddCard, onRemoveOne }) {
  const totalCards = deck.reduce((sum, c) => sum + c.count, 0);
  const lastCardEntry = deck.length > 0 ? deck[deck.length - 1] : null;

  const handleDrop = (e) => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData('application/json');
    if (!cardData) return;

    const card = JSON.parse(cardData);
    if (totalCards >= 40) return alert('Mazzo pieno (max 40 carte)');

    const found = deck.find(c => c.card.id === card.id);
    if (found && found.count >= 3) return alert('Max 3 copie per carta');

    onAddCard(card);
  };

  return (
    <div
      className="deck-dropzone"
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      <h3>Mazzo ({totalCards} / 40)</h3>
      {deck.length === 0 && <p>Trascina le carte qui per aggiungerle</p>}

      <div className="deck-cards-grid">
        {lastCardEntry && (
          <div
            className="deck-card-wrapper"
            draggable={false}
            title={`${lastCardEntry.card.nome} (Ultima carta aggiunta)`}
          >
            <img
              src={lastCardEntry.card.immagine}
              alt={lastCardEntry.card.nome}
              className="deck-card-img"
            />
            <span
              className={`card-count-badge ${
                lastCardEntry.count === 3 ? 'max-copies' : ''
              }`}
            >
              {lastCardEntry.count}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
