// src/pages/AdminProducts.jsx
import Header from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import { getDoc, doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().admin === true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoadingUser(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
      setLoadingProducts(false);
    };
    fetchProducts();
  }, [isAdmin]);

  const addProduct = async () => {
    const newProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
      preorder: false,
      stock: 0,
    };
    const docRef = await addDoc(collection(db, 'products'), newProduct);
    setProducts([...products, { id: docRef.id, ...newProduct }]);
  };

  const updateProduct = async (id, field, value) => {
    setProducts(products.map(p => (p.id === id ? { ...p, [field]: value } : p)));
    await updateDoc(doc(db, 'products', id), { [field]: value });
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(p => p.id !== id));
  };

  if (loadingUser) return <div>Caricamento utente...</div>;
  if (!user) return <div>Devi essere loggato per accedere a questa pagina.</div>;
  if (!isAdmin) return <div>Accesso negato. Non sei un amministratore.</div>;
  if (loadingProducts) return <div>Caricamento prodotti...</div>;

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <h2>Gestione Prodotti (Admin)</h2>
      <button style={{ marginBottom: 10 }} onClick={addProduct}>➕ Aggiungi prodotto</button>
      <table border={1} cellPadding={5} cellSpacing={0} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo (€)</th>
            <th>Immagine</th>
            <th>Preordine</th>
            <th>Stock</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><input value={p.name} onChange={e => updateProduct(p.id, 'name', e.target.value)} /></td>
              <td><input value={p.description} onChange={e => updateProduct(p.id, 'description', e.target.value)} /></td>
              <td>
                <input
                  type="number"
                  value={p.price}
                  onChange={e => updateProduct(p.id, 'price', parseFloat(e.target.value) || 0)}
                /> €
              </td>
              <td><input value={p.image} onChange={e => updateProduct(p.id, 'image', e.target.value)} /></td>
              <td>
                <input
                  type="checkbox"
                  checked={p.preorder}
                  onChange={e => updateProduct(p.id, 'preorder', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.stock}
                  onChange={e => updateProduct(p.id, 'stock', parseInt(e.target.value, 10) || 0)}
                />
              </td>
              <td>
                <button onClick={() => deleteProduct(p.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
