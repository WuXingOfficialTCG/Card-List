import React, { useEffect, useState } from 'react';
import './FloatingMenu.css';
import PopupName from './Sidebar/PopupName'; // importa il popup

export default function FloatingMenu({ onSaveDeck }) {
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  let hideTimer;

  // Gestione inattività
  useEffect(() => {
    const resetTimer = () => {
      setVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), 5000);
    };

    window.addEventListener('mousemove', (e) => {
      if (e.clientX >= window.innerWidth - 30) resetTimer();
    });

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleSaveClick = () => setShowPopup(true);

  const handleConfirm = (filename) => {
    if (onSaveDeck) onSaveDeck(filename);
    setShowPopup(false);
  };

  return (
    <>
      <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
        <button title="Lista Mazzi">
          📋
        </button>
        <button onClick={handleSaveClick} title="Salva Mazzo">
          💾
        </button>
        <button title="Esporta Mazzo">
          ⬇️
        </button>
        <button title="Importa Mazzo">
          ⬆️
        </button>
      </div>

      {showPopup && <PopupName onConfirm={handleConfirm} onCancel={() => setShowPopup(false)} />}
    </>
  );
}
