import React from 'react';
import './sidebar.css';

export default function Sidebar({ filters, onFilterChange, deck, onAddCard }) {
  const maxDeckSize = 40;
  const maxCopies = 3;

  const handleDrop = e => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData('application/json');
    if (!cardData) return;
    const card = JSON.parse(cardData);

    const totalCards = deck.reduce((acc, c) => acc + c.count, 0);
    if (totalCards >= maxDeckSize) {
      alert('Mazzo pieno (max 40 carte)');
      return;
    }
    const found = deck.find(c => c.card.id === card.id);
    if (found && found.count >= maxCopies) {
      alert('Max 3 copie per carta');
      return;
    }

    onAddCard(card);
  };

  const handleDragOver = e => e.preventDefault();

  return (
    <aside className="sidebar">
      <div className="filters-section">
        <h3>Filtri</h3>
        <div className="filter-group">
          <label>Elemento</label>
          <select onChange={e => onFilterChange('elemento', e.target.value)} defaultValue="">
            <option value="">Tutti</option>
            {filters.elemento.map(el => (
              <option key={el} value={el}>{el}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Tipo</label>
          <select onChange={e => onFilterChange('tipo', e.target.value)} defaultValue="">
            <option value="">Tutti</option>
            {filters.tipo.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <hr />

      <div className="deck-dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
        <h3>Mazzo ({deck.reduce((acc, c) => acc + c.count, 0)} / 40)</h3>
        {deck.length === 0 && <p>Trascina le carte qui per aggiungerle al mazzo</p>}
        <div className="deck-grid">
          {deck.map(({ card, count }) => (
            <div key={card.id} className="deck-card-wrapper">
              <img src={card.immagine} alt={card.nome} className="deck-card-img" />
              <div className="card-count-badge">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
