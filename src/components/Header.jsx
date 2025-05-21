import "./../styles/header.css";
import logo from "../assets/logo.png"; // Inserisci il tuo logo

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-left">
        <button className="donate-button">Dona</button>
        <img src={logo} alt="Logo" className="site-logo" />
      </div>

      <h1 className="site-name">Nome del Sito</h1>

      <div className="header-right">
        <a href="#" className="social-icon" aria-label="Discord">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg" alt="Discord" />
        </a>
        <a href="#" className="social-icon" aria-label="Instagram">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" />
        </a>
        <a href="#" className="social-icon" aria-label="Facebook">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" alt="Facebook" />
        </a>
        <a href="#" className="social-icon" aria-label="YouTube">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg" alt="YouTube" />
        </a>
      </div>
    </header>
  );
};

export default Header;
