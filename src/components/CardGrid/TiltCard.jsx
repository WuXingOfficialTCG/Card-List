import React, { useState } from 'react';

export default function TiltCard({ src, alt, className }) {
  const [style, setStyle] = useState({
    transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.3s ease',
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    userSelect: 'none',
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    setStyle(prev => ({
      ...prev,
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: 'transform 0.1s ease',
    }));
  };

  const resetTilt = () => {
    setStyle(prev => ({
      ...prev,
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.3s ease',
    }));
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      draggable={false}
    />
  );
}
