export default function Header({ onSupportClick }) {
  return (
    <header className="header">
      {/* Zona sinistra */}
      <div className="header-left">
        <button className="support-btn" onClick={onSupportClick}>Support Us</button>
        <a
          href="https://www.paypal.com/donate/tuolink"
          target="_blank"
          rel="noopener noreferrer"
          className="paypal-link"
        >
          PayPal
        </a>
      </div>

      {/* Zona centrale */}
      <div className="header-center">
        <img src="https://i.imgur.com/TUO_LOGO.png" alt="Logo" className="logo-img" />
        <h1 className="logo-text">Wu Xing TCG</h1>
      </div>

      {/* Zona destra */}
      <nav className="header-right social-links">
        <a href="https://discord.gg/tuo-invito" target="_blank" rel="noopener noreferrer" title="Discord">
          <img src="https://i.imgur.com/discord-icon.png" alt="Discord" className="social-icon" />
        </a>
        <a href="https://instagram.com/tuoprofilo" target="_blank" rel="noopener noreferrer" title="Instagram">
          <img src="https://i.imgur.com/instagram-icon.png" alt="Instagram" className="social-icon" />
        </a>
        <a href="https://facebook.com/tuoprofilo" target="_blank" rel="noopener noreferrer" title="Facebook">
          <img src="https://i.imgur.com/facebook-icon.png" alt="Facebook" className="social-icon" />
        </a>
        <a href="https://youtube.com/tuoprofilo" target="_blank" rel="noopener noreferrer" title="YouTube">
          <img src="https://i.imgur.com/youtube-icon.png" alt="YouTube" className="social-icon" />
        </a>
      </nav>
    </header>
  );
}
