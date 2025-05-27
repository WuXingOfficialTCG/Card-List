import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <main className="home-main">
      <h2 className="home-title">Benvenuto nel mondo di NomeDelTuoTCG!</h2>
      <p className="home-subtitle">
        Scopri il gioco di carte più avvincente e strategico. Sfida i tuoi amici, costruisci il tuo mazzo e diventa il campione!
      </p>

      <div className="home-button-container">
        <a href="/cards" className="home-button">Card List</a>
        <a href="/profile" className="home-button">Area Personale</a>
        <a href="/shop" className="home-button">Negozio</a>
      </div>
    </main>
  );
}
