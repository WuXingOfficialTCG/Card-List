import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SupportPopup from '../SupportPopup';
import './header.css';
import './headerResponsive.css';

export default function Header({ languageToggle }) {
  const [showSupport, setShowSupport] = useState(false);
  const location = useLocation();

  const openSupportPopup = () => setShowSupport(true);
  const closeSupportPopup = () => setShowSupport(false);

  const isHome = location.pathname === '/';

  return (
    <>
      <header>
        <div className="left">
          <button className="donate" onClick={openSupportPopup}>
            Dona
          </button>
        </div>

        {isHome ? (
          <div className="center">
            <img src="https://i.imgur.com/slIDTEM.png" alt="Logo" className="logo" />
            <span className="title">Wu Xing TCG</span>
          </div>
        ) : (
          <Link to="/" className="center" aria-label="Torna alla home">
            <img src="https://i.imgur.com/slIDTEM.png" alt="Logo" className="logo" />
            <span className="title">Wu Xing TCG</span>
          </Link>
        )}

        <nav className="right" aria-label="Social media links">
          {languageToggle && (
            <div className="language-toggle">
              {languageToggle}
            </div>
          )}

          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Discord"
          >
            <img src="https://i.imgur.com/iXb26SA.png" alt="Discord" width="24" height="24" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            <img src="https://i.imgur.com/ISEyV5G.png" alt="Instagram" width="24" height="24" />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="YouTube"
          >
            <img src="https://i.imgur.com/YHoAhki.png" alt="YouTube" width="24" height="24" />
          </a>
        </nav>
      </header>

      {showSupport && <SupportPopup onClose={closeSupportPopup} />}
    </>
  );
}
