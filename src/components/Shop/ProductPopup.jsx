import React, { useState } from 'react';
import './ProductPopup.module.css';
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
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {/* Colonna immagine */}
        <div className="popup-left" style={{ flex: 1, maxWidth: '350px' }}>
          <img
            src={product.image}
            alt={product.name}
            className="popup-image"
            style={{
              width: '100%',
              borderRadius: '12px',
              marginBottom: '16px',
            }}
          />
        </div>

        {/* Colonna dettagli */}
        <div className="popup-right" style={{ flex: 2 }}>
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
            <p className="preorder-label">🕐 Pre-ordine disponibile</p>
          )}

          <div className="popup-controls" style={{ marginTop: '16px' }}>
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
              className="primary-button"
              onClick={handleActionClick}
              disabled={product.stock === 0 && !product.preorder}
            >
              {product.preorder && product.stock === 0 ? 'Preordina' : 'Ordina'}
            </button>
          </div>

          {showConfirm && (
            <div className="confirmation-box" style={{ marginTop: '20px' }}>
              <p>
                Confermi di {product.preorder && product.stock === 0 ? 'preordinare' : 'acquistare'}{' '}
                <strong>{quantity}</strong> unità di <strong>{product.name}</strong>?
              </p>
              <div className="confirmation-actions">
                <button className="primary-button" onClick={handleConfirm}>Conferma</button>
                <button className="cancel-button" onClick={handleCancelConfirm}>Annulla</button>
              </div>
            </div>
          )}

          <button className="close-button" onClick={onClose} style={{ marginTop: '18px' }}>Chiudi</button>
        </div>
      </div>
    </div>
  );
}
