import React, { useState } from 'react';
import styles from './ProductPopup.module.css';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function ProductPopup({ product, onClose, onBuy }) {
  const [quantity, setQuantity] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!product) return null;

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const handleActionClick = () => {
    setShowConfirm(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);

    if (product.preorder && product.stock === 0) {
      await handlePreorder(product, quantity);
    } else {
      onBuy(product, quantity);
    }

    onClose();
  };

  const handlePreorder = async (product, quantity) => {
    const productRef = doc(db, 'products', product.id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) return;

    const data = productSnap.data();
    const currentCount = data.preorderCount || 0;
    const threshold = data.threshold || 0;
    const newCount = currentCount + quantity;

    await updateDoc(productRef, {
      preorderCount: newCount
    });

    if (currentCount < threshold && newCount >= threshold) {
      console.log(`✅ Il prodotto "${data.name}" ha raggiunto la soglia di produzione.`);
      // 🔔 TODO: Trigger invio email
    }
  };

  return (
    <div className={styles['popup-overlay']} onClick={onClose}>
      <div className={styles['popup-content']} onClick={(e) => e.stopPropagation()}>
        {/* Colonna immagine */}
        <div className={styles['popup-left']}>
          <img
            src={product.image}
            alt={product.name}
            className={styles['popup-image']}
          />
        </div>

        {/* Colonna dettagli */}
        <div className={styles['popup-right']}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Prezzo:</strong> €{Number(product.price).toFixed(2)}</p>
          <p>
            {product.stock > 0
              ? `Disponibilità: ${product.stock}`
              : product.preorder
                ? 'Disponibile in pre-ordine'
                : 'Esaurito'}
          </p>

          {product.preorder && product.stock === 0 && (
            <p className={styles['preorder-label']}>🕐 Pre-ordine disponibile</p>
          )}

          <div className={styles['popup-controls']}>
            <label>
              Quantità:
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={handleQuantityChange}
              />
            </label>

            <button
              className={styles['primary-button']}
              onClick={handleActionClick}
              disabled={product.stock === 0 && !product.preorder}
            >
              {product.preorder && product.stock === 0 ? 'Preordina' : 'Ordina'}
            </button>
          </div>

          {showConfirm && (
            <div className={styles['confirmation-box']}>
              <p>
                Confermi di {product.preorder && product.stock === 0 ? 'preordinare' : 'acquistare'}{' '}
                <strong>{quantity}</strong> unità di <strong>{product.name}</strong>?
              </p>
              <div className={styles['confirmation-actions']}>
                <button className={styles['primary-button']} onClick={handleConfirm}>Conferma</button>
                <button className={styles['cancel-button']} onClick={handleCancelConfirm}>Annulla</button>
              </div>
            </div>
          )}

          <button className={styles['close-button']} onClick={onClose}>Chiudi</button>
        </div>
      </div>
    </div>
  );
}
