import React from 'react';

const ChapterInvocation = ({ language }) => {
  return (
    <div id="chapter-9" className="chapter">
      <h2>{language === 'ita' ? 'Invocazione' : 'Invocation'}</h2>
      {language === 'ita' ? (
        <>
          <p>
            Per schierare un’Entità sul campo, devi prima invocarla. L’invocazione è semplice: per invocare un’Entità, devi sacrificare 1 Qi del suo Elemento corrispondente.
            <br />
            Ad esempio: per invocare un’Entità di Terra, devi sacrificare 1 Qi di Terra.
          </p>

          <p>
            Puoi evocare le entità in due posizioni: attacco o difesa, ma sempre scoperte.
            <br />
            La posizione di un’Entità può essere cambiata una volta per turno, durante la Fase Principale o la Fase di Recupero.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/rulebookdata/ITA - 01 - Tritone Abissale.png"
              alt="Tritone Abissale Verticale"
              style={{ maxWidth: '45%' }}
            />
            <img
              src="/rulebookdata/ITA - 01 - Tritone Abissale_orizzontale.png"
              alt="Tritone Abissale Orizzontale"
              style={{ maxWidth: '45%' }}
            />
          </div>

          <p>
            La caratteristica unica di un’Entità è la possibilità di essere impilata: un’Entità di rango superiore può essere posta sopra un’Entità di rango inferiore.
            <br />
            L’Entità in cima determina la posizione dell’intera pila e può ricevere effetti da quelle sottostanti. Ad esempio, se l’Entità in cima è in Posizione di Attacco, tutte le Entità sottostanti condividono la stessa posizione.
          </p>

          <p>
            Tuttavia, ci sono alcune regole da rispettare.
          </p>

          <p>
            <strong>Rango delle Entità:</strong>
            <ul>
              <li>Le Entità di Rango 1 possono essere invocate direttamente sul campo.</li>
              <li>Le Entità di Rango superiore (Rango 2 e 3) devono essere poste sopra un’Entità di rango inferiore.
                <br />- Rango 1 → Rango 2 → Rango 3
              </li>
            </ul>
          </p>

          <p>
            <strong>Posizione delle Entità:</strong>
            <ul>
              <li>Puoi invocare Entità solo dalla tua mano. Le Entità nel mazzo o nel Diyu non possono essere invocate se non tramite effetti di altre carte.</li>
            </ul>
          </p>

          <p>
            Esiste anche un altro tipo di invocazione, nota come Invocazione Rapida.
          </p>

          <p>
            Questa ti permette di invocare un’Entità dalla mano in fasi in cui normalmente non potresti (come la fase di battaglia o il turno dell’avversario).
            <br />
            Tuttavia, devi pagare un costo aggiuntivo:
            <ul>
              <li>Devi sacrificare 1 Qi del suo stesso elemento + 1 Qi dell’elemento dell’Entità su cui vuoi impilarla.</li>
              <li>Se vuoi impilare la tua Entità sopra una già impilata, devi sacrificare 1 Qi del suo elemento + 1 Qi per ogni Entità sottostante.</li>
            </ul>
          </p>

          <p>
            Inoltre, ci sono alcune limitazioni: se la carta su cui vuoi invocare la tua Entità è bersaglio di un effetto, non puoi farlo.
            <br />
            Ricorda: se un’Entità impilata viene distrutta, tutte le Entità sottostanti vengono anch’esse mandate nel Diyu.
          </p>
        </>
      ) : (
        <>
          <p>
            To deploy an Entity onto the field, you must first invoke it. Invocation is simple: to invoke an Entity, you must sacrifice 1 Qi of its corresponding Element.
            <br />
            For example: to invoke an Earth Element Entity, you must sacrifice 1 Earth Qi.
          </p>

          <p>
            You can summon entities in two positions: attack or defense, but always face-up.
            <br />
            Entity positions can be changed once per turn, during the Main Phase or the Recovery Phase.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/rulebookdata/01 - Abyssal Merman (1).png"
              alt="Abyssal Merman Vertical"
              style={{ maxWidth: '45%' }}
            />
            <img
              src="/rulebookdata/01 - Abyssal Merman (1)_orizzontale.png"
              alt="Abyssal Merman Horizontal"
              style={{ maxWidth: '45%' }}
            />
          </div>

          <p>
            An Entity’s unique trait is its ability to be stacked: a higher-rank Entity can be stacked on top of 1 lower-rank Entity.
            <br />
            The Entity at the top can gain effects from those beneath it and also determines the position of the entire stack. For example, if the top Entity is in Attack Position, all Entities beneath it will share the same position.
          </p>

          <p>However, there are some rules to follow.</p>

          <p>
            <strong>Entity Rank:</strong>
            <ul>
              <li>Rank 1 Entities can be invoked directly onto the field.</li>
              <li>Higher Rank Entities (Rank 2 and 3) must be placed on top of a lower Rank Entity.
                <br />- Rank 1 → Rank 2 → Rank 3
              </li>
            </ul>
          </p>

          <p>
            <strong>Entity Position:</strong>
            <ul>
              <li>You can only invoke Entities from your hand. Entities in the deck or in Diyu cannot be invoked unless through the effects of other cards.</li>
            </ul>
          </p>

          <p>There is also another type of invocation known as Quick Invocation.</p>

          <p>
            This allows you to Invoke an Entity from your hand during phases when you normally wouldn't be able to (such as the battle phase or your opponent's turn).
            <br />
            However, you must pay an extra cost:
            <ul>
              <li>You must sacrifice 1 Qi of its own element + 1 Qi of the element of the Entity you want to stack it on.</li>
              <li>If you want to stack your Entity on an already stacked Entity, you must sacrifice 1 Qi of its own element + 1 Qi of the element of each underlying Entity.</li>
            </ul>
          </p>

          <p>
            Furthermore there are a couple of limitations: if the card you’re going to invoke your entity on top is target by an effect, you cannot do it.
            <br />
            Remember: if a stacked Entity is destroyed, all underlying Entities are also sent to Diyu.
          </p>
        </>
      )}
    </div>
  );
};

export default ChapterInvocation;
