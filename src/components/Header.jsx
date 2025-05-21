import './Header.css';

export default function Header({ onSupportClick }) {
  return (
    <header className="header">
      
      {/* Sezione Sinistra: Supporto e Donazione */}
      <div className="header-left">
        <button className="support-btn" onClick={onSupportClick}>
          Support Us
        </button>
        <a
          href="https://www.paypal.com/donate/tuolink"
          target="_blank"
          rel="noopener noreferrer"
          className="paypal-link"
        >
          PayPal
        </a>
      </div>

      {/* Sezione Centrale: Logo */}
      <div className="header-center">
        <img
          src="https://i.imgur.com/TUO_LOGO.png"
          alt="Wu Xing Logo"
          className="logo-img"
        />
        <h1 className="logo-text">Wu Xing TCG</h1>
      </div>

      {/* Sezione Destra: Social Links */}
      <nav className="header-right">
        {[
          {
            href: "https://discord.gg/tuo-invito",
            src: "https://i.imgur.com/discord-icon.png",
            alt: "Discord",
            title: "Discord",
          },
          {
            href: "https://instagram.com/tuoprofilo",
            src: "https://i.imgur.com/instagram-icon.png",
            alt: "Instagram",
            title: "Instagram",
          },
          {
            href: "https://facebook.com/tuoprofilo",
            src: "https://i.imgur.com/facebook-icon.png",
            alt: "Facebook",
            title: "Facebook",
          },
          {
            href: "https://youtube.com/tuoprofilo",
            src: "https://i.imgur.com/youtube-icon.png",
            alt: "YouTube",
            title: "YouTube",
          },
        ].map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
          >
            <img src={link.src} alt={link.alt} className="social-icon" />
          </a>
        ))}
      </nav>
      
    </header>
  );
}
