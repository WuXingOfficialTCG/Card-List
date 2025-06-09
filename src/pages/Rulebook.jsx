import React, { useState } from 'react';
import RulebookSidebar from '../components/rulebook/RulebookSidebar';
import ChapterIntroduction from '../components/rulebook/chapters/ChapterIntroduction';
import ChapterSetup from '../components/rulebook/chapters/ChapterSetup';
import ChapterCards from '../components/rulebook/chapters/ChapterCards';
import ChapterPlayfield from '../components/rulebook/chapters/ChapterPlayfield';
import ChapterInvocation from '../components/rulebook/chapters/ChapterInvocation';
import ChapterEffects from '../components/rulebook/chapters/ChapterEffects';
import ChapterTurnPhases from '../components/rulebook/chapters/ChapterTurnPhases';
import ChapterQi from '../components/rulebook/chapters/ChapterQi';
import ChapterCombat from '../components/rulebook/chapters/ChapterCombat';
import ChapterGlossary from '../components/rulebook/chapters/ChapterGlossary';
import styles from '../components/rulebook/Rulebook.module.css';

const Rulebook = () => {
  const [language, setLanguage] = useState('ita');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ita' ? 'eng' : 'ita'));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.sidebar}>
        <RulebookSidebar language={language} />
      </div>

      <div style={{ flex: 1, padding: '1rem' }}>
        <button onClick={toggleLanguage} style={{ marginBottom: '1rem' }}>
          {language === 'ita' ? 'English' : 'Italiano'}
        </button>

        <div className={styles.chapter} id="chapter-0">
          <ChapterIntroduction language={language} />
        </div>
        <div className={styles.chapter} id="chapter-1">
          <ChapterSetup language={language} />
        </div>
        <div className={styles.chapter} id="chapter-2">
          <ChapterCards language={language} />
        </div>
        <div className={styles.chapter} id="chapter-3">
          <ChapterPlayfield language={language} />
        </div>
        <div className={styles.chapter} id="chapter-9">
          <ChapterInvocation language={language} />
        </div>
        <div className={styles.chapter} id="chapter-4">
          <ChapterEffects language={language} />
        </div>
        <div className={styles.chapter} id="chapter-5">
          <ChapterTurnPhases language={language} />
        </div>
        <div className={styles.chapter} id="chapter-6">
          <ChapterQi language={language} />
        </div>
        <div className={styles.chapter} id="chapter-7">
          <ChapterCombat language={language} />
        </div>
        <div className={styles.chapter} id="chapter-8">
          <ChapterGlossary language={language} />
        </div>
      </div>
    </div>
  );
};

export default Rulebook;
