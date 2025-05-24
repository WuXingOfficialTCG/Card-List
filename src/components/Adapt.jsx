import React, { useState } from 'react';

export default function Adapt({ children }) {
  const [isAdaptCollapsed, setIsAdaptCollapsed] = useState(false);

  const toggleAdaptCollapse = () => setIsAdaptCollapsed(prev => !prev);

  return (
    <>
      {typeof children === 'function'
        ? children({ isAdaptCollapsed, toggleAdaptCollapse })
        : null}
    </>
  );
}
