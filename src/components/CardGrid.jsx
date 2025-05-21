// src/components/CardGrid.jsx
import CardItem from "./CardItem";

export default function CardGrid({ cards, onCardClick, filters }) {
  const filterCards = (card) => {
    const { name, types, minAtk, maxAtk, minRes, maxRes } = filters;

    if (name && !card.nome.toLowerCase().includes(name.toLowerCase())) return false;
    if (types.length && !types.includes(card.tipo)) return false;

    if (typeof card.atk === "number") {
      if (minAtk !== null && card.atk < parseInt(minAtk)) return false;
      if (maxAtk !== null && card.atk > parseInt(maxAtk)) return false;
    }

    if (typeof card.res === "number") {
      if (minRes !== null && card.res < parseInt(minRes)) return false;
      if (maxRes !== null && card.res > parseInt(maxRes)) return false;
    }

    return true;
  };

  return (
    <main className="card-grid">
      {cards.filter(filterCards).map((card) => (
        <CardItem key={card.id} card={card} onClick={() => onCardClick(card)} />
      ))}
    </main>
  );
}
