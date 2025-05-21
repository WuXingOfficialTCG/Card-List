import { useState } from "react";

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
          <img
            src={collapsed
              ? "https://i.imgur.com/chevron-right.png"
              : "https://i.imgur.com/chevron-left.png"}
            alt="Toggle"
            className="chevron-icon"
          />
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

          <label>Attacco (ATK)</label>
          <input
            type="number"
            name="atk"
            className="filter-input"
            placeholder="Valore ATK"
            value={filters.atk || ""}
            onChange={handleInputChange}
          />

          <hr />

          <label>Resistenza (RES)</label>
          <input
            type="number"
            name="res"
            className="filter-input"
            placeholder="Valore RES"
            value={filters.res || ""}
            onChange={handleInputChange}
          />
        </>
      )}
    </aside>
  );
}
