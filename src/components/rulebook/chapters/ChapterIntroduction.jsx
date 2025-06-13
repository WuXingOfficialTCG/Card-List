import React from 'react';

const ChapterIntroduction = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Introduzione' : 'Introduction'}</h2>
      {language === 'ita' ? (
        <>
          <p>Nel mondo degli <strong>Evocatori</strong>, il potere è nelle tue mani!</p>
          <p>
            Evoca creature leggendarie, scatena magie arcane e domina il campo di battaglia con strategie uniche. Ogni carta è un <strong>frammento di energia ancestrale</strong>, pronta a rispondere al tuo comando.
          </p>
          <p>
            Solo i più astuti e potenti ascenderanno tra i Maestri dell’Evocazione. <strong>Sei pronto a sfidare il tuo destino?</strong>
          </p>
        </>
      ) : (
        <>
          <p>In the world of <strong>Invokers</strong>, power is in your hands!</p>
          <p>
            Invoke legendary creatures, unleash arcane magic, and dominate the battlefield with unique strategies. Each card is a <strong>fragment of ancient energy</strong>, ready to respond to your command.
          </p>
          <p>
            Only the most cunning and powerful will ascend among the Masters of Invoking. <strong>Are you ready to challenge your destiny?</strong>
          </p>
        </>
      )}
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterIntroduction;
