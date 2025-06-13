import React from 'react';
import styles from '../Rulebook.module.css';

const ChapterEffects = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? <strong>Effetti</strong> : <strong>Effects</strong>}</h2>

      <p>
        {language === 'ita'
          ? <>Puoi attivare <strong>un solo effetto per ogni carta per turno</strong>. Questo significa che non puoi attivare lo stesso effetto su 2 copie della stessa carta nello stesso turno.</>
          : <>You may activate <strong>one effect per one card per turn</strong>. That means that you cannot activate the same effect on 2 same cards in the same turn.</>}
      </p>

      <p>
        {language === 'ita'
          ? <>Gli effetti si dividono in attivi e passivi. Gli effetti attivi si possono usare solo durante le fasi principali. Gli effetti passivi non richiedono attivazione (come Haste e Shell) o si attivano automaticamente ogni volta che sono innescati (come Disruption, Entrance e Unseal).</>
          : <>Effects are divided into active or passive types. The active ones can be used only during the main steps while the passive ones, doesn't need to be activated (Haste and Shell) or they can be used in almost each moment as long as they're triggered (Disruption, Entrance and Unseal).</>}
      </p>

      <p>
        {language === 'ita'
          ? <>Gli effetti si attivano gratuitamente e ognuno ha una parola chiave specifica per il proprio tipo:</>
          : <>Effects are free to activate and they all have a keyword specific for their type: </>}
      </p>

      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          <strong>Skill:</strong>{' '}
          {language === 'ita'
            ? <><strong>effetto attivo</strong> che può essere attivato solo durante il tuo turno.</>
            : <><strong>active type of effects</strong> that can be activated only <strong>during your turn</strong>.</>}
        </li>
        <li>
          <strong>Transmutation:</strong>{' '}
          {language === 'ita'
            ? <>effetto attivo che ruota intorno alla trasmutazione di un elemento in un altro e talvolta include effetti secondari. <strong>Attivabile solo durante il tuo turno</strong>.</>
            : <>active type of effects that revolve around transmuting an element to another and, sometimes, with secondary effects. <strong>Activable only during your turn</strong>.</>}
        </li>
        <li>
          <strong>Disruption:</strong>{' '}
          {language === 'ita'
            ? <>effetto rapido che può essere attivato in risposta a un’altra azione, <strong>in qualsiasi momento</strong>, e se è un Chakra, direttamente dalla tua mano.</>
            : <>rapid effect that can be activated <strong>in response to another action</strong>, <strong>whenever you want</strong> and, if it’s a Chakra, directly from your hand.</>}
        </li>
        <li>
          <strong>Shell:</strong>{' '}
          {language === 'ita'
            ? <>effetto passivo che protegge l’entità da altri effetti e può avere effetti secondari.</>
            : <>passive type of effects that protects the entity against other effects and may have some secondary effects.</>}
        </li>
        <li>
          <strong>Haste:</strong>{' '}
          {language === 'ita'
            ? <>effetto passivo che consente all’entità di attaccare tutte le entità avversarie durante la fase di battaglia, talvolta con effetti secondari.</>
            : <>passive type of effects that grant the entity the ability to attack all of your opponents entities during your battle phase, sometimes with secondary effects.</>}
        </li>
        <li>
          <strong>Unseal:</strong>{' '}
          {language === 'ita'
            ? <>effetto passivo utilizzabile solo quando il Chakra si trova nel Diyu. Una volta usato, il Chakra torna direttamente nel mazzo.</>
            : <>passive type of effects that is usable only when the Chakra is in the Diyu. Once you use it, the Chakra goes straight into the deck.</>}
        </li>
        <li>
          <strong>Entrance:</strong>{' '}
          {language === 'ita'
            ? <>effetto passivo che si attiva quando una carta entra nel Dominio.</>
            : <>passive type of effects that triggers when a card enters the Domain.</>}
        </li>
        <li>
          <strong>Lineage:</strong>{' '}
          {language === 'ita'
            ? <>effetto speciale che viene ereditato dalle entità impilate sull’entità che lo possiede. Una volta ereditato, agisce come uno <strong>"Skill"</strong>.</>
            : <>special type of effects that it’s inherited to the entities stacked on the entity that carries it. Once it’s inherited, it acts as a <strong>“Skill”</strong>.</>}
        </li>
      </ul>

      <div className={styles.dotDivider}>•</div>

      <p>
        {language === 'ita'
          ? <>I <strong>Chakra</strong> funzionano in modo simile alle Entità ma hanno una caratteristica unica: possono essere <strong>posizionati coperti</strong> in zone specifiche, il che influisce su quando possono essere attivati:</>
          : <>Chakras function similarly to Entities but have a unique feature: they can be <strong>placed face-down</strong> in specific zones, which affects when they can be activated:</>}
      </p>

      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          {language === 'ita'
            ? <><strong>Durante il tuo turno</strong>: se il Chakra è nella tua mano o è stato sul campo per almeno due turni.</>
            : <><strong>During your turn</strong>: If the Chakra is in your hand or has been on the field for at least two turns.</>}
        </li>
        <li>
          {language === 'ita'
            ? <><strong>Durante il turno dell’avversario</strong>: se il Chakra è già sul campo.</>
            : <><strong>During the opponent’s turn</strong>: If the Chakra is already on the field.</>}
        </li>
      </ul>

      <p>
        {language === 'ita'
          ? <>Inoltre, i Chakra posizionati possono essere <strong>attivati in qualsiasi fase</strong> del turno di entrambi i giocatori.</>
          : <>Additionally, placed Chakras can be <strong>activated during any phase</strong> of either player's turn.</>}
      </p>

      <p>
        {language === 'ita'
          ? <>Eccezione: i Chakra con l’effetto <strong>Interruption</strong> possono essere attivati direttamente dalla tua mano, anche durante il turno dell’avversario!</>
          : <>Exception: Chakras with the <strong>Interruption</strong> effect can be activated directly from your hand, even during the opponent’s turn!</>}
      </p>

      <p>
        {language === 'ita'
          ? <>Ricorda: se tutti gli slot Nexus sono occupati, non puoi attivare altri <strong>Chakra</strong>!</>
          : <>Remember: if all Nexus slots are occupied, you cannot activate any more <strong>Chakras</strong>!</>}
      </p>

      <div className={styles.dotDivider}>•</div>

      <p>
        {language === 'ita'
          ? <>Gli effetti possono essere attivati solo <strong>durante la Main Phase o la Recovery Phase</strong>, con l’eccezione degli effetti <strong>Disruption</strong>, che come detto possono essere attivati anche nel turno dell’avversario.</>
          : <>Effects can only be activated <strong>during the Main Phase or the Recovery Phase</strong>, with the exception of <strong>Disruption</strong>, which, as mentioned earlier, can be activated even during the opponent's turn.</>}
      </p>

      <p>
        {language === 'ita'
          ? <>Se un effetto di un <strong>Chakra</strong> posizionato viene attivato durante la Battle Phase, l’avversario deve terminare l’attacco in corso, con il nuovo effetto applicato.</>
          : <>If an effect of a placed <strong>Chakra</strong> is activated during the Battle Phase, the opponent must finish their attack if they were in the process of attacking, with the new effect applied.</>}
      </p>

      <div className={styles.dotDivider}>•</div>

      <p>
        {language === 'ita'
          ? <>Nel caso di un effetto <strong>Disruption</strong>: se la carta è posizionata, si applica la regola precedente; se invece è in mano, l’avversario può scegliere di annullare l’attacco.</>
          : <>In the case of a <strong>Disruption</strong>: if the card is placed, the situation described above applies; however, if the card is in the hand, the opponent can choose to cancel the attack.</>}
      </p>

      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterEffects;
