import React from 'react';

const ChapterCombat = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Combattimento' : 'Combat'}</h2>
      
      <p>
        {language === 'ita'
          ? `Le tue Entità possono essere posizionate in due modalità sul campo: Attacco o Difesa. La posizione in cui si trovano influisce direttamente sull’esito della battaglia.`
          : `Your Entities can be positioned in two modes on the field: Attack or Defense. The position they are in directly affects the outcome of the battle.`}
      </p>

      <h3>{language === 'ita' ? 'POSIZIONE D’ATTACCO' : 'ATTACK POSITION'}</h3>
      <p>
        {language === 'ita'
          ? `Se la tua Entità è in Posizione d’Attacco e viene attaccata, si applicano i seguenti effetti:`
          : `If your Entity is in Attack Position and is attacked, the following effects apply:`}
      </p>
      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          {language === 'ita'
            ? `La tua Entità ha ATK maggiore: Distrugge l’Entità avversaria (con ATK inferiore) e infligge danni pari alla differenza tra i due ATK.`
            : `Your Entity has higher ATK: It destroys the opponent's Entity (with lower ATK) and deals damage equal to the difference between their ATK values.`}
        </li>
        <li>
          {language === 'ita'
            ? `Entrambe le Entità hanno ATK uguali: Entrambe vengono distrutte, senza infliggere danni.`
            : `Both Entities have equal ATK: Both Entities are destroyed without dealing damage.`}
        </li>
      </ul>

      <h3>{language === 'ita' ? 'POSIZIONE DI DIFESA' : 'DEFENSE POSITION'}</h3>
      <p>
        {language === 'ita'
          ? `Se la tua Entità è in Posizione di Difesa e viene attaccata, valgono regole diverse:`
          : `If your Entity is in Defense Position and is attacked, different rules apply:`}
      </p>
      <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem', paddingLeft: 0 }}>
        <li>
          {language === 'ita'
            ? `L’ATK dell’attaccante è superiore alla RES della tua Entità: la tua Entità viene distrutta, ma non subisci danni.`
            : `Attacker's ATK is greater than your Entity’s RES, your Entity is destroyed, but you take no damage.`}
        </li>
        <li>
          {language === 'ita'
            ? `L’ATK dell’attaccante è pari o inferiore alla RES della tua Entità: la tua Entità perde RES pari all’ATK dell’attaccante e infliggi danni pari alla differenza tra RES e ATK.`
            : `Attacker's ATK is equal to or lower than your Entity’s RES, your Entity loses RES equal to the attacker’s ATK, and you deal damage to your opponent equal to the difference between the RES and ATK of the two Entities.`}
        </li>
      </ul>

      <h3>{language === 'ita' ? 'BLOCCO POTENTE' : 'HEAVY BLOCK'}</h3>
      <p>
        {language === 'ita'
          ? `Se il tuo avversario ti attacca direttamente, puoi attivare la meccanica del Blocco Potente. Per farlo, devi sacrificare 1 Qi dello stesso Elemento dell’Entità attaccante. Questo ti permette di annullare completamente l’attacco dell’avversario, proteggendo i tuoi Punti Vita e mantenendo il controllo della situazione.`
          : `If your opponent attacks you directly, you can activate the Heavy Block mechanic. To do this, you must sacrifice 1 Qi of the same Element as the attacking Entity. This allows you to completely negate the opponent's attack, protecting your life and maintaining control of the situation.`}
      </p>
    </div>
  );
};

export default ChapterCombat;
