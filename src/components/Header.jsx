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
        <h1 className="logo">
          <FaHeart className="inline-icon" /> Wu Xing TCG
        </h1>
      </div>

      {/* Zona destra */}
      <nav className="header-right social-links">
        <a
          href="https://discord.gg/tuo-invito"
          target="_blank"
          rel="noopener noreferrer"
          title="Discord"
        >
          <FaDiscord />
        </a>
        <a
          href="https://instagram.com/tuoprofilo"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com/tuoprofilo"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="https://youtube.com/tuoprofilo"
          target="_blank"
          rel="noopener noreferrer"
          title="YouTube"
        >
          <FaYoutube />
        </a>
      </nav>
    </header>
  );
}
