import React from 'react';

const ChapterCards = ({ language }) => {
  const imgPath = '/rulebookdata/';
  const images = {
    ita: ['entity_ITA.png', 'chakra_ITA.png', 'domain_ITA.png'],
    eng: ['entity_ENG.png', 'chakra_ENG.png', 'domain_ENG.png']
  };
  const sideImage = 'Card_part1.png';

  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Carte' : 'Cards'}</h2>

      <p>
        {language === 'ita'
          ? <>In Wu Xing, ci sono <strong>tre tipi di carte</strong> che puoi usare per costruire il tuo mazzo: <strong>Entità</strong>, <strong>Chakra</strong> e <strong>Domini</strong>. Puoi distinguerli grazie al simbolo e al testo in alto a sinistra.</>
          : <>In Wu Xing, there are <strong>three types of cards</strong> that you can use to build your deck: <strong>Entities</strong>, <strong>Chakras</strong> and <strong>Domains</strong>. You can distinguish these by their symbol and text in the top left corner.</>
        }
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '1.5rem 0' }}>
        {images[language === 'ita' ? 'ita' : 'eng'].map((img, i) => (
          <img key={i} src={`${imgPath}${img}`} alt={`card-${i}`} style={{ maxWidth: '150px', height: 'auto' }} />
        ))}
      </div>

      <p>
        {language === 'ita'
          ? <>Tutte le carte sono associate a <strong>uno dei cinque Elementi</strong>. Questa è una caratteristica importante per la costruzione del mazzo, perché i mazzi a elemento singolo non sono sempre i migliori!</>
          : <>All cards are associated with <strong>one of the five Elements</strong>. This is an important feature for deck building, as single-Element decks are not always the best!</>
        }
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginTop: '1rem' }}>
        <img src={`${imgPath}${sideImage}`} alt="card-zones" style={{ maxWidth: '200px', height: 'auto' }} />

        <div>
          <p>
            {language === 'ita'
              ? 'Su ogni carta, puoi distinguere:'
              : 'On each card, you can distinguish:'}
          </p>
          <ol>
            <li>{language === 'ita' ? <><strong>Nome</strong>.</> : <><strong>Name</strong>.</>}</li>
            <li>{language === 'ita' ? <>Tipo di carta: per le Entità, è il <strong>Rango</strong>.</> : <>Card type: for Entities, this is the <strong>Rank</strong>.</>}</li>
            <li>{language === 'ita' ? <>Elemento: nel gioco ce ne sono 5.</> : <>Element: in the game there are 5.</>}</li>
            <li>{language === 'ita' ? <><strong>ATK</strong> e <strong>RES</strong>: solo per le Entità.</> : <><strong>ATK</strong> and <strong>RES</strong>: only for Entities.</>}</li>
            <li>{language === 'ita' ? <><strong>Effetto</strong>.</> : <><strong>Effect</strong>.</>}</li>
            <li>{language === 'ita' ? <>Informazioni aggiuntive.</> : <>Additional information.</>}</li>
          </ol>
          <p style={{ marginTop: '1rem' }}>
            {language === 'ita'
              ? <>Puoi facilmente capire il Rango dell'entità semplicemente guardando il numero romano in alto a sinistra della carta: <strong>I</strong> indica Rango 1, <strong>II</strong> Rango 2 e <strong>III</strong> Rango 3.</>
              : <>You can easily tell the rank of the entity just by looking at the Roman numeral on the top left of the card: <strong>I</strong> stands for Rank 1, <strong>II</strong> stands for Rank 2 and <strong>III</strong> for Rank 3.</>}
          </p>
        </div>
      </div>
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterCards;
