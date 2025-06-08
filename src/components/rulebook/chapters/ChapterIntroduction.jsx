import React from 'react';

const ChapterIntroduction = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Introduzione' : 'Introduction'}</h2>
      <p>
        {language === 'ita'
          ? `Nel mondo degli Invocatori, il potere è nelle tue mani!
             Invocate creature leggendarie, scatenate la magia arcana e dominate il campo di battaglia con strategie uniche. Ogni carta è un frammento di energia antica, pronto a rispondere ai vostri comandi.
             Solo i più astuti e potenti saliranno tra i Maestri dell'Invocazione. Siete pronti a sfidare il vostro destino?

             Per giocare a Wu Xing, tutto ciò di cui avete bisogno è un mazzo di carte interamente scelto da voi e alcune pedine per tenere traccia del vostro Qi.
             Potete costruire liberamente il vostro mazzo utilizzando tutte le carte che desiderate, sia dagli Starter Deck (perfetti per i principianti) che dagli Expansion Pack per strategie ancora più avanzate!`
          : `In the world of Invokers, power is in your hands!
             Invoke legendary creatures, unleash arcane magic, and dominate the battlefield with unique strategies. Each card is a fragment of ancient energy, ready to respond to your command.
             Only the most cunning and powerful will ascend among the Masters of Invoking. Are you ready to challenge your destiny?

             To play Wu Xing, all you need is a deck of cards entirely chosen by you and a few tokens to keep track of your Qi.
             You can freely build your deck using any cards you want, whether from Starter Decks (perfect for beginners) or Expansion Packs for even more advanced strategies!`}
      </p>
    </div>
  );
};

export default ChapterIntroduction;
