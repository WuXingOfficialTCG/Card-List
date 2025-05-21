import React, { useState } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';
import FilterSidebar from './components/FilterSidebar';


export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <Header />
      <FilterSidebar />
      <CardGrid onCardClick={handleCardClick} />
      {selectedCard && (
        <Popup card={selectedCard} onClose={handleClose} />
      )}
    </>
  );
}
