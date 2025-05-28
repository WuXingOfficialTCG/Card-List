import React, { useRef, useState } from 'react';

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
    if (!isZoomed) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const toggleZoom = () => {
    setIsZoomed(z => {
      if (z) setBackgroundPos('50% 50%'); // reset posizione zoom quando chiudo
      return !z;
    });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose}>×</button>

        {!isFirst && (
          <button
            className="popup-nav popup-prev"
            onClick={e => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Carta precedente"
          >
            ‹
          </button>
        )}

        <div
          className="popup-image-zoom-container"
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          ref={imgRef}
          style={{
            backgroundImage: `url(${card.immagine})`,
            backgroundPosition: backgroundPos,
            backgroundRepeat: 'no-repeat',
            backgroundSize: isZoomed ? '200%' : 'contain',
            cursor: isZoomed ? 'zoom-out' : 'zoom-in',
          }}
          aria-label={card.nome}
          role="img"
          tabIndex={0}
        >
          <img
            src={card.immagine}
            alt={card.nome}
            className="popup-image"
            draggable={false}
            style={{ opacity: isZoomed ? 0 : 1, transition: 'opacity 0.3s ease' }}
          />
        </div>

        <div
          className="popup-controls"
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={() => onRemoveOne(card)}
            disabled={deckCount <= 0}
            style={{
              fontSize: '20px',
              padding: '6px 12px',
              cursor: deckCount <= 0 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Rimuovi una copia"
          >
            −
          </button>

          <span style={{ fontSize: '18px', alignSelf: 'center' }}>{deckCount}</span>

          <button
            onClick={() => onAddCard(card)}
            disabled={deckCount >= 3} // disabilita se 3 copie raggiunte
            style={{
              fontSize: '20px',
              padding: '6px 12px',
              cursor: deckCount >= 3 ? 'not-allowed' : 'pointer',
            }}
            aria-label="Aggiungi una copia"
          >
            +
          </button>
        </div>

        {!isLast && (
          <button
            className="popup-nav popup-next"
            onClick={e => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Carta successiva"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
