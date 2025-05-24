import React, { useState } from 'react';

export default function Adapt({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapsed = () => setIsSidebarCollapsed(prev => !prev);

  return (
    <>
      {typeof children === 'function'
        ? children({ isSidebarCollapsed, toggleSidebarCollapsed })
        : null}
    </>
  );
}
