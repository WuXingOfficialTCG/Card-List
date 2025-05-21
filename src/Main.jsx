import React from 'react';

export default function Main() {
  return (
    <main>
      <section className="hero">
        <h1>Benvenuto sul sito!</h1>
        <p>Questo è il contenuto principale della pagina.</p>
        <button onClick={() => alert('Grazie per aver cliccato!')}>Scopri di più</button>
      </section>
    </main>
  );
}
