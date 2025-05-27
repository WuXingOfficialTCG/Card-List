// src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import './Shop.css';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => {
        console.error('Errore caricando prodotti:', err);
        setProducts([]);
      });
  }, []);

  const handleBuy = (product) => {
    if (product.stock === 0 && !product.preorder) {
      alert('Prodotto esaurito!');
      return;
    }
    alert(`Hai scelto di ${product.preorder ? 'preordinare' : 'comprare'}: ${product.name}`);
    setSelected(null);
  };

  return (
    <>
      <h1 className="shop-title">Shop</h1>
      <div className="product-grid">
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => setSelected(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>€{product.price.toFixed(2)}</p>
            <p>
              {product.stock > 0
                ? `Disponibilità: ${product.stock}`
                : product.preorder
                ? 'Disponibile in pre-ordine'
                : 'Esaurito'}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="popup-overlay" onClick={() => setSelected(null)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h2>{selected.name}</h2>
            <img
              src={selected.image}
              alt={selected.name}
              className="popup-image"
            />
            <p>{selected.description}</p>
            <p><strong>Prezzo:</strong> €{selected.price.toFixed(2)}</p>
            <p>
              {selected.stock > 0
                ? `Disponibilità: ${selected.stock}`
                : selected.preorder
                ? 'Disponibile in pre-ordine'
                : 'Esaurito'}
            </p>
            {selected.preorder && <p className="preorder-label">Pre-ordine disponibile</p>}
            <button
              onClick={() => handleBuy(selected)}
              disabled={selected.stock === 0 && !selected.preorder}
            >
              {selected.preorder ? 'Preordina' : 'Compra'}
            </button>
            <button className="close-button" onClick={() => setSelected(null)}>
              Chiudi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
