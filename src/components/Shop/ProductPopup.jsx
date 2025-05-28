import React, { useState } from 'react';
import './ProductPopup.css';

export default function ProductPopup({ product, onClose, onBuy, onPreorder }) {
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

  const handleConfirm = () => {
    setShowConfirm(false);
    if (product.preorder && product.stock === 0) {
      onPreorder(product, quantity);
    } else {
      onBuy(product, quantity);
    }
    onClose();
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="popup-image"
        />
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
          <p className="preorder-label">Pre-ordine disponibile</p>
        )}

        <div className="popup-controls">
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
          <div className="confirmation-box">
            <p>Confermi di {product.preorder && product.stock === 0 ? 'preordinare' : 'acquistare'} <strong>{quantity}</strong> unità di <strong>{product.name}</strong>?</p>
            <div className="confirmation-actions">
              <button className="primary-button" onClick={handleConfirm}>Conferma</button>
              <button className="cancel-button" onClick={handleCancelConfirm}>Annulla</button>
            </div>
          </div>
        )}

        <button className="close-button" onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
}
