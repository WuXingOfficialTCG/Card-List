import React from 'react';

const ChapterGlossary = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Glossario' : 'Glossary'}</h2>

      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          {language === 'ita'
            ? `Attacco Diretto: Un attacco che danneggia direttamente i Punti Marma (PM) dell’avversario.`
            : `Direct Attack: An attack that directly damages the opponent's Marma Points (MP).`}
        </li>
        <li>
          {language === 'ita'
            ? `Distruzione: Inviare una carta al Diyu come risultato di un effetto o di un attacco.`
            : `Destroy: Send a card to the Diyu as a result of an effect or an attack.`}
        </li>
        <li>
          {language === 'ita'
            ? `Pesca: Aggiungere una carta dalla cima del mazzo alla tua mano.`
            : `Draw: Add a card from the top of the deck to your hand.`}
        </li>
        <li>
          {language === 'ita'
            ? `Prendere una Carta dal Mazzo: Ogni volta che prendi una carta, devi mostrarla e poi rimescolare il mazzo.`
            : `Take a Card from the Deck: Whenever you take a card, you must reveal it and then shuffle the deck.`}
        </li>
        <li>
          {language === 'ita'
            ? `Rimettere Indietro: Posizionare una carta nuovamente nel mazzo senza rimescolarlo.`
            : `Put Back: Place a card back into the deck without shuffling it.`}
        </li>
        <li>
          {language === 'ita'
            ? `Ritirare: Prendere una carta dal campo e riportarla in mano.`
            : `Withdraw: Take a card from the field and return it to your hand.`}
        </li>
        <li>
          {language === 'ita'
            ? `Sacrificare: Usare il Qi richiesto per attivare un effetto.`
            : `Sacrificing: Using the required Qi to activate an effect.`}
        </li>
        <li>
          {language === 'ita'
            ? `Scartare: Inviare una o più carte dalla tua mano al Diyu.`
            : `Discarding: Sending one or more cards from your hand to Diyu.`}
        </li>
      </ul>
    </div>
  );
};

export default ChapterGlossary;
