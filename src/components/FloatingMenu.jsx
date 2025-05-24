import React, { useEffect, useState, useRef } from 'react';
import './floatingMenu.css';
import PopupName from './Sidebar/PopupName';

export default function FloatingMenu({ onExport }) {
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), 5000);
    };

    const handleMouseMove = (e) => {
      if (e.clientX >= window.innerWidth - 30) resetTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const handleExportClick = () => setShowPopup(true);

  const handleConfirm = (filename) => {
    if (onExport) onExport(filename);
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
