import React, { useEffect, useState } from 'react';
import './FloatingMenu.css';
import PopupName from './Sidebar/PopupName';

export default function FloatingMenu({ onExportDeck }) {
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  let hideTimer;

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

  const handleExportClick = () => setShowPopup(true);

  const handleConfirm = (filename) => {
    if (onExportDeck) onExportDeck(filename);
    setShowPopup(false);
  };

  return (
    <>
      <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
        <button title="Lista Mazzi">📋</button>
        <button title="Salva Mazzo">💾</button>
        <button onClick={handleExportClick} title="Esporta Mazzo">⬇️</button>
        <button title="Importa Mazzo">⬆️</button>
      </div>

      {showPopup && (
        <PopupName onConfirm={handleConfirm} onCancel={() => setShowPopup(false)} />
      )}
    </>
  );
}
