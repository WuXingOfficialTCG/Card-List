import React, { useEffect, useState, useCallback } from 'react';

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

  // Ottimizzato toggle con useCallback per evitare ricreazione
  const toggle = useCallback((value, currentList, setList, type) => {
    const updated = currentList.includes(value)
      ? currentList.filter(v => v !== value)
      : [...currentList, value];
    setList(updated);
    onFilterChange(type, updated);
  }, [onFilterChange]);

  // Chiamata unica per aggiornare i filtri di input testuali e numerici
  useEffect(() => {
    onFilterChange('nome', name);
    onFilterChange('effetti', effetti);
    onFilterChange('atk', atk);
    onFilterChange('res', res);
  }, [name, effetti, atk, res, onFilterChange]);

  return (
    <div className="filters-section">
      <div className="filter-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Filter for name"
        />
      </div>

      <div className="filter-group">
        <label>Effects</label>
        <input
          type="text"
          value={effetti}
          onChange={e => setEffetti(e.target.value)}
          placeholder="Filter for effects"
        />
      </div>

      <div className="filter-group">
        <span className="elemento-label">Element</span>
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
        <div className="checkbox-group user-select-none">
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
          <label>ATK</label>
          <input
            type="number"
            value={atk}
            onChange={e => setAtk(e.target.value)}
            min="0"
            className="number-input"
          />
        </div>

        <div className="atk-res-field">
          <label>RES</label>
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
