import React from 'react';
import styles from './PopupDeck.module.css';

export default function PopupDeck({ deck, onClose }) {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizzazione del mazzo"
    >
      <div className={styles.popupWrapper} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        <section className={styles.content} tabIndex={-1}>
          <div className={styles.grid}>
            {deck.flatMap(({ card, count }) =>
              Array.from({ length: count }, (_, i) => (
                <div
                  key={`${card.id || card.nome}-${i}`}
                  className={styles.card}
                >
                  <img
                    src={card.immagine}
                    alt={card.nome}
                    className={styles.cardImage}
                    draggable={false}
                  />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
