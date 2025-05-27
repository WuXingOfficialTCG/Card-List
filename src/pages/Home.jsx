import React from 'react';
import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import '../components/home/home.css';

export default function Home() {
  return (
    <>
      <Header />
      <NavigationBar />
      <main className="home-main">
        <h2 className="home-title">Benvenuto nel mondo di NomeDelTuoTCG!</h2>
        <p className="home-subtitle">
          Scopri il gioco di carte più avvincente e strategico. Sfida i tuoi amici, costruisci il tuo mazzo e diventa il campione!
        </p>
      </main>
    </>
  );
}
