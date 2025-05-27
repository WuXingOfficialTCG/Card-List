export default function PopupDeckView({ deck, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h2>Deck Attuale</h2>

        <div className="deck-image-grid">
          {deck.map(({ card, count }) => (
            <div key={card.id} className="card-image-wrapper">
              <img src={card.immagine} alt={card.nome} className="deck-card-image" />
              <span className="card-count-badge">{count}x</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
