import React from 'react';
import styles from './PopupDeck.module.css';

export default function PopupDeck({ deck, onClose }) {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizzazione mazzo"
    >
      <section
        className={styles.content}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Bottone chiudi posizionato fuori dal contenitore content */}
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi popup"
          type="button"
        >
          ×
        </button>

        <div className={styles.grid}>
          {deck.flatMap(({ card, count }) =>
            Array.from({ length: count }, (_, i) => (
              <div
                key={`${card.id || card.nome}-${i}`}
                className={styles.card}
                tabIndex={0}
                aria-label={`${card.nome}, carta ${i + 1} di ${count}`}
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
  );
}
