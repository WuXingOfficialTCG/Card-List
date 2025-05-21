import React, { useState } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import Popup from './components/Popup';

export default function App() {
  const [popupOpen, setPopupOpen] = useState(false);

  // Funzione per aprire il popup
  const openPopup = () => setPopupOpen(true);

  // Funzione per chiudere il popup
  const closePopup = () => setPopupOpen(false);

  return (
    <>
      <Header />
      <CardGrid onCardClick={openPopup} />
      {popupOpen && <Popup onClose={closePopup} />}
    </>
  );
}
