import React from 'react';
import styles from './PopupDeck.module.css';

export default function PopupDeck({ deck, onClose, onRemoveCard }) {
  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizzazione mazzo"
    >
      <div
        className={styles['popup-wrapper']}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi popup"
          type="button"
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
                  tabIndex={0}
                  aria-label={`${card.nome}, carta ${i + 1} di ${count}`}
                >
                  <img
                    src={card.immagine}
                    alt={card.nome}
                    className={styles.cardImage}
                    draggable={false}
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    aria-label={`Rimuovi una copia di ${card.nome}`}
                    onClick={() => onRemoveCard(card, i)} // Passa anche l'indice
                  >
                    −
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
