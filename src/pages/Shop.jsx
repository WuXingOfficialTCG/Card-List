import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Header from '../components/Header/Header';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ProductPopup from '../components/ProductPopup';
import './Shop.css';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(list);
      } catch (err) {
        console.error('Errore caricando prodotti da Firestore:', err);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  const handleBuy = (product, quantity) => {
    alert(`Hai scelto di comprare ${quantity}x ${product.name}`);
    setSelected(null);
  };

  const handlePreorder = async (product, quantity) => {
    if (!user) {
      alert('Devi essere loggato per preordinare');
      return;
    }

    try {
      const ref = collection(db, `users/${user.uid}/preordini`);
      await addDoc(ref, {
        productId: product.id,
        productName: product.name,
        quantity,
        timestamp: new Date()
      });

      alert(`Hai preordinato ${quantity}x ${product.name}`);
      setSelected(null);
    } catch (err) {
      console.error('Errore durante il preordine:', err);
      alert('Errore nel preordine. Riprova più tardi.');
    }
  };

  return (
    <>
      <Header />
      <NavigationBar />
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
              style={{ width: '100%', borderRadius: 4 }}
            />
            <h3>{product.name}</h3>
            <p>€{Number(product.price).toFixed(2)}</p>
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

      <ProductPopup
        product={selected}
        onClose={() => setSelected(null)}
        onBuy={handleBuy}
        onPreorder={handlePreorder}
      />
    </>
  );
}
