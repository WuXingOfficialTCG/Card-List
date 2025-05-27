import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import '../components/home/home.css';

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
          <Link to="/deck-builder" className="home-button">Card List</Link>
          <Link to="/account" className="home-button">Area Personale</Link>
        </div>
      </main>
    </>
  );
}
