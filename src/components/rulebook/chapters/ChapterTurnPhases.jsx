import React from 'react';
import styles from '../Rulebook.module.css';

const ChapterTurnPhases = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Fasi del turno' : 'Turn Phases'}</h2>
      <p>
        {language === 'ita' ? (
          <>
            Ogni turno in Wu Xing è suddiviso in <strong>sei fasi</strong>, ognuna con un ruolo cruciale nel ritmo della partita. Ecco come si sviluppa:

            <div className={styles.dotDivider}>•</div>
            
            <strong>FASE INIZIALE</strong><br />
            È la prima fase del turno ed è divisa in 3 step:
            <br />
            • <strong>Step di Risonanza</strong>: ◦ tutti gli effetti attivati nel turno precedente si risolvono qui. <br />
            • <strong>Step di Pesca</strong>: ◦ inizia il turno pescando una carta dalla cima del tuo mazzo. <br />
            • <strong>Step di Generazione</strong>: ◦ puoi generare 1 Qi di un elemento a tua scelta, essenziale per usare le tue carte.
            
            <div className={styles.dotDivider}>•</div>
            
            <strong>FASE PRINCIPALE</strong><br />
            È la fase più importante del turno, dove puoi impostare la tua strategia. È divisa in 2 step:
            <br />
            • <strong>Step di Intento</strong>: ◦ in questo step tu o l’avversario potete attivare effetti prima di entrare nella fase principale. Qui non puoi attivare effetti attivi, eccetto Chakra posizionati e Disruption. <br />
            • <strong>Step Principale</strong>: ◦ è lo step in cui puoi:<br />
            ◦ InvoCare Entità. <br />
            ◦ Posizionare Chakra e Domini. <br />
            ◦ Attivare vari effetti. <br />
            ◦ Decostruire carte. <br />
            Dopo questa fase, puoi scegliere se passare alla Fase di Battaglia, alla Fase di Recupero o terminare il turno.

            <br />
            <strong>Ricorda</strong>: lo step principale è uno dei due momenti in cui puoi attivare effetti attivi.
            
            <div className={styles.dotDivider}>•</div>
            
            <strong>FASE DI BATTAGLIA</strong><br />
            Se vuoi attaccare le Entità avversarie, entri nella Fase di Battaglia, che è divisa in 3 step:
            <br />
            • <strong>Step di Scelta</strong>: ◦ seleziona una delle tue Entità attive come attaccante e scegli quale Entità avversaria attaccare. <br />
            • <strong>Step di Attacco</strong>: ◦ l’attacco ha luogo: attaccante e bersaglio si scontrano e subiscono i danni corrispondenti. <br />
            • <strong>Fine della battaglia</strong>: ◦ l’Entità attaccante esaurisce la sua forza e non può più attaccare in questo turno. <br />
            Se hai altre Entità ancora in grado di attaccare, puoi dichiarare altri attacchi.

            <div className={styles.dotDivider}>•</div>
            
            <strong>FASE DI RECUPERO</strong><br />
            Questa fase ti permette di effettuare ultime mosse strategiche prima di concludere il turno. Puoi:
            <br />
            • InvoCare Entità se hai abbastanza Qi. <br />
            • Posizionare Chakra o Domini. <br />
            • Attivare vari effetti. <br />
            • Preparare il campo per il turno successivo. <br />
            Gli effetti attivati durante questa fase si risolvono prima di passare alla fase finale.

            <div className={styles.dotDivider}>•</div>
            
            <strong>FASE FINALE</strong><br />
            Questa fase segna la fine del turno. Tutti gli effetti attivi “fino alla fine del turno” si esauriscono, e il turno passa all’avversario. <br />
            Inoltre, se hai più di 5 carte in mano, devi scartare quelle in eccesso.

            <div className={styles.dotDivider}>•</div>
            
            Il primo giocatore della partita affronta un turno leggermente diverso:
            <br />
            • Non può pescare nella fase di pesca. <br />
            • Non può dichiarare attacchi nella fase di battaglia. <br />
            Questa regola garantisce equilibrio tra i giocatori e impedisce vantaggi eccessivi a chi inizia per primo.
          </>
        ) : (
          <>
            Each turn in Wu Xing is divided into <strong>six phases</strong>, each playing a crucial role in the game's rhythm. Here's how it unfolds:

            <div className={styles.dotDivider}>•</div>
            
            <strong>INITIAL PHASE</strong><br />
            It’s the first phase in the turn and it’s divided in 3 steps:
            <br />
            • <strong>Resonance Step</strong>: ◦ all the effects activated in the previous turn resolve here. <br />
            • <strong>Drawing Step</strong>: ◦ start the turn by drawing a card from the top of your deck. <br />
            • <strong>Generation Step</strong>: ◦ you can generate 1 Qi of an element of your choice, essential for using your cards.

            <div className={styles.dotDivider}>•</div>
            
            <strong>MAIN PHASE</strong><br />
            It’s the most important phase in the turn, where you can set up your strategy and it's divided in 2 steps:
            <br />
            • <strong>Intent Step</strong>: ◦ in this step you or your opponent can activate effects before entering the main step. Here you may not activate active effects, except for positioned Chakra and Disruption. <br />
            • <strong>Main Step</strong>: ◦ is the step in which you can:<br />
            ◦ Invoke Entities. <br />
            ◦ Place Chakra and Domains. <br />
            ◦ Activate various effects. <br />
            ◦ Deconstruct cards. <br />
            After this phase, you can choose to move to the Battle Phase, the Recovery Phase, or end the turn.

            <br />
            <strong>Remember</strong>: the main step is one of the two moments in which you can activate active effects.

            <div className={styles.dotDivider}>•</div>
            
            <strong>BATTLE PHASE</strong><br />
            If you want to attack the opponent's Entities, you enter the Battle Phase, which is divided into 3 steps:
            <br />
            • <strong>Choice Step</strong>: ◦ select one of your active Entities as the attacker and choose which opposing Entity to attack. <br />
            • <strong>Attack Step</strong>: ◦ the attack takes place: the attacker and the target clash and take the corresponding damage. <br />
            • <strong>End of battle</strong>: ◦ the attacking Entity exhausts its strength and can no longer attack during this turn. <br />
            If you have other Entities still able to attack, you can declare additional attacks.

            <div className={styles.dotDivider}>•</div>
            
            <strong>RECOVERY PHASE</strong><br />
            This phase allows you to make final strategic moves before ending the turn. You can:
            <br />
            • Invoke Entities if you have enough Qi. <br />
            • Place Chakras or Domains. <br />
            • Activate various effects. <br />
            • Prepare the field for the next turn. <br />
            Effects activated during this phase are resolved before moving on to the Final Phase.

            <div className={styles.dotDivider}>•</div>
            
            <strong>ENDING PHASE</strong><br />
            This phase marks the end of the turn. Any effects active until the end of the turn are exhausted, and the turn passes to the opponent. <br />
            Furthermore, if you have more than 5 cards in your hand, you must discard the exceeding cards.

            <div className={styles.dotDivider}>•</div>
            
            The first player of the game faces a slightly different turn:
            <br />
            • They cannot draw in the Draw Phase. <br />
            • They cannot declare attacks in the Battle Phase. <br />
            This rule ensures balance between players and prevents excessive advantages for the player going first.
          </>
        )}
      </p>
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterTurnPhases;
