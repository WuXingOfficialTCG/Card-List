import React from 'react';

const ChapterTurnPhases = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Fasi del turno' : 'Turn Phases'}</h2>
      <p>
        {language === 'ita'
          ? `Sempre caro mi fu quest’ermo colle, e questa siepe...`
          : `In the middle of the journey of our life I found myself in a dark wood...`}
      </p>
      <hr style={{ width: '80%', margin: '2rem auto', border: '1px solid #ccc' }} />
    </div>
  );
};

export default ChapterTurnPhases;
