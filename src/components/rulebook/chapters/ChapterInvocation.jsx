import React from 'react';
import styles from '../Rulebook.module.css';

const ChapterInvocation = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Invocazione' : 'Invocation'}</h2>

      <p>
        {language === 'ita'
          ? `Per schierare un’Entità dalla tua mano sul campo, devi prima invocarla. Invocare è semplice: per invocare un’Entità devi sacrificare ` +
            <strong>1 Qi del suo Elemento corrispondente</strong> + `.`
          : `To deploy an Entity from your hand onto the field, you must first invoke it. Invocation is simple: to ` +
            <strong>invoke an Entity, sacrifice 1 Qi of its Element</strong> + `.`}
      </p>

      <p>
        {language === 'ita' ? (
          <em>Ad esempio: per invocare un’Entità di Terra, devi sacrificare 1 Qi di Terra.</em>
        ) : (
          <em>Example: to invoke an Earth Element Entity, you must sacrifice 1 Earth Qi.</em>
        )}
      </p>

      <p>
        {language === 'ita'
          ? `Puoi evocare Entità in due posizioni: attacco o difesa, ma sempre ` +
            <strong>a faccia scoperta</strong> + `.`
          : `You can summon entities in two positions: attack or defense, but ` +
            <strong>always face-up</strong> + `.`}
      </p>

      <p>
        {language === 'ita'
          ? `La posizione delle Entità ` +
            <strong>può essere cambiata una volta per turno</strong> +
            `, durante o la Main Phase o la Recovery Phase.`
          : `Entity positions ` +
            <strong>can be changed once per turn</strong> +
            `, during either the Main Phase or the Recovery Phase.`}
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
          <div style={{ fontWeight: 'bold', marginTop: '4.25rem' }}>
            {language === 'ita' ? 'DIFESA' : 'DEFENSE'}
          </div>
        </div>
      </div>

      <p>
        {language === 'ita'
          ? `La caratteristica unica di un’Entità è la possibilità di essere ` +
            <strong>impilata</strong> +
            `: un’Entità di ` +
            <strong>rango superiore</strong> +
            ` può essere posizionata ` +
            <strong>sopra un’Entità di rango inferiore</strong> + `.`
          : `An Entity’s unique trait is its ability to be ` +
            <strong>stacked</strong> +
            `: a ` +
            <strong>higher-rank</strong> +
            ` Entity can be stacked ` +
            <strong>on top of 1 lower-rank</strong> +
            ` Entity.`}
      </p>

      <p>
        {language === 'ita'
          ? `L’Entità in cima ` +
            <strong>può guadagnare effetti</strong> +
            ` da quelle sottostanti e ne determina la posizione.`
          : `The Entity at the top ` +
            <strong>can gain effects</strong> +
            ` from those beneath it and also determines the position of the entire stack.`}
      </p>

      <p>
        {language === 'ita' ? (
          <em>Ad esempio, se l’Entità in cima è in Posizione di Attacco, anche quelle sotto saranno considerate in Attacco.</em>
        ) : (
          <em>For example, if the top Entity is in Attack Position, all Entities beneath it will share the same position.</em>
        )}
      </p>

      <p>
        {language === 'ita'
          ? `Tuttavia, ci sono ` +
            <strong>delle regole da seguire</strong> +
            `, basato sul rango dell'entità:`
          : `However, there are ` +
            <strong>some rules to follow</strong> +
            `, based on the Entity Rank:`}
      </p>

      <ul style={{ marginTop: 0 }}>
        <li>
          {language === 'ita'
            ? <><strong>Le Entità di Rango 1</strong> possono essere invocate direttamente sul campo.</>
            : <><strong>Rank 1</strong> Entities can be invoked directly onto the field.</>}
        </li>
        <li>
          {language === 'ita'
            ? <><strong>Le Entità di Rango superiore</strong> (Rango 2 e 3) devono essere posizionate sopra un’Entità di Rango inferiore.</>
            : <><strong>Higher Rank</strong> Entities (Rank 2 and 3) must be placed on top of a lower Rank Entity.</>}
        </li>
        <li style={{ listStyleType: '"◦ "', marginLeft: '1.2em' }}>
          Rank 3 → Rank 2 → Rank 1
        </li>
      </ul>

      <div className={styles.dotDivider}>•</div>

      <p>
        {language === 'ita'
          ? <><strong>Ricorda</strong>: se un'Entità sovrapposta viene distrutta, anche tutte le Entità sottostanti vengono inviate a Diyu. Questo non si applica agli effetti di “Ritorno” o “Ritiro”: in questi casi viene colpita solo l'Entità più in alto.</>
          : <><strong>Remember</strong>: if a stacked Entity is destroyed, all underlying Entities are also sent to Diyu. This doesn’t apply to “Return” or “Withdraw” effects: in those cases only the topmost Entity is affected.</>}
      </p>

      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterInvocation;
