import React, { useState } from 'react';
import './ProductPopup.css';

export default function ProductPopup({ product, onClose, onBuy, onPreorder }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const handleAction = () => {
    if (product.preorder) {
      onPreorder(product, quantity);
    } else {
      onBuy(product, quantity);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
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
            : product.preorder
            ? 'Disponibile in pre-ordine'
            : 'Esaurito'}
        </p>

        {product.preorder && <p className="preorder-label">Pre-ordine disponibile</p>}

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
        >
          {product.preorder ? 'Preordina' : 'Compra'}
        </button>
        <button className="close-button" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
}
