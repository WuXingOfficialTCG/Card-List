import React from 'react';
import './filterSidebar.css';

export default function FilterSidebar({ filters, onFilterChange }) {
  return (
    <aside className="filter-sidebar">
      <h3>Filtri</h3>
      <div className="filter-group">
        <label>Elemento</label>
        <select onChange={e => onFilterChange('elemento', e.target.value)} defaultValue="">
          <option value="">Tutti</option>
          {filters.elemento.map(el => (
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Tipo</label>
        <select onChange={e => onFilterChange('tipo', e.target.value)} defaultValue="">
          <option value="">Tutti</option>
          {filters.tipo.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
