import React, { useState } from 'react';
import './style.css';

const mockCards = [
  { id: 1, name: 'Carta Fuoco', img: '/img/fire.png', desc: 'Elemento Fuoco.' },
  { id: 2, name: 'Carta Acqua', img: '/img/water.png', desc: 'Elemento Acqua.' },
];

export default function CardList() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="cardlist-container">
      {/* === SIDEBAR === */}
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="filter-header">
          <h2>Filtri</h2>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        <label>Nome</label>
        <input type="text" className="filter-input" placeholder="Cerca per nome" />

        <hr />

        <label>Elemento</label>
        <div className="checkbox-group two-rows">
          <label><input type="checkbox" /> Fuoco</label>
          <label><input type="checkbox" /> Acqua</label>
          <label><input type="checkbox" /> Terra</label>
          <label><input type="checkbox" /> Aria</label>
        </div>

        <hr />

        <label>ATK Min/Max</label>
        <div className="range-group">
          <input type="number" className="range-input" placeholder="Min" />
          <input type="number" className="range-input" placeholder="Max" />
        </div>
      </div>

      {/* === CARD GRID === */}
      <div className="card-grid">
        {mockCards.length === 0 ? (
          <div className="no-cards-message">Nessuna carta trovata.</div>
        ) : (
          mockCards.map(card => (
            <div key={card.id} className="card" onClick={() => setSelectedCard(card)}>
              <img src={card.img} alt={card.name} className="card-img" />
            </div>
          ))
        )}
      </div>

      {/* === POPUP === */}
      {selectedCard && (
        <div className="popup show" onClick={() => setSelectedCard(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <div className="popup-left">
              <img src={selectedCard.img} className="popup-img" alt={selectedCard.name} />
            </div>
            <div className="popup-right">
              <h2>{selectedCard.name}</h2>
              <p>{selectedCard.desc}</p>
            </div>
            <button className="popup-close-btn" onClick={() => setSelectedCard(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}
