import React from 'react';

const ChapterSetup = ({ language }) => {
  return (
    <div id="chapter-0" className="chapter">
      <h2>{language === 'ita' ? 'Setup' : 'Setup'}</h2>
      <p>
        {language === 'ita'
          ? `Sempre caro mi fu quest’ermo colle, e questa siepe...`
          : `In the middle of the journey of our life I found myself in a dark wood...`}
      </p>
    </div>
  );
};

export default ChapterSetup;
