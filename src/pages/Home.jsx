import React from 'react';
import Header from '../components/Header/Header';
import '../components/home/Home.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-main">
        <h2 className="home-title">Benvenuto nel mondo di NomeDelTuoTCG!</h2>
        <p className="home-subtitle">
          Scopri il gioco di carte più avvincente e strategico. Sfida i tuoi amici, costruisci il tuo mazzo e diventa il campione!
        </p>

        <div className="home-button-container">
          <a href="/deck-builder" className="home-button">Card List</a>
          <a href="/account" className="home-button">Area Personale</a>
        </div>
      </main>
    </>
  );
}
