// src/components/Header.jsx
import { FaGithub, FaDiscord, FaHeart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <FaHeart className="inline-icon" /> Wu Xing TCG
      </h1>
      <nav className="social-links">
        <a href="https://github.com/tuo-repo" target="_blank" rel="noopener noreferrer" title="GitHub">
          <FaGithub />
        </a>
        <a href="https://discord.gg/tuo-invito" target="_blank" rel="noopener noreferrer" title="Discord">
          <FaDiscord />
        </a>
      </nav>
    </header>
  );
}
