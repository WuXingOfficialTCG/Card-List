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
    const result = cards.filter((card) => {
      if (!card || typeof card !== "object") return false;

      const matchName =
        !filters.name ||
        (card.nome && card.nome.toLowerCase().includes(filters.name.toLowerCase()));

      const matchType =
        filters.types.length === 0 || (card.tipo && filters.types.includes(card.tipo));

      const matchAtk =
        filters.minAtk === null || (typeof card.atk === "number" && card.atk >= filters.minAtk);
      const matchAtkMax =
        filters.maxAtk === null || (typeof card.atk === "number" && card.atk <= filters.maxAtk);

      const matchRes =
        filters.minRes === null || (typeof card.res === "number" && card.res >= filters.minRes);
      const matchResMax =
        filters.maxRes === null || (typeof card.res === "number" && card.res <= filters.maxRes);

      return matchName && matchType && matchAtk && matchAtkMax && matchRes && matchResMax;
    });

    setFilteredCards(result);
  }, [filters]);

  // Funzione per aggiungere una carta al mazzo
  const addToDeck = (card) => {
    setDeck((prevDeck) => [...prevDeck, card]);
  };

  // Funzione per rimuovere una carta dal mazzo
  const removeFromDeck = (index) => {
    setDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      newDeck.splice(index, 1);
      return newDeck;
    });
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
