import React, { useState } from "react";

const DeckArea = ({ deck, onRemoveCard }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`deck-area ${collapsed ? "collapsed" : ""}`}>
      <div className="deck-header">
        <h2>Il tuo Mazzo ({deck.length})</h2>
        <button className="collapse-btn" onClick={toggleCollapse}>
          {collapsed ? "↑" : "↓"}
        </button>
      </div>

      {!collapsed && (
        <div className="deck-card-list">
          {deck.length === 0 ? (
            <p>Trascina qui le carte per costruire il tuo mazzo.</p>
          ) : (
            deck.map((card, index) => (
              <div key={`${card.id}-${index}`} className="deck-card-item">
                <img src={card.immagine} alt={card.nome} />
                <span>{card.nome}</span>
                <button onClick={() => onRemoveCard(index)}>✕</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DeckArea;
