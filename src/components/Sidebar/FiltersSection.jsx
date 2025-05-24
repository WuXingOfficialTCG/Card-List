import React, { useEffect, useState } from 'react';

export default function FiltersSection({ filters, onFilterChange }) {
  const [name, setName] = useState('');
  const [effetti, setEffetti] = useState('');
  const [atk, setAtk] = useState('');
  const [res, setRes] = useState('');
  const [elementi, setElementi] = useState([]);
  const [tipi, setTipi] = useState([]);

  useEffect(() => onFilterChange('nome', name), [name]);
  useEffect(() => onFilterChange('effetti', effetti), [effetti]);
  useEffect(() => onFilterChange('atk', atk), [atk]);
  useEffect(() => onFilterChange('res', res), [res]);

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
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Filtra per nome" />
      </div>
      <div className="filter-group">
        <label>Effetti</label>
        <input type="text" value={effetti} onChange={e => setEffetti(e.target.value)} placeholder="Filtra per effetti" />
      </div>
      <div className="filter-group">
        <label>Elemento</label>
        <div className="checkbox-group">
          {filters.elemento.map(el => (
            <label key={el}>
              <input type="checkbox" checked={elementi.includes(el)} onChange={() => toggle(el, elementi, setElementi, 'elemento')} />
              {el}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <label>Tipo</label>
        <div className="checkbox-group">
          {filters.tipo.map(t => (
            <label key={t}>
              <input type="checkbox" checked={tipi.includes(t)} onChange={() => toggle(t, tipi, setTipi, 'tipo')} />
              {t}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group atk-res-inline">
        <div className="atk-res-field">
          <label>Atk</label>
          <input type="number" value={atk} onChange={e => setAtk(e.target.value)} min="0" />
        </div>
        <div className="atk-res-field">
          <label>Res</label>
          <input type="number" value={res} onChange={e => setRes(e.target.value)} min="0" />
        </div>
      </div>
    </div>
  );
}
