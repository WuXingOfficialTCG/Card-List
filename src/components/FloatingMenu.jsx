import React, { useEffect, useState, useRef } from 'react';
import { useState } from 'react';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';

export default function FloatingMenu({ onExport }) {
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    const EDGE_MARGIN = 30;

    const resetTimer = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 5000);
    };

    const handleMouseMove = (e) => {
      if (e.clientX >= window.innerWidth - EDGE_MARGIN) {
        resetTimer();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Opzionale: supporto touch
    window.addEventListener('touchstart', resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', resetTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const handleExportClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = (filename) => {
    if (typeof onExport === 'function') {
      onExport(filename);
    }
    setShowPopup(false);
  };

  return (
    <>
      <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
        <button title="Lista Mazzi" aria-label="Lista Mazzi">📋</button>
        <button title="Salva Mazzo" aria-label="Salva Mazzo">💾</button>
        <button onClick={handleExportClick} title="Esporta Mazzo" aria-label="Esporta Mazzo">⬇️</button>
        <button title="Importa Mazzo" aria-label="Importa Mazzo">⬆️</button>
      </div>

      {showPopup && (
        <PopupName
          onConfirm={handleConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
