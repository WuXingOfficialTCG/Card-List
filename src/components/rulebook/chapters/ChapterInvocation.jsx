import React from 'react';

const ChapterInvocation = ({ language }) => {
  return (
    <div id="chapter-9" className="chapter">
      <h2>{language === 'ita' ? 'Invocazione' : 'Invocation'}</h2>

      <p>
        {language === 'ita'
          ? `Per schierare un’Entità sul campo, devi prima invocarla. Invocare è semplice: per invocare un’Entità devi sacrificare 1 Qi del suo Elemento corrispondente. 
          Ad esempio: per invocare un’Entità di Terra, devi sacrificare 1 Qi di Terra.`
          : `To deploy an Entity onto the field, you must first invoke it. Invocation is simple: to invoke an Entity, you must sacrifice 1 Qi of its corresponding Element.
          For example: to invoke an Earth Element Entity, you must sacrifice 1 Earth Qi.`}
      </p>

      <p>
        {language === 'ita'
          ? `Puoi evocare Entità in due posizioni: attacco o difesa, ma sempre a faccia scoperta. La posizione delle Entità può essere cambiata una volta per turno, durante la Main Phase o la Recovery Phase.`
          : `You can summon entities in two positions: attack or defense, but always face-up. Entity positions can be changed once per turn, during the Main Phase or the Recovery Phase.`}
      </p>

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    alignItems: 'flex-start',
    marginTop: '2rem', // spazio sopra le immagini
    marginBottom: '2rem',
  }}
>
  {/* Colonna sinistra */}
  <div style={{ textAlign: 'center' }}>
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={
          language === 'ita'
            ? '/rulebookdata/ITA - 01 - Tritone Abissale.png'
            : '/rulebookdata/01 - Abyssal Merman (1).png'
        }
        alt="Entity Defense"
        style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
      />
    </div>
    <div style={{ fontWeight: 'bold', marginTop: '1rem' /* spazio aumentato */ }}>
      {language === 'ita' ? 'ATTACCO' : 'ATTACK'}
    </div>
  </div>

  {/* Colonna destra */}
  <div style={{ textAlign: 'center' }}>
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={
          language === 'ita'
            ? '/rulebookdata/ITA - 01 - Tritone Abissale_orizzontale.png'
            : '/rulebookdata/01 - Abyssal Merman (1)_orizzontale.png'
        }
        alt="Entity Attack"
        style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
      />
    </div>
    <div style={{ fontWeight: 'bold', marginTop: '1rem' /* spazio aumentato */ }}>
      {language === 'ita' ? 'DIFESA' : 'DEFENSE'}
    </div>
  </div>
</div>




      <p>
        {language === 'ita'
          ? `La caratteristica unica di un’Entità è la possibilità di essere impilata: un’Entità di rango superiore può essere posizionata sopra una di rango inferiore. 
          L’Entità in cima può guadagnare effetti da quelle sottostanti e ne determina la posizione. Ad esempio, se l’Entità in cima è in Posizione di Attacco, anche quelle sotto saranno considerate in Attacco.`
          : `An Entity’s unique trait is its ability to be stacked: a higher-rank Entity can be stacked on top of 1 lower-rank Entity. 
          The Entity at the top can gain effects from those beneath it and also determines the position of the entire stack. For example, if the top Entity is in Attack Position, all Entities beneath it will share the same position.`}
      </p>

      <p>
        {language === 'ita'
          ? `Tuttavia, ci sono delle regole da seguire.`
          : `However, there are some rules to follow.`}
      </p>

      <p>
        <strong>{language === 'ita' ? 'Rango delle Entità:' : 'Entity Rank:'}</strong><br />
        {language === 'ita'
          ? `- Le Entità di Rango 1 possono essere invocate direttamente sul campo.` : `- Rank 1 Entities can be invoked directly onto the field.`}
        <br />
        {language === 'ita'
          ? `- Le Entità di Rango superiore (Rango 2 e 3) devono essere posizionate sopra un’Entità di Rango inferiore.` : `- Higher Rank Entities (Rank 2 and 3) must be placed on top of a lower Rank Entity.`}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;– Rank 1 → Rank 2 → Rank 3
      </p>

      <p>
        <strong>{language === 'ita' ? 'Posizione delle Entità:' : 'Entity Position:'}</strong><br />
        {language === 'ita'
          ? `- Puoi invocare Entità solo dalla tua mano. Le Entità nel mazzo o nel Diyu non possono essere invocate, a meno che non sia specificato da effetti di altre carte.` 
          : `- You can only invoke Entities from your hand. Entities in the deck or in Diyu cannot be invoked unless through the effects of other cards.`}
      </p>

      <p>
        {language === 'ita'
          ? `Esiste anche un altro tipo di invocazione chiamata Invocazione Rapida.`
          : `There is also another type of invocation known as Quick Invocation.`}
      </p>

      <p>
        {language === 'ita'
          ? `Questa ti permette di invocare un’Entità dalla mano anche in fasi in cui normalmente non potresti (come durante la Battle Phase o il turno dell’avversario).`
          : `This allows you to Invoke an Entity from your hand during phases when you normally wouldn't be able to (such as the battle phase or your opponent's turn).`}
        <br />
        {language === 'ita'
          ? `Tuttavia, devi pagare un costo aggiuntivo:` : `However, you must pay an extra cost:`}
        <br />
        {language === 'ita'
          ? `- Devi sacrificare 1 Qi del suo Elemento + 1 Qi dell’Elemento dell’Entità su cui vuoi impilarla.` 
          : `- You must sacrifice 1 Qi of its own element + 1 Qi of the element of the Entity you want to stack it on.`}
        <br />
        {language === 'ita'
          ? `- Se vuoi impilarla su un’Entità già impilata, devi sacrificare 1 Qi del suo Elemento + 1 Qi per ciascuna Entità sottostante.` 
          : `- If you want to stack your Entity on an already stacked Entity, you must sacrifice 1 Qi of its own element + 1 Qi of the element of each underlying Entity.`}
      </p>

      <p>
        {language === 'ita'
          ? `Inoltre ci sono alcune limitazioni: se la carta su cui vuoi invocare è bersaglio di un effetto, non puoi farlo. 
          Ricorda: se un’Entità impilata viene distrutta, anche tutte quelle sotto vengono mandate nel Diyu.` 
          : `Furthermore there are a couple of limitations: if the card you’re going to invoke your entity on top is target by an effect, you cannot do it. 
          Remember: if a stacked Entity is destroyed, all underlying Entities are also sent to Diyu.`}
      </p>
    </div>
  );
};

export default ChapterInvocation;
