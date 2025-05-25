import React, { useEffect, useState } from 'react';

const imageMap = {
  Water: 'P62gDkj',  // sostituisci con ID immagine reale Imgur
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
        <label>Elemento</label>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            maxWidth: '220px', // fa andare a capo dopo circa 3 immagini
          }}
        >
          {(filters.elemento || []).map(el => (
            <label
              key={el}
              style={{ cursor: 'pointer', display: 'inline-block' }}
            >
              <input
                type="checkbox"
                checked={elementi.includes(el)}
                onChange={() => toggle(el, elementi, setElementi, 'elemento')}
                style={{ display: 'none' }}
              />
              <img
                src={`https://i.imgur.com/${imageMap[el]}.png`}
                alt={el}
                title={el}
                style={{
                  border: elementi.includes(el) ? '2px solid blue' : '2px solid transparent',
                  borderRadius: '8px',
                  width: '60px',
                  height: '60px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Tipo</label>
        <div className="checkbox-group">
          {(filters.tipo || []).map(t => (
            <label key={t}>
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

      <div className="filter-group atk-res-inline">
        <div className="atk-res-field">
          <label>Atk</label>
          <input
            type="number"
            value={atk}
            onChange={e => setAtk(e.target.value)}
            min="0"
          />
        </div>

        <div className="atk-res-field">
          <label>Res</label>
          <input
            type="number"
            value={res}
            onChange={e => setRes(e.target.value)}
            min="0"
          />
        </div>
      </div>
    </div>
  );
}
