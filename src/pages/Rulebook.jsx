import React, { useState } from 'react';
import RulebookSidebar from '../components/rulebook/RulebookSidebar';
import ChapterIntroduction from '../components/rulebook/chapters/ChapterIntroduction';
import ChapterSetup from '../components/rulebook/chapters/ChapterSetup';
import ChapterCards from '../components/rulebook/chapters/ChapterCards';
import ChapterPlayfield from '../components/rulebook/chapters/ChapterPlayfield';
import ChapterEffects from '../components/rulebook/chapters/ChapterEffects';
import ChapterTurnPhases from '../components/rulebook/chapters/ChapterTurnPhases';
import ChapterQi from '../components/rulebook/chapters/ChapterQi';
import ChapterCombat from '../components/rulebook/chapters/ChapterCombat';
import ChapterGlossary from '../components/rulebook/chapters/ChapterGlossary';

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
