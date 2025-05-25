import React, { useEffect, useState } from 'react';

const imageMap = {
  Water: 'P62gDkj',
  Wood: 'y4qbsOM',
  Metal: 'QNaDBt5',
  Fire: 'mMBZDY7',
  Earth: 'a0tn6o9',
};

export default function FiltersSection({ filters = { elemento: [], tipo: [] }, onFilterChange }) {
  const [name, setName] = useState('');
  const [effetti, setEffetti] = useState('');
  const [atk, setAtk] = useState('');
  const [res, setRes] = useState('');
  const [elementi, setElementi] = useState([]);
  const [tipi, setTipi] = useState([]);

  useEffect(() => {
    onFilterChange('nome', name);
  }, [name, onFilterChange]);

  useEffect(() => {
    onFilterChange('effetti', effetti);
  }, [effetti, onFilterChange]);

  useEffect(() => {
    onFilterChange('atk', atk);
  }, [atk, onFilterChange]);

  useEffect(() => {
    onFilterChange('res', res);
  }, [res, onFilterChange]);

  const toggle = (value, currentList, setList, type) => {
    const updated = currentList.includes(value)
      ? currentList.filter(v => v !== value)
      : [...currentList, value];
    setList(updated);
    onFilterChange(type, updated);
  };

  return (
    <div className="filters-section">
      <div className="filter-group">
        <label>Nome</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Filtra per nome"
        />
      </div>

      <div className="filter-group">
        <label>Effetti (tipo o descrizione)</label>
        <input
          type="text"
          value={effetti}
          onChange={e => setEffetti(e.target.value)}
          placeholder="Filtra per effetti o descrizione"
        />
      </div>

      <div className="filter-group">
        <span style={{ fontWeight: 'bold', display: 'block', marginBottom: 6 }}>Elemento</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: 220 }}>
          {(filters.elemento || []).map(el => (
            <label
              key={el}
              style={{
                cursor: 'pointer',
                position: 'relative',
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'inline-block',
              }}
            >
              <input
                type="checkbox"
                checked={elementi.includes(el)}
                onChange={() => toggle(el, elementi, setElementi, 'elemento')}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  margin: 0,
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              />
              <img
                src={`https://i.imgur.com/${imageMap[el]}.png`}
                alt={el}
                title={el}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: elementi.includes(el) ? '2px solid #4caf50' : '2px solid transparent',
                  boxShadow: elementi.includes(el)
                    ? '0 0 8px 2px rgba(76, 175, 80, 0.7)'
                    : 'none',
                  userSelect: 'none',
                  display: 'block',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  pointerEvents: 'none', // evita problemi click sull'immagine
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Tipo</label>
        <div className="checkbox-group" style={{ userSelect: 'none' }}>
          {(filters.tipo || []).map(t => (
            <label key={t} style={{ display: 'block', cursor: 'pointer', marginBottom: 4 }}>
              <input
                type="checkbox"
                checked={tipi.includes(t)}
                onChange={() => toggle(t, tipi, setTipi, 'tipo')}
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group atk-res-inline" style={{ display: 'flex', gap: 20 }}>
        <div className="atk-res-field" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label>Atk</label>
          <input
            type="number"
            value={atk}
            onChange={e => setAtk(e.target.value)}
            min="0"
            style={{
              maxWidth: 65,
              backgroundColor: '#222',
              color: '#eee',
              border: '1px solid #555',
              borderRadius: 4,
              padding: '6px 8px',
            }}
          />
        </div>

        <div className="atk-res-field" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label>Res</label>
          <input
            type="number"
            value={res}
            onChange={e => setRes(e.target.value)}
            min="0"
            style={{
              maxWidth: 65,
              backgroundColor: '#222',
              color: '#eee',
              border: '1px solid #555',
              borderRadius: 4,
              padding: '6px 8px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
