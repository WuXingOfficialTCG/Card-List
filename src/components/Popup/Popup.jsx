import React, { useRef } from 'react';
import styles from './popup.module.css';
import './PopupResponsive.css';

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
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const threshold = 50;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && !isLast) {
        onNext();
      } else if (deltaX < 0 && !isFirst) {
        onPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={styles['popup-overlay']}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles['popup-content']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['popup-close']} onClick={onClose}>×</button>

        {!isFirst && (
          <button
            className={`${styles['popup-nav']} ${styles['popup-prev']} ${styles['mobileHidden']}`}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            ‹
          </button>
        )}

        <div className={styles['popup-image-zoom-container']}>
          <img
            src={card.immagine}
            alt={card.nome}
            className={styles['popup-image']}
            draggable={false}
          />
        </div>

        <div className={styles['popup-controls']}>
          <button
            onClick={() => onRemoveOne(card)}
            disabled={deckCount <= 0}
            aria-label="Rimuovi una copia"
          >
            −
          </button>
          <span className={styles['popup-count']}>{deckCount}</span>
          <button
            onClick={() => onAddCard(card)}
            disabled={deckCount >= 3}
            aria-label="Aggiungi una copia"
          >
            +
          </button>
        </div>

        {!isLast && (
          <button
            className={`${styles['popup-nav']} ${styles['popup-next']} ${styles['mobileHidden']}`}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
