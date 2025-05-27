export default function PopupDeckView({ deck, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h2>Deck Attuale</h2>
        <ul style={{ maxHeight: '60vh', overflowY: 'auto', textAlign: 'left' }}>
          {deck.map(({ card, count }) => (
            <li key={card.id}>
              {count}x {card.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
