// src/components/CardItem.jsx

export default function CardItem({ card, onClick }) {
  return (
    <div className="card-item" onClick={onClick} draggable>
      <img src={card.immagine} alt={card.nome} className="card-image" />
      <div className="card-info">
        <h3>{card.nome}</h3>
        <p>{card.tipo} • {card.elemento} • Rank {card.rango || "—"}</p>
        {card.atk !== undefined && <p>ATK: {card.atk}</p>}
        {card.res !== undefined && <p>RES: {card.res}</p>}
      </div>
    </div>
  );
}
