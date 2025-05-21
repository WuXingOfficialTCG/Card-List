// src/components/CardPopup.jsx

export default function CardPopup({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-content">
          <div className="popup-left">
            <img src={card.immagine} alt={card.nome} className="popup-image" />
          </div>
          <div className="popup-right">
            <h2>{card.nome}</h2>
            <p><strong>Tipo:</strong> {card.tipo}</p>
            <p><strong>Elemento:</strong> {card.elemento}</p>
            {card.rango && <p><strong>Rank:</strong> {card.rango}</p>}
            {card.atk !== undefined && <p><strong>ATK:</strong> {card.atk}</p>}
            {card.res !== undefined && <p><strong>RES:</strong> {card.res}</p>}
            <div className="popup-effects">
              {card.effetti && card.effetti.map((eff, i) => (
                <div key={i} className="effect-line">
                  <strong>{eff.tipo}:</strong> {eff.descrizione || ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
