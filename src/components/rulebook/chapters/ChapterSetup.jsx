leimport React from 'react';
import styles from '../Rulebook.module.css';

const ChapterSetup = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Setup' : 'Setup'}</h2>
      {language === 'ita' ? (
        <>
          <p>
            Per giocare a Wu Xing, tutto ciò di cui hai bisogno è <strong>un mazzo di carte</strong> interamente scelto da te e <strong>qualche segnalino</strong> per tenere traccia del tuo Qi.
          </p>
          <p>
            Puoi costruire liberamente il tuo mazzo usando qualsiasi carta tu voglia, sia dal <strong>Mazzo Alpha</strong> che da <strong>future espansioni</strong>, per strategie ancora più avanzate!
          </p>

          <div className={styles.dotDivider}>•</div>

          <p>Per iniziare una partita a Wu Xing, avrai bisogno di:</p>
          <ul>
            <li><strong>Deck</strong>: Deve contenere almeno <strong>30 carte</strong>, fino a un massimo di <strong>40</strong>.</li>
            <li><strong>Dadi</strong>: Ogni giocatore deve avere 5 dadi Qi.</li>
          </ul>
          <p>Per un'esperienza più immersiva, puoi anche usare:</p>
          <ul>
            <li><strong>Playmat</strong>: Per organizzare meglio il campo di gioco.</li>
            <li><strong>Dado PM (d12)</strong>: Utile per tenere traccia dei tuoi Punti Marma.</li>
          </ul>
          <p>
            Una volta che entrambi i giocatori hanno completato il setup, la partita può cominciare! Ogni giocatore inizia con <strong>12 Punti Marma (PM)</strong>, che rappresentano la loro vita.
          </p>
          <p>
            Se i PM arrivano a zero, il giocatore perde. Dopo aver mescolato il proprio mazzo, ogni giocatore <strong>pesca 4 carte</strong>.
          </p>
          <p>Ora sei pronto a giocare!</p>
        </>
      ) : (
        <>
          <p>
            To play Wu Xing, <strong>all you need is a deck of cards</strong> entirely chosen by YOU and <strong>a few tokens</strong> to keep track of your Qi.
          </p>
          <p>
            You can freely build your deck using any cards you want, whether from <strong>Alpha Set or future Expansions</strong>, for even more advanced strategies!
          </p>

          <div className={styles.dotDivider}>•</div>

          <p>To start a Wu Xing match, you will need:</p>
          <ul>
            <li><strong>Deck</strong>: Must contain at least <strong>30 cards</strong>, up to a maximum of <strong>40</strong>.</li>
            <li><strong>Dice</strong>: Each player must have 5 Qi dice.</li>
          </ul>
          <p>For a more immersive experience, you can also use:</p>
          <ul>
            <li><strong>Playmat</strong>: To better organize the playing field.</li>
            <li><strong>MP Die (d12)</strong>: Useful for tracking your Marma Points.</li>
          </ul>
          <p>
            Once both players have completed their setup, the match can begin! Each player starts with <strong>12 Marma Points (MP)</strong>, representing their life.
          </p>
          <p>
            If MP reaches zero, the player loses. After shuffling their deck, each player <strong>draws 4 cards</strong>.
          </p>
          <p>Now you're ready to play!</p>
        </>
      )}
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterSetup;
