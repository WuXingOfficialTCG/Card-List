// src/components/CardGrid.jsx
import CardItem from "./CardItem";

export default function CardGrid({ cards, onCardClick, filters }) {
  const filterCards = (card) => {
    const { nome, tipo, minAtk, maxAtk, minRes, maxRes } = filters;

    if (nome && !card.nome.toLowerCase().includes(nome.toLowerCase())) return false;
    if (tipo.length && !tipo.includes(card.tipo)) return false;

    if (typeof card.atk === "number") {
      if (minAtk && card.atk < parseInt(minAtk)) return false;
      if (maxAtk && card.atk > parseInt(maxAtk)) return false;
    }

    if (typeof card.res === "number") {
      if (minRes && card.res < parseInt(minRes)) return false;
      if (maxRes && card.res > parseInt(maxRes)) return false;
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
