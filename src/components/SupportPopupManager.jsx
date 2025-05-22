import React, { useEffect, useState } from 'react';
import SupportPopup from './SupportPopup';

export default function SupportPopupManager() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('supportPopupLastShown');
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > 6 * 60 * 60 * 1000) {
      setShow(true);
      localStorage.setItem('supportPopupLastShown', now.toString());
    }
  }, []);

  if (!show) return null;

  return <SupportPopup onClose={() => setShow(false)} />;
}
