import React, { useState } from 'react';
import './Rulebook.css';
import RulebookSidebar from './RulebookSidebar';
import ChapterIntroduction from './chapters/ChapterIntroduction';
import ChapterSetup from './chapters/ChapterSetup';
import ChapterCards from './chapters/ChapterCards';
import ChapterPlayfield from './chapters/ChapterPlayfield';
import ChapterEffects from './chapters/ChapterEffects';
import ChapterTurnPhases from './chapters/ChapterTurnPhases';
import ChapterQi from './chapters/ChapterQi';
import ChapterCombat from './chapters/ChapterCombat';
import ChapterGlossary from './chapters/ChapterGlossary';

const Rulebook = () => {
  const [language, setLanguage] = useState('ita');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ita' ? 'eng' : 'ita'));
  };

  return (
    <div className="rulebook-container">
      <RulebookSidebar language={language} />
      <div className="rulebook-content">
        <button className="lang-button" onClick={toggleLanguage}>
          {language === 'ita' ? 'English' : 'Italiano'}
        </button>

        <ChapterIntroduction language={language} />
        <ChapterSetup language={language} />
        <ChapterCards language={language} />
        <ChapterPlayfield language={language} />
        <ChapterEffects language={language} />
        <ChapterTurnPhases language={language} />
        <ChapterQi language={language} />
        <ChapterCombat language={language} />
        <ChapterGlossary language={language} />
      </div>
    </div>
  );
};

export default Rulebook;
