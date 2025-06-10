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
        style={{ display: 'block', maxWidth: '100%', margin: '1rem auto' }}
      />

      <p>
        {language === 'ita'
          ? 'Il campo da gioco è composto da diverse zone, ognuna pensata per ospitare componenti specifici:'
          : 'The game field is made up of different zones, each designed to hold specific components:'}
      </p>

      <ol>
        <li>
          {language === 'ita'
            ? 'Mazzo principale: l’area dove si trova il tuo mazzo.'
            : 'Main Deck: the area where you place your deck.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Diyu: la zona dove vengono mandate le carte scartate, distrutte o sacrificate.'
            : 'Diyu: the zone where your discarded, destroyed, or sacrificed cards are sent.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Nexus: l’area dove puoi collocare i Chakra.'
            : 'Nexus: the area where you can place Chakras.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Manifestazioni: la zona in cui evochi le tue entità.'
            : 'Manifestations: the zone where you invoke your entities.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Release: l’area dove i Domini vengono inizialmente messi in verticale e poi, una volta attivati, ruotati in orizzontale.'
            : 'Release: the area where domains are initially placed vertically, and once activated, moved to a horizontal position.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Serbatoio: l’area dove si collocano i Qi utilizzati o non generati.'
            : 'Reservoir: the area where you place used Qi or Qi that has not been generated.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Generati: la zona dove si mettono i Qi generati (direttamente dal Serbatoio).'
            : 'Generated: the zone where you place Qi that you choose to generate (directly from the Reservoir).'}
        </li>
        <li>
          {language === 'ita'
            ? 'Mazzo laterale: utilizzato nei tornei, contiene il tuo mazzo di riserva.'
            : 'Side Deck: used in tournaments, this is where you keep your reserve deck.'}
        </li>
      </ol>
    </div>
  );
};

export default ChapterPlayfield;
