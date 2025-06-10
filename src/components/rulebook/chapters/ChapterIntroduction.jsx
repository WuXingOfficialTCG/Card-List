import React from 'react';

const ChapterIntroduction = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Introduzione' : 'Introduction'}</h2>
      {language === 'ita' ? (
        <>
          <p>Nel mondo degli Evocatori, il potere è nelle tue mani!</p>
          <p>
            Evoca creature leggendarie, scatena magie arcane e domina il campo di battaglia con strategie uniche. Ogni carta è un frammento di energia antica, pronto a rispondere al tuo comando.
          </p>
          <p>
            Solo i più astuti e potenti ascenderanno tra i Maestri dell’Evocazione. Sei pronto a sfidare il tuo destino?
          </p>
        </>
      ) : (
        <>
          <p>In the world of Invokers, power is in your hands!</p>
          <p>
            Invoke legendary creatures, unleash arcane magic, and dominate the battlefield with unique strategies. Each card is a fragment of ancient energy, ready to respond to your command.
          </p>
          <p>
            Only the most cunning and powerful will ascend among the Masters of Invoking. Are you ready to challenge your destiny?
          </p>
        </>
      )}
    </div>
  );
};

export default ChapterIntroduction;
