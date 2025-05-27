// src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import './Shop.css'; // Import del file CSS

function ProductPopup({ product, onClose, onBuy }) {
  if (!product) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Prezzo:</strong> €{product.price.toFixed(2)}</p>
        {product.preorder && <p className="preorder-label">Pre-ordine disponibile</p>}
        <button onClick={() => onBuy(product)}>
          {product.preorder ? 'Preordina' : 'Compra'}
        </button>
        <button className="close-button" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <h3>{product.name}</h3>
      <p>€{product.price.toFixed(2)}</p>
    </div>
  );
}

function ProductGrid({ products, onProductClick }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fakeProducts = [
      { id: 1, name: 'Prodotto A', price: 29.99, description: 'Ottimo prodotto A.', preorder: false },
      { id: 2, name: 'Prodotto B', price: 59.99, description: 'Fantastico prodotto B.', preorder: true },
      { id: 3, name: 'Prodotto C', price: 15.5, description: 'Economico prodotto C.', preorder: false },
      { id: 4, name: 'Prodotto D', price: 99.0, description: 'Top gamma prodotto D.', preorder: true },
    ];
    setProducts(fakeProducts);
  }, []);

  const handleBuy = (product) => {
    alert(`Hai scelto di ${product.preorder ? 'preordinare' : 'comprare'}: ${product.name}`);
    setSelected(null);
  };

  return (
    <>
      <h1 className="shop-title">Shop</h1>
      <ProductGrid products={products} onProductClick={setSelected} />
      <ProductPopup product={selected} onClose={() => setSelected(null)} onBuy={handleBuy} />
    </>
  );
}
