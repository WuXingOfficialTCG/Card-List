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

  const handleAction = () => {
    setShowConfirm(true);
  };

  const confirmAction = () => {
    if (product.preorder && product.stock === 0) {
      onPreorder(product, quantity);
    } else {
      onBuy(product, quantity);
    }
    setShowConfirm(false);
    onClose();
  };

  const isPreorder = product.preorder && product.stock === 0;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="popup-image"
          style={{ width: '100%', borderRadius: 6 }}
        />
        <p>{product.description}</p>
        <p><strong>Prezzo:</strong> €{Number(product.price).toFixed(2)}</p>
        <p>
          {product.stock > 0
            ? `Disponibilità: ${product.stock}`
            : isPreorder
            ? 'Disponibile in pre-ordine'
            : 'Esaurito'}
        </p>

        {isPreorder && (
          <p className="preorder-label">Pre-ordine disponibile</p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
          <label>
            Quantità:
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={handleQuantityChange}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </label>
          <button
            onClick={handleAction}
            disabled={product.stock === 0 && !product.preorder}
            style={{ marginLeft: 'auto' }}
          >
            {isPreorder ? 'Preordina' : 'Ordina'}
          </button>
        </div>

        <button className="close-button" onClick={onClose}>
          Chiudi
        </button>

        {showConfirm && (
          <div className="popup-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>Conferma {isPreorder ? 'preordine' : 'ordine'}</h3>
              <p>
                Vuoi {isPreorder ? 'preordinare' : 'ordinare'} <strong>{quantity}</strong> unità di <strong>{product.name}</strong>?
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button onClick={confirmAction}>
                  Conferma
                </button>
                <button className="close-button" onClick={() => setShowConfirm(false)} style={{ marginLeft: '10px' }}>
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
