import { useState } from "react";
import cards from "./data/cards";
import Header from "./components/Header";
import SidebarFilter from "./components/SidebarFilter";
import CardGrid from "./components/CardGrid";
import DeckArea from "./components/DeckArea";
import "./style.css";

function App() {
  const [filteredCards, setFilteredCards] = useState(cards); // Mostra tutte le carte senza filtro
  const [filters, setFilters] = useState({
    nome: "",
    tipo: [],
    atk: "",
    res: "",
  });

  const [deck, setDeck] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deckAreaCollapsed, setDeckAreaCollapsed] = useState(false);

  // Rimuovo il useEffect con il filtro

  const addToDeck = (card) => {
    setDeck((prevDeck) => [...prevDeck, card]);
  };

  const removeFromDeck = (index) => {
    setDeck((prevDeck) => {
      const newDeck = [...prevDeck];
      newDeck.splice(index, 1);
      return newDeck;
    });
  };

  return (
    <>
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
