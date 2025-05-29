import React, { useRef, useState } from 'react';
import './popup.css';

export default function Popup({
  card,
  onClose,
  onPrev,
  onNext,
  isFirst,
  isLast,
  onAddCard,
  onRemoveOne,
  deckCount = 0,
}) {
  const imgRef = useRef(null);
  const [backgroundPos, setBackgroundPos] = useState('50% 50%');
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    if (!isZoomed || !imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => {
      if (prev) setBackgroundPos('50% 50%');
      return !prev;
    });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>

        {!isFirst && (
          <button className="popup-nav popup-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
            ‹
          </button>
        )}

        <div
          className={`popup-image-zoom-container ${isZoomed ? 'zoomed' : ''}`}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          ref={imgRef}
          style={{
            backgroundImage: isZoomed ? `url(${card.immagine})` : 'none',
            backgroundPosition: backgroundPos,
            backgroundSize: isZoomed ? '200%' : 'contain',
          }}
        >
          <img
            src={card.immagine}
            alt={card.nome}
            className="popup-image"
            draggable={false}
          />
        </div>

        <div className="popup-controls">
          <button
            onClick={() => onRemoveOne(card)}
            disabled={deckCount <= 0}
            aria-label="Rimuovi una copia"
          >
            −
          </button>
          <span className="popup-count">{deckCount}</span>
          <button
            onClick={() => onAddCard(card)}
            disabled={deckCount >= 3}
            aria-label="Aggiungi una copia"
          >
            +
          </button>
        </div>

        {!isLast && (
          <button className="popup-nav popup-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
            ›
          </button>
        )}
      </div>
    </div>
  );
}
