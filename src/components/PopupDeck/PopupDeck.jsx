import React, { useEffect, useRef, useCallback } from 'react';
import styles from './PopupDeck.module.css';

export default function PopupDeck({ deck, onClose, onRemoveCard }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.focus();
    }
  }, []);

  // Gestione tasti per ESC e trap focus
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab' && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popupdeck-title"
      aria-describedby="popupdeck-description"
    >
      <div
        className={styles['popup-wrapper']}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi popup"
          type="button"
        >
          ×
        </button>

        <section
          className={styles.content}
          tabIndex={-1}
          ref={contentRef}
        >
          <h2 id="popupdeck-title" style={{ margin: '0 0 10px 0' }}>
            Visualizzazione mazzo
          </h2>
          <p id="popupdeck-description" style={{ marginBottom: '15px' }}>
            Seleziona le carte da rimuovere.
          </p>
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
                    onClick={() => onRemoveCard(card, i)}
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
