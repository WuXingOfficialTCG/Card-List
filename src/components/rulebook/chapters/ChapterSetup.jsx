import React from 'react';

const ChapterSetup = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Setup' : 'Setup'}</h2>
      {language === 'ita' ? (
        <>
          <p>Per iniziare una partita a Wu Xing, avrai bisogno di:</p>
          <ul>
            <li>Deck: Deve contenere almeno 30 carte, fino a un massimo di 40.</li>
            <li>Dadi: Ogni giocatore deve avere 5 dadi Qi.</li>
          </ul>
          <p>Per un'esperienza più immersiva, puoi anche usare:</p>
          <ul>
            <li>Playmat: Per organizzare meglio il campo di gioco.</li>
            <li>Dado PM: Utile per tenere traccia dei tuoi Punti Marma.</li>
          </ul>
          <p>
            Una volta che entrambi i giocatori hanno completato il setup, la partita può cominciare! Ogni giocatore inizia con 12 Punti Marma (PM), che rappresentano la loro vita.
          </p>
          <p>
            Se i PM arrivano a zero, il giocatore perde. Dopo aver mescolato il proprio mazzo, ogni giocatore pesca 4 carte.
          </p>
          <p>Ora sei pronto a giocare!</p>
        </>
      ) : (
        <>
          <p>To start a Wu Xing match, you will need:</p>
          <ul>
            <li>Deck: Must contain at least 30 cards, up to a maximum of 40.</li>
            <li>Dice: Each player must have 5 Qi dice.</li>
          </ul>
          <p>For a more immersive experience, you can also use:</p>
          <ul>
            <li>Playmat: To better organize the playing field.</li>
            <li>PM Die: Useful for tracking your Marma Points.</li>
          </ul>
          <p>
            Once both players have completed their setup, the match can begin! Each player starts with 12 Marma Points (MP), representing their life.
          </p>
          <p>
            If MP reaches zero, the player loses. After shuffling their deck, each player draws 4 cards.
          </p>
          <p>Now you're ready to play!</p>
        </>
      )}
    </div>
  );
};

export default ChapterSetup;
