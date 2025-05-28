import Header from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import {
  getDoc,
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [products, setProducts] = useState([]);
  const [editableProducts, setEditableProducts] = useState([]);
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
      setEditableProducts(list);
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
    const fullProduct = { id: docRef.id, ...newProduct };
    setProducts([...products, fullProduct]);
    setEditableProducts([...editableProducts, fullProduct]);
  };

  const handleChange = (id, field, value) => {
    setEditableProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSaveChanges = async () => {
    for (let i = 0; i < editableProducts.length; i++) {
      const edited = editableProducts[i];
      const original = products.find(p => p.id === edited.id);
      if (JSON.stringify(edited) !== JSON.stringify(original)) {
        await updateDoc(doc(db, 'products', edited.id), {
          name: edited.name,
          description: edited.description,
          price: Number(edited.price),
          image: edited.image,
          preorder: edited.preorder,
          stock: Number(edited.stock),
        });
      }
    }
    setProducts(editableProducts);
    alert('Modifiche salvate.');
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(p => p.id !== id));
    setEditableProducts(editableProducts.filter(p => p.id !== id));
  };

  if (loadingUser) return <div>Caricamento utente...</div>;
  if (!user) return <div>Devi essere loggato per accedere a questa pagina.</div>;
  if (!isAdmin) return <div>Accesso negato. Non sei un amministratore.</div>;
  if (loadingProducts) return <div>Caricamento prodotti...</div>;

  return (
    <div style={{ padding: 20 }}>
      <Header />
      <h2>Gestione Prodotti (Admin)</h2>

      <button onClick={handleSaveChanges} style={{ marginBottom: 10, background: 'blue', color: 'white', padding: '6px 12px', borderRadius: 4 }}>
        💾 Salva modifiche
      </button>
      <button onClick={addProduct} style={{ marginLeft: 10, padding: '6px 12px' }}>
        ➕ Aggiungi prodotto
      </button>

      <table border={1} cellPadding={5} cellSpacing={0} style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
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
          {editableProducts.map(p => (
            <tr key={p.id}>
              <td>
                <input value={p.name} onChange={e => handleChange(p.id, 'name', e.target.value)} />
              </td>
              <td>
                <textarea
                  value={p.description}
                  rows={3}
                  style={{ width: '100%', resize: 'vertical' }}
                  onChange={e => handleChange(p.id, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.price}
                  onChange={e => handleChange(p.id, 'price', parseFloat(e.target.value) || 0)}
                /> €
              </td>
              <td>
                <input value={p.image} onChange={e => handleChange(p.id, 'image', e.target.value)} />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={p.preorder}
                  onChange={e => handleChange(p.id, 'preorder', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.stock}
                  onChange={e => handleChange(p.id, 'stock', parseInt(e.target.value, 10) || 0)}
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
