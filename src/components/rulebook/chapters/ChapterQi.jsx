import React from 'react';

const ChapterQi = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Qi' : 'Qi'}</h2>
      <p>
        {language === 'ita'
          ? `Il Qi è l'energia ancestrale che alimenta le tue azioni nel gioco, permettendoti di evocare Entità e usare il Chakra.`
          : `Qi are the ancestral energy that fuels your actions in the game, allowing you to invoke Entities and use Chakra.`}
      </p>
      <p>
        {language === 'ita'
          ? `Ci sono cinque Elementi di Qi, ognuno con caratteristiche uniche:`
          : `There are five Qi Elements, each with unique characteristics:`}
      </p>
      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>{language === 'ita' ? 'Acqua' : 'Water'}</li>
        <li>{language === 'ita' ? 'Fuoco' : 'Fire'}</li>
        <li>{language === 'ita' ? 'Legno' : 'Wood'}</li>
        <li>{language === 'ita' ? 'Metallo' : 'Metal'}</li>
        <li>{language === 'ita' ? 'Terra' : 'Earth'}</li>
      </ul>
      <p>
        {language === 'ita'
          ? `Ad ogni turno, durante la Fase di Generazione, puoi generare 1 Qi di un elemento a tua scelta—un'energia essenziale per le tue strategie.`
          : `Each turn, during the Generation Phase, you can generate 1 Qi of an element of your choice—an essential energy for your strategies.`}
      </p>
      <p>
        {language === 'ita'
          ? `Una volta raggiunta la quantità massima di Qi (5), nei turni successivi invece di generarli, puoi trasmutarli.`
          : `Once you reach the maximum amount of Qi (5) the following turns instead of generating them, you can transmute them.`}
      </p>
      <p>
        {language === 'ita'
          ? `Entità e Chakra sono fatti di energia ancestrale, e ogni volta che una tua viene distrutta dall'avversario e mandata nel Diyu, ti spetta 1 Qi dell'elemento di quella carta.`
          : `Entities and Chakras are made of ancestral energy, and every time one of yours is destroyed by your opponent and sent to the Diyu, you are entitled to 1 Qi of the element of that card.`}
      </p>
      <p>
        {language === 'ita'
          ? `Inoltre, puoi smantellare le carte sul tuo campo per generare 1 Qi del rispettivo elemento.`
          : `Additionally, you can dismantle the cards on your field to generate 1 Qi of their respective element.`}
      </p>
      <p>
        {language === 'ita'
          ? `Lo smantellamento può essere anche rapido: in questo caso, puoi smantellare le tue carte durante qualsiasi fase di qualsiasi turno, e il risultato sarà lo stesso dello smantellamento normale, con l'unica eccezione che se l'entità è bersaglio di un effetto, non puoi farlo. Se attivato durante la Fase di Battaglia, l'avversario può scegliere di annullare l'attacco.`
          : `The dismantling can also be quick: in this case, you can dismantle your cards during any phase of any player's turn, and the result will be the same as a normal dismantling, with the only exception being: if the entity is targeted by an effect, you cannot do it. If activated during the Battle Phase, the opponent can choose to cancel the attack.`}
      </p>
      <p>
        {language === 'ita'
          ? `Entità impilate: se stai smantellando un'Entità impilata, ricevi 1 Qi solo per l'Entità più in alto nella pila, mentre le Entità sottostanti rimangono nelle Manifestazioni.`
          : `Stacked Entities: If you are dismantling a stacked Entity, you receive 1 Qi only for the topmost Entity in the stack, and the Entities below remain in the Manifestations.`}
      </p>
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterQi;
