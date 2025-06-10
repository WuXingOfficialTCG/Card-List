import React from 'react';

const ChapterInvocation = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Invocazione' : 'Invocation'}</h2>

      <p>
        {language === 'ita'
          ? `Per schierare un’Entità dalla tua mano sul campo, devi prima invocarla. Invocare è semplice: per invocare un’Entità devi sacrificare 1 Qi del suo Elemento corrispondente. 
          Ad esempio: per invocare un’Entità di Terra, devi sacrificare 1 Qi di Terra.`
          : `To deploy an Entity from your hand onto the field, you must first invoke it. Invocation is simple: to invoke an Entity, you must sacrifice 1 Qi of its corresponding Element.
          For example: to invoke an Earth Element Entity, you must sacrifice 1 Earth Qi.`}
      </p>

      <p>
        {language === 'ita'
          ? `Puoi evocare Entità in due posizioni: attacco o difesa, ma sempre a faccia scoperta. La posizione delle Entità può essere cambiata una volta per turno, durante o la Main Phase o la Recovery Phase.`
          : `You can summon entities in two positions: attack or defense, but always face-up. Entity positions can be changed once per turn, during either the Main Phase or the Recovery Phase.`}
      </p>

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    alignItems: 'flex-start',
    marginTop: '3rem',
    marginBottom: '2rem',
  }}
>
  {/* Colonna sinistra - carta verticale */}
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
      }}
    >
      <img
        src={
          language === 'ita'
            ? '/rulebookdata/ITA - 01 - Tritone Abissale.png'
            : '/rulebookdata/01 - Abyssal Merman (1).png'
        }
        alt="Entity Attack"
        style={{ height: '200px', width: 'auto' }}
      />
    </div>
    <div style={{ fontWeight: 'bold', marginTop: '2.5rem' }}>
      {language === 'ita' ? 'ATTACCO' : 'ATTACK'}
    </div>
  </div>

  {/* Colonna destra - carta orizzontale */}
  <div style={{ textAlign: 'center', paddingTop: '30px' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '200px',
      }}
    >
      <img
        src={
          language === 'ita'
            ? '/rulebookdata/ITA - 01 - Tritone Abissale_orizzontale.png'
            : '/rulebookdata/01 - Abyssal Merman (1)_orizzontale.png'
        }
        alt="Entity Defense"
        style={{ width: '200px', height: 'auto' }}
      />
    </div>
    {/* MATCH the marginTop to the left caption */}
    <div style={{ fontWeight: 'bold', marginTop: '4.25rem' }}>
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
          ? `Tuttavia, ci sono delle regole da seguire, basato sul rango dell'entità:`
          : `However, there are some rules to follow, based on the Entity Rank:`}
      </p>

<ul style={{ marginTop: 0 }}>
  <li>
    {language === 'ita'
      ? 'Le Entità di Rango 1 possono essere invocate direttamente sul campo.'
      : 'Rank 1 Entities can be invoked directly onto the field.'}
  </li>
  <li>
    {language === 'ita'
      ? 'Le Entità di Rango superiore (Rango 2 e 3) devono essere posizionate sopra un’Entità di Rango inferiore.'
      : 'Higher Rank Entities (Rank 2 and 3) must be placed on top of a lower Rank Entity.'}
  </li>
  <li style={{ listStyleType: '"◦ "', marginLeft: '1.2em' }}>
    Rank 3 → Rank 2 → Rank 1
  </li>
</ul>


      <p>
        {language === 'ita'
          ? `Ricorda: se un'Entità sovrapposta viene distrutta, anche tutte le Entità sottostanti vengono inviate a Diyu. Questo non si applica agli effetti di “Ritorno” o “Ritiro”: in questi casi viene colpita solo l'Entità più in alto.` 
          : `Remember: if a stacked Entity is destroyed, all underlying Entities are also sent to Diyu. This doesn’t apply to “Return” or “Withdraw” effects: in those cases only the topmost Entity is affected.
 `}
      </p>
    </div>
  );
};

export default ChapterInvocation;
