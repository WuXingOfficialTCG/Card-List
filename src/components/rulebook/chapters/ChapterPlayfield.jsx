import React from 'react';

const ChapterPlayfield = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Campo di gioco' : 'Playfield'}</h2>
      <p>
        {language === 'ita'
          ? `Sempre caro mi fu quest’ermo colle, e questa siepe...`
          : `In the middle of the journey of our life I found myself in a dark wood...`}
      </p>
    </div>
  );
};

export default ChapterPlayfield;
