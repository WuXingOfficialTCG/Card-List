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
        <label>Effetti</label>
        <input
          type="text"
          value={effetti}
          onChange={e => setEffetti(e.target.value)}
          placeholder="Filtra per effetti o descrizione"
        />
      </div>

      <div className="filter-group">
        <span className="elemento-label">Elemento</span>
        <div className="elementi-wrapper">
          {(filters.elemento || []).map(el => (
            <label
              key={el}
              className={`elemento-label-circle ${elementi.includes(el) ? 'selected' : ''}`}
              title={el}
            >
              <input
                type="checkbox"
                checked={elementi.includes(el)}
                onChange={() => toggle(el, elementi, setElementi, 'elemento')}
              />
              <img
                src={`https://i.imgur.com/${imageMap[el]}.png`}
                alt={el}
                draggable={false}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Tipo</label>
        <div className="checkbox-group" style={{ userSelect: 'none' }}>
          {(filters.tipo || []).map(t => (
            <label key={t} className="checkbox-label">
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
            className="number-input"
          />
        </div>

        <div className="atk-res-field">
          <label>Res</label>
          <input
            type="number"
            value={res}
            onChange={e => setRes(e.target.value)}
            min="0"
            className="number-input"
          />
        </div>
      </div>
    </div>
  );
}
