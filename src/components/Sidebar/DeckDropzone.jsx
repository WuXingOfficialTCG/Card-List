import React from 'react';

export default function DeckDropzone({ deck, onAddCard, onRemoveOne, onSave }) {
  const maxDeckSize = 40;
  const maxCopies = 3;

  const handleDrop = (e) => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData('application/json');
    if (!cardData) return;

    const card = JSON.parse(cardData);
    const totalCards = deck.reduce((sum, c) => sum + c.count, 0);
    const found = deck.find(c => c.card.id === card.id);

    if (totalCards >= maxDeckSize) return alert('Mazzo pieno (max 40 carte)');
    if (found && found.count >= maxCopies) return alert('Max 3 copie per carta');

    onAddCard(card);
  };

  return (
    <div className="deck-dropzone" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      <h3>Mazzo ({deck.reduce((acc, c) => acc + c.count, 0)} / 40)</h3>
      {deck.length === 0 && <p>Trascina le carte qui per aggiungerle</p>}

      <div className="deck-cards-grid">
        {deck.map(({ card, count }) => (
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
            <span className={`card-count-badge ${count === 3 ? 'max-copies' : ''}`}>
              {count}
            </span>
          </div>
        ))}
      </div>

      <button className="save-deck-button" onClick={onSave}>💾 Salva mazzo</button>
    </div>
  );
}
