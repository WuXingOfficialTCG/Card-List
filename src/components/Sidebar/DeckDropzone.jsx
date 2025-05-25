import React from 'react';

export default function DeckDropzone({ deck, onAddCard, onRemoveOne }) {
  const maxDeckSize = 40;
  const maxCopies = 3;

  const totalCards = deck.reduce((sum, c) => sum + c.count, 0);

  const handleDrop = (e) => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData('application/json');
    if (!cardData) return;

    const card = JSON.parse(cardData);
    if (totalCards >= maxDeckSize) return alert('Mazzo pieno (max 40 carte)');

    const found = deck.find(c => c.card.id === card.id);
    if (found && found.count >= maxCopies) return alert('Max 3 copie per carta');

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
        {deck.map(({ card, count }) => {
          const hideMinus = count === 0;
          const hidePlus = totalCards >= maxDeckSize || count >= maxCopies;

          return (
            <div
              key={card.id}
              className="deck-card-wrapper"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData('application/deck-card', JSON.stringify(card))
              }
              title="Trascina fuori per rimuovere 1 copia"
            >
              <img src={card.immagine} alt={card.nome} className="deck-card-img" />
              <div className="deck-card-controls">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (!hideMinus) onRemoveOne(card);
                  }}
                  aria-label={`Rimuovi una copia di ${card.nome}`}
                  style={{ visibility: hideMinus ? 'hidden' : 'visible' }}
                >
                  -
                </button>
                <span className={`card-count-badge ${count === maxCopies ? 'max-copies' : ''}`}>
                  {count}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (!hidePlus) onAddCard(card);
                    else if (totalCards >= maxDeckSize) alert('Mazzo pieno (max 40 carte)');
                    else if (count >= maxCopies) alert('Max 3 copie per carta');
                  }}
                  aria-label={`Aggiungi una copia di ${card.nome}`}
                  style={{ visibility: hidePlus ? 'hidden' : 'visible' }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
