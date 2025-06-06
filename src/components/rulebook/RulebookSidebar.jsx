import React from 'react';

const labels = {
  ita: [
    'Introduzione', 'Setup', 'Carte', 'Campo di gioco', 'Effetti',
    'Fasi del turno', 'Qi', 'Combattimento', 'Glossario'
  ],
  eng: [
    'Introduction', 'Setup', 'Cards', 'Playfield', 'Effects',
    'Turn Phases', 'Qi', 'Combat', 'Glossary'
  ]
};

const RulebookSidebar = ({ language }) => {
  return (
    <div className="rulebook-sidebar">
      <ul>
        {labels[language].map((label, index) => (
          <li key={index}>
            <a href={`#chapter-${index}`}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RulebookSidebar;
