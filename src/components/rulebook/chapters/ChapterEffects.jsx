import React from 'react';

const ChapterEffects = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Effetti' : 'Effects'}</h2>

      <p>
        {language === 'ita'
          ? 'Puoi attivare un solo effetto per ogni carta per turno. Questo significa che non puoi attivare lo stesso effetto su 2 copie della stessa carta nello stesso turno.'
          : 'You may activate one effect per one card per turn. That means that you cannot activate the same effect on 2 same cards in the same turn.'}
      </p>

      <p>
        {language === 'ita'
          ? 'Gli effetti sono gratuiti da attivare e ciascuno ha una parola chiave specifica per il suo tipo:'
          : 'Effects are free to activate and they all have a keyword specific for their type:'}
      </p>

      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          <strong>Skill:</strong>{' '}
          {language === 'ita'
            ? 'effetto attivo che può essere attivato solo durante il tuo turno.'
            : 'active type of effects that can be activated only during your turn.'}
        </li>
        <li>
          <strong>Transmutation:</strong>{' '}
          {language === 'ita'
            ? 'effetto attivo che ruota intorno alla trasmutazione di un elemento in un altro e talvolta include effetti secondari. Attivabile solo durante il tuo turno.'
            : 'active type of effects that revolve around transmuting an element to another and, sometimes, with secondary effects. Activable only during your turn.'}
        </li>
        <li>
          <strong>Disruption:</strong>{' '}
          {language === 'ita'
            ? 'effetto rapido che può essere attivato in risposta a un’altra azione, in qualsiasi momento, e se è un Chakra, direttamente dalla tua mano.'
            : 'rapid effect that can be activated in response to another action, whenever you want and, if it’s a Chakra, directly from your hand.'}
        </li>
        <li>
          <strong>Shell:</strong>{' '}
          {language === 'ita'
            ? 'effetto passivo che protegge l’entità da altri effetti e può avere effetti secondari.'
            : 'passive type of effects that protects the entity against other effects and may have some secondary effects.'}
        </li>
        <li>
          <strong>Haste:</strong>{' '}
          {language === 'ita'
            ? 'effetto passivo che consente all’entità di attaccare tutte le entità avversarie durante la fase di battaglia, talvolta con effetti secondari.'
            : 'passive type of effects that grant the entity the ability to attack all of your opponents entities during your battle phase, sometimes with secondary effects.'}
        </li>
        <li>
          <strong>Unseal:</strong>{' '}
          {language === 'ita'
            ? 'effetto passivo utilizzabile solo quando il Chakra si trova nel Diyu. Una volta usato, il Chakra torna direttamente nel mazzo.'
            : 'passive type of effects that is usable only when the Chakra is in the Diyu. Once you use it, the Chakra goes straight into the deck.'}
        </li>
        <li>
          <strong>Entrance:</strong>{' '}
          {language === 'ita'
            ? 'effetto passivo che si attiva quando una carta entra nel Dominio.'
            : 'passive type of effects that triggers when a card enters the Domain.'}
        </li>
        <li>
          <strong>Lineage:</strong>{' '}
          {language === 'ita'
            ? 'effetto speciale che viene ereditato dalle entità impilate sull’entità che lo possiede. Una volta ereditato, agisce come uno "Skill".'
            : 'special type of effects that it’s inherited to the entities stacked on the entity that carries it. Once it’s inherited, it acts as a “Skill”.'}
        </li>
      </ul>

      <p>
        {language === 'ita'
          ? 'I Chakra funzionano in modo simile alle Entità ma hanno una caratteristica unica: possono essere posizionati coperti in zone specifiche, il che influisce su quando possono essere attivati:'
          : 'Chakras function similarly to Entities but have a unique feature: they can be placed face-down in specific zones, which affects when they can be activated:'}
      </p>

      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          {language === 'ita'
            ? 'Durante il tuo turno: se il Chakra è nella tua mano o è stato sul campo per almeno due turni.'
            : 'During your turn: If the Chakra is in your hand or has been on the field for at least two turns.'}
        </li>
        <li>
          {language === 'ita'
            ? 'Durante il turno dell’avversario: se il Chakra è già sul campo.'
            : 'During the opponent’s turn: If the Chakra is already on the field.'}
        </li>
      </ul>

      <p>
        {language === 'ita'
          ? 'Inoltre, i Chakra posizionati possono essere attivati in qualsiasi fase del turno di entrambi i giocatori. Eccezione: i Chakra con l’effetto Interruption possono essere attivati direttamente dalla tua mano, anche durante il turno dell’avversario!'
          : 'Additionally, placed Chakras can be activated during any phase of either player\'s turn. Exception: Chakras with the Interruption effect can be activated directly from your hand, even during the opponent’s turn!'}
      </p>

      <p>
        {language === 'ita'
          ? 'Ricorda: se tutti gli slot Nexus sono occupati, non puoi attivare altri Chakra!'
          : 'Additionally, remember: if all Nexus slots are occupied, you cannot activate any more Chakras!'}
      </p>

      <p>
        {language === 'ita'
          ? 'Gli effetti possono essere attivati solo durante la Main Phase o la Recovery Phase, con l’eccezione degli effetti Interruption, che come detto possono essere attivati anche nel turno dell’avversario.'
          : 'Effects can only be activated during the Main Phase or the Recovery Phase, with the exception of Interruptions, which, as mentioned earlier, can be activated even during the opponent\'s turn.'}
      </p>

      <p>
        {language === 'ita'
          ? 'Se un effetto di un Chakra posizionato viene attivato durante la Battle Phase, l’avversario deve terminare l’attacco in corso.'
          : 'If an effect of a placed Chakra is activated during the Battle Phase, the opponent must finish their attack if they were in the process of attacking.'}
      </p>

      <p>
        {language === 'ita'
          ? 'Nel caso di un effetto Interruption: se la carta è posizionata, si applica la regola precedente; se invece è in mano, l’avversario può scegliere di annullare l’attacco.'
          : 'In the case of an Interrupt: if the card is placed, the situation described above applies; however, if the card is in the hand, the opponent can choose to cancel the attack.'}
      </p>
    </div>
  );
};

export default ChapterEffects;
