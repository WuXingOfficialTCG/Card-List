// src/utility/useAutoHideMenu.js
import { useState, useEffect, useRef } from 'react';

export default function useAutoHideMenu(edgeMargin = 30, hideAfter = 5000) {
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setVisible(false), hideAfter);
    };

    const handleMouseMove = (e) => {
      if (e.clientX >= window.innerWidth - edgeMargin) resetTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', resetTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [edgeMargin, hideAfter]);

  return visible;
}
