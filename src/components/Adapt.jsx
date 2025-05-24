// src/components/Adapt.jsx
import React, { useState } from 'react';

export default function Adapt({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(prev => !prev);

  // children è una funzione che riceve collapsed e toggleCollapsed
  // così il genitore può accedere a questi valori
  return (
    <>
      {typeof children === 'function'
        ? children({ collapsed, toggleCollapsed })
        : null}
    </>
  );
}
