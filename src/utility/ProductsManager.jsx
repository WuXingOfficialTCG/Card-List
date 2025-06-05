import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../utility/firebaseHelpers';

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const updateLocally = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    setHasChanges(true);
  };

  const handleAdd = async () => {
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
    setProducts((prev) => [...prev, added]);
    setExpandedIds((prev) => new Set(prev).add(added.id));
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setExpandedIds((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  const saveAll = async () => {
    for (const p of products) {
      const { id, ...data } = p;
      await updateProduct(id, data);
    }
    setHasChanges(false);
    alert('Modifiche prodotti salvate.');
  };

  if (loading) return <div>Caricamento prodotti...</div>;

  return (
    <>
      <h2>Gestione Prodotti (Admin)</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={handleAdd}>➕ Aggiungi prodotto</button>
        {hasChanges && (
          <button onClick={saveAll} className="save-button" style={{ minWidth: 140 }}>
            💾 Salva modifiche
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {products.map((p) => {
          const isOpen = expandedIds.has(p.id);
          return (
            <div
              key={p.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 16,
                width: 340,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(p.id)}
                style={{
                  fontSize: 16,
                  fontWeight: isOpen ? 'bold' : 'normal',
                  color: '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none',
                }}
              >
                {p.name || '(Nome vuoto)'}
                <span style={{ fontSize: 20 }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {/* Body */}
              {isOpen && (
                <>
                  <textarea
                    placeholder="Nome"
                    value={p.name}
                    onChange={(e) => updateLocally(p.id, 'name', e.target.value)}
                    rows={2}
                    style={{ width: '100%', fontWeight: 'bold', fontSize: 16 }}
                  />
                  <textarea
                    placeholder="Descrizione"
                    value={p.description}
                    onChange={(e) => updateLocally(p.id, 'description', e.target.value)}
                    rows={3}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                  <input
                    type="number"
                    placeholder="Prezzo"
                    value={p.price || ''}
                    onChange={(e) =>
                      updateLocally(p.id, 'price', e.target.value === '' ? 0 : parseFloat(e.target.value))
                    }
                    style={{ width: '100%' }}
                  />
                  <input
                    type="text"
                    placeholder="URL immagine"
                    value={p.image}
                    onChange={(e) => updateLocally(p.id, 'image', e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#000' }}>
                      <input
                        type="checkbox"
                        checked={p.preorder}
                        onChange={(e) => updateLocally(p.id, 'preorder', e.target.checked)}
                      />
                      Preordine
                    </label>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={p.stock}
                      onChange={(e) => updateLocally(p.id, 'stock', parseInt(e.target.value, 10) || 0)}
                      style={{ width: 80 }}
                    />
                    <input
                      type="number"
                      placeholder="Soglia"
                      value={p.threshold}
                      onChange={(e) => updateLocally(p.id, 'threshold', parseInt(e.target.value, 10) || 0)}
                      style={{ width: 80 }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontWeight: 'bold',
                        color: p.preorderCount >= p.threshold ? 'green' : '#333',
                      }}
                    >
                      Preordini: {p.preorderCount}
                    </span>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
