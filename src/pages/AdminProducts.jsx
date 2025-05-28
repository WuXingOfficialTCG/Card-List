// src/pages/AdminProducts.jsx
import Header from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import { getDoc, doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './AdminProducts.css'; // Assicurati che il path sia corretto

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [changes, setChanges] = useState(false);

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

  const updateProductLocally = (id, field, value) => {
    setProducts(products.map(p => (p.id === id ? { ...p, [field]: value } : p)));
    setChanges(true);
  };

  const saveAllChanges = async () => {
    for (const p of products) {
      const { id, ...data } = p;
      await updateDoc(doc(db, 'products', id), data);
    }
    setChanges(false);
    alert('Modifiche salvate.');
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
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={addProduct}>➕ Aggiungi prodotto</button>
        {changes && <button onClick={saveAllChanges} className="save-button">💾 Salva modifiche</button>}
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Prezzo</th>
            <th>Immagine</th>
            <th>Preordine</th>
            <th>Stock</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <input
                  value={p.name}
                  onChange={e => updateProductLocally(p.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  value={p.description}
                  onChange={e => updateProductLocally(p.id, 'description', e.target.value)}
                  rows={2}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.price === 0 ? '' : p.price}
                  placeholder="0"
                  onChange={e =>
                    updateProductLocally(p.id, 'price', e.target.value === '' ? 0 : parseFloat(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  value={p.image}
                  onChange={e => updateProductLocally(p.id, 'image', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={p.preorder}
                  onChange={e => updateProductLocally(p.id, 'preorder', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.stock}
                  onChange={e => updateProductLocally(p.id, 'stock', parseInt(e.target.value, 10) || 0)}
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
