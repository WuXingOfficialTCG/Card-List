import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../utility/firebaseHelpers';

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const list = await fetchProducts();
      setProducts(list);
      setLoadingProducts(false);
    };
    loadProducts();
  }, []);

  const addNewProduct = async () => {
    const newProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
      preorder: false,
      stock: 0,
      threshold: 0,
      preorderCount: 0,
    };
    const added = await addProduct(newProduct);
    setProducts([...products, added]);
  };

  const updateProductLocally = (id, field, value) => {
    setProducts(products.map(p => (p.id === id ? { ...p, [field]: value } : p)));
    setChanges(true);
  };

  const saveAllChanges = async () => {
    for (const p of products) {
      const { id, ...data } = p;
      await updateProduct(id, data);
    }
    setChanges(false);
    alert('Modifiche prodotti salvate.');
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  if (loadingProducts) return <div>Caricamento prodotti...</div>;

  return (
    <>
      <h2>Gestione Prodotti (Admin)</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={addNewProduct}>➕ Aggiungi prodotto</button>
        {changes && (
          <button onClick={saveAllChanges} className="save-button">
            💾 Salva modifiche
          </button>
        )}
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
            <th>Soglia</th>
            <th>Preordini</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <textarea
                  value={p.name}
                  onChange={(e) => updateProductLocally(p.id, 'name', e.target.value)}
                  rows={2}
                />
              </td>
              <td>
                <textarea
                  value={p.description}
                  onChange={(e) => updateProductLocally(p.id, 'description', e.target.value)}
                  rows={2}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.price === 0 ? '' : p.price}
                  placeholder="0"
                  onChange={(e) =>
                    updateProductLocally(p.id, 'price', e.target.value === '' ? 0 : parseFloat(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  value={p.image}
                  onChange={(e) => updateProductLocally(p.id, 'image', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={p.preorder}
                  onChange={(e) => updateProductLocally(p.id, 'preorder', e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.stock}
                  onChange={(e) =>
                    updateProductLocally(p.id, 'stock', parseInt(e.target.value, 10) || 0)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.threshold}
                  onChange={(e) =>
                    updateProductLocally(p.id, 'threshold', parseInt(e.target.value, 10) || 0)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.preorderCount}
                  disabled
                  className={p.preorderCount >= p.threshold ? 'highlight-green' : ''}
                />
              </td>
              <td>
                <button onClick={() => removeProduct(p.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
