import React from 'react';

const ChapterPlayfield = ({ language }) => {
  const imgPath = '/rulebookdata/';
  const playmatImg = language === 'ita' ? 'Playmat_ITA.png' : 'Playmat.png';

  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Campo di gioco' : 'Playfield'}</h2>

      <img
        src={`${imgPath}${playmatImg}`}
        alt="playfield"
        style={{ display: 'block', maxWidth: '80%', margin: '1rem auto' }}
      />

      <p>
        {language === 'ita'
          ? 'Il campo da gioco è composto da diverse zone, ognuna pensata per ospitare componenti specifici:'
          : 'The game field is made up of different zones, each designed to hold specific components:'}
      </p>

      <ol style={{ lineHeight: 1.6 }}>
        <li>
          {language === 'ita'
            ? <> <strong>Main Deck</strong>: l’area dove si trova il tuo mazzo.</>
            : <> <strong>Main Deck</strong>: the area where you place your deck.</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Diyu</strong>: la zona dove vengono mandate le carte scartate, distrutte o sacrificate.</>
            : <> <strong>Diyu</strong>: the zone where your discarded, destroyed, or sacrificed cards are sent.</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Nexus</strong>: l’area dove puoi collocare i Chakra.</>
            : <> <strong>Nexus</strong>: the area where you can place Chakras.</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Manifestazioni</strong>: la zona in cui evochi le tue entità.</>
            : <> <strong>Manifestations</strong>: the zone where you invoke your entities.</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Release</strong>: l’area dove i Domini vengono inizialmente messi in verticale e poi, una volta attivati, ruotati in orizzontale.</>
            : <> <strong>Release</strong>: the area where domains are initially placed vertically, and once activated, moved to a horizontal position.</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Serbatoio</strong>: l’area dove si collocano i Qi utilizzati o non generati.</>
            : <> <strong>Reservoir</strong>: the area where you place used Qi or Qi that has not been generated.</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Generati</strong>: la zona dove si mettono i Qi generati (direttamente dal Serbatoio).</>
            : <> <strong>Generated</strong>: the zone where you place Qi that you choose to generate (directly from the Reservoir).</>}
        </li>
        <li>
          {language === 'ita'
            ? <> <strong>Mazzo laterale</strong>: utilizzato nei tornei, contiene il tuo mazzo di riserva.</>
            : <> <strong>Side Deck</strong>: used in tournaments, this is where you keep your reserve deck.</>}
        </li>
      </ol>
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterPlayfield;
