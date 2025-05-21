// src/App.jsx
import { useState, useEffect } from "react";
import cards from "./data/cards";
import Header from "./components/Header";
import SidebarFilter from "./components/SidebarFilter";
import CardGrid from "./components/CardGrid";
import DeckArea from "./components/DeckArea";
import PopupSupport from "./components/PopupSupport";
import "./style.css";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [filteredCards, setFilteredCards] = useState(cards);
  const [filters, setFilters] = useState({
    name: "",
    types: [],
    minAtk: null,
    maxAtk: null,
    minRes: null,
    maxRes: null,
  });

  const [deck, setDeck] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deckAreaCollapsed, setDeckAreaCollapsed] = useState(false);

  // Applica i filtri ogni volta che cambiano
  useEffect(() => {
    let result = cards.filter((card) => {
      const matchName = card.nome.toLowerCase().includes(filters.name.toLowerCase());
      const matchType = filters.types.length === 0 || filters.types.includes(card.tipo);
      const matchAtk =
        filters.minAtk === null || (card.atk !== undefined && card.atk >= filters.minAtk);
      const matchAtkMax =
        filters.maxAtk === null || (card.atk !== undefined && card.atk <= filters.maxAtk);
      const matchRes =
        filters.minRes === null || (card.res !== undefined && card.res >= filters.minRes);
      const matchResMax =
        filters.maxRes === null || (card.res !== undefined && card.res <= filters.maxRes);

      return matchName && matchType && matchAtk && matchAtkMax && matchRes && matchResMax;
    });
    setFilteredCards(result);
  }, [filters]);

  // Funzioni
  const addToDeck = (card) => {
    setDeck([...deck, card]);
  };

  const removeFromDeck = (index) => {
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);
  };

  return (
    <>
      {showPopup && <PopupSupport onClose={() => setShowPopup(false)} />}

      <Header />

      <div className="main-layout">
        <SidebarFilter
          filters={filters}
          setFilters={setFilters}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <CardGrid cards={filteredCards} onCardClick={addToDeck} />

        <DeckArea
          deck={deck}
          onRemove={removeFromDeck}
          collapsed={deckAreaCollapsed}
          setCollapsed={setDeckAreaCollapsed}
        />
      </div>
    </>
  );
}

export default App;
