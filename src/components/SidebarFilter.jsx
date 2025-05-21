// src/components/SidebarFilter.jsx
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SidebarFilter({ filters, setFilters }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const tipi = checked
        ? [...prev.tipo, value]
        : prev.tipo.filter(t => t !== value);
      return { ...prev, tipo: tipi };
    });
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="filter-header">
        <h2>Filtri</h2>
        <button onClick={toggleCollapse} className="collapse-btn" title="Chiudi/apri filtri">
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {!collapsed && (
        <>
          <label htmlFor="nameInput">Nome</label>
          <input
            type="text"
            id="nameInput"
            name="nome"
            className="filter-input"
            placeholder="Cerca per nome"
            value={filters.nome}
            onChange={handleInputChange}
          />

          <hr />

          <label>Tipo</label>
          <div className="checkbox-group two-rows">
            {["Entity", "Chakra", "Equipaggiamento"].map(tipo => (
              <label key={tipo}>
                <input
                  type="checkbox"
                  value={tipo}
                  checked={filters.tipo.includes(tipo)}
                  onChange={handleCheckboxChange}
                />{" "}
                {tipo}
              </label>
            ))}
          </div>

          <hr />

          <label>Attacco</label>
          <div className="range-group">
            <input
              type="number"
              name="minAtk"
              className="filter-input range-input"
              placeholder="Min"
              value={filters.minAtk}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="maxAtk"
              className="filter-input range-input"
              placeholder="Max"
              value={filters.maxAtk}
              onChange={handleInputChange}
            />
          </div>

          <label>Resistenza</label>
          <div className="range-group">
            <input
              type="number"
              name="minRes"
              className="filter-input range-input"
              placeholder="Min"
              value={filters.minRes}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="maxRes"
              className="filter-input range-input"
              placeholder="Max"
              value={filters.maxRes}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
    </aside>
  );
}
