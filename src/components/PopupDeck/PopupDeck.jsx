import React from 'react';
import styles from './PopupDeck.module.css';

export default function PopupDeck({ deck, onClose }) {
  if (!deck || deck.length === 0) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizzazione del mazzo"
    >
      <section
        className={styles.content}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi popup"
        >
          ×
        </button>

        <div className={styles.grid}>
          {deck.flatMap(({ card, count }) =>
            // Per ogni carta ripeto il rendering count volte
            Array.from({ length: count }, (_, i) => (
              <div key={`${card.id || card.nome}-${i}`} className={styles.card}>
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
  );
}
