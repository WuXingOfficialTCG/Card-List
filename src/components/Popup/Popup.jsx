import React from 'react';
import styles from './popup.module.css'; // ✔️ Importazione corretta per CSS Modules

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
  return (
    <div className={styles['popup-overlay']} onClick={onClose}>
      <div className={styles['popup-content']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['popup-close']} onClick={onClose}>×</button>

        {!isFirst && (
          <button
            className={`${styles['popup-nav']} ${styles['popup-prev']}`}
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
            className={`${styles['popup-nav']} ${styles['popup-next']}`}
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
