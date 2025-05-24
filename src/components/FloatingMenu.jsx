import React, { useEffect, useRef, useState } from 'react';
import './floatingMenu.css';

export default function FloatingMenu({ onSave, onExport, onImport, onShowDeckList }) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  // Nascondi dopo 5s di inattività
  useEffect(() => {
    const resetTimer = () => {
      setVisible(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    resetTimer(); // primo avvio

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (e.clientX >= window.innerWidth - 50) {
      setVisible(true);
    }
  };

  return (
    <div className={`floating-menu ${visible ? 'visible' : 'hidden'}`}>
      <button title="Lista Mazzi" onClick={onShowDeckList}>📋</button>
      <button title="Salva Mazzo" onClick={onSave}>💾</button>
      <button title="Esporta Mazzo" onClick={onExport}>📤</button>
      <button title="Importa Mazzo" onClick={onImport}>📥</button>
    </div>
  );
}
