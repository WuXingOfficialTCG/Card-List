import React, { useState, useRef } from 'react';
import './TiltCard.css';

export default function TiltCard({ card, count, onAdd, onRemove }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 15; // max tilt 15 deg
    const rotateY = (x / rect.width) * 15;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: 'transform 0.1s ease',
    });
  };

  const resetTilt = () => {
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.3s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <img src={card.immagine} alt={card.nome} className="tilt-card-image" />
      <div className="tilt-card-controls">
        <button onClick={() => onRemove(card)} disabled={count <= 0}>−</button>
        <span>{count}</span>
        <button onClick={() => onAdd(card)}>+</button>
      </div>
    </div>
  );
}
