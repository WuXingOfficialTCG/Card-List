import React from 'react';
import styles from './PopupDeck.module.css'; // o CSS a piacere

export default function PopupDeck({ deck, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <section className={styles.content} onClick={e => e.stopPropagation()} tabIndex={-1}>
        {/* Bottone chiudi fuori dalla griglia */}
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi popup"
          style={{ position: 'absolute', top: '-15px', right: '-15px' }}
        >
          ×
        </button>

        <div className={styles.grid}>
          {deck.flatMap(({ card, count }) =>
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
