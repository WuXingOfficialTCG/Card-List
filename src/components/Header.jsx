import React from 'react';
import './header.css';

export default function Header() {
  return (
    <header>
      <div className="left">
        <button className="donate" onClick={() => alert('Dona cliccato!')}>Dona</button>
      </div>

      <div className="center-left logo">
        <img src="https://i.imgur.com/slIDTEM.png" alt="Logo" />
      </div>

      <div className="center">
        Wu Xing TCG
      </div>

      <nav className="right" aria-label="Social media links">
        {/* Discord */}
        <a 
          href="https://discord.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon" 
          aria-label="Discord"
        >
          <img src="https://i.imgur.com/iXb26SA.png" alt="Discord" width="24" height="24" />
        </a>

        {/* Instagram */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-icon" 
          aria-label="Instagram"
        >
          <img src="https://i.imgur.com/ISEyV5G.png" alt="Instagram" width="24" height="24" />
        </a>

        {/* YouTube */}
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
  );
}
