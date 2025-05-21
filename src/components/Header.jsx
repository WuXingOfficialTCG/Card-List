import React from 'react';
import './header.css';

export default function Header() {
  return (
    <header>
      <div className="left">
        <button className="donate" onClick={() => alert('Dona cliccato!')}>Dona</button>
      </div>

      <div className="center-left logo">
        <img src="https://i.imgur.com/yourlogo.png" alt="Logo" />
      </div>

      <div className="center">
        Wu Xing TCG
      </div>

      <nav className="right" aria-label="Social media links">
        {/* esempio Discord */}
        <a href="https://discord.com" target="_blank" rel="noopener" className="social-icon" aria-label="Discord">
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">...</svg>
        </a>
        {/* altre icone */}
      </nav>
    </header>
  );
}
