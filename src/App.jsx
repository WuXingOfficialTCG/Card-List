import React, { useState } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';

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
      <CardGrid onCardClick={handleCardClick} />
      {selectedCard && (
        <Popup card={selectedCard} onClose={handleClose} />
      )}
    </>
  );
}
