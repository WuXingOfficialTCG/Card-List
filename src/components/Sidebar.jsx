import React, { useState, useEffect } from 'react';
import './sidebar.css';

export default function Sidebar({ filters, onFilterChange, deck, onAddCard, onRemoveOne }) {
  const maxDeckSize = 40;
  const maxCopies = 3;

  const [collapsed, setCollapsed] = useState(false);

  // Stati locali per i filtri complessi
  const [nameFilter, setNameFilter] = useState('');
  const [effectsFilter, setEffectsFilter] = useState('');
  const [atkFilter, setAtkFilter] = useState('');
  const [resFilter, setResFilter] = useState('');

  // Stato checkbox multipla per elemento e tipo (array di selezionati)
  const [selectedElementi, setSelectedElementi] = useState([]);
  const [selectedTipi, setSelectedTipi] = useState([]);

  // Toggle collapse sidebar
  const toggleCollapse = () => setCollapsed(c => !c);

  // Aggiorna i filtri checkbox e avvisa il genitore
  const toggleElemento = (elemento) => {
    setSelectedElementi(prev => {
      const isSelected = prev.includes(elemento);
      const newSelection = isSelected
        ? prev.filter(el => el !== elemento)
        : [...prev, elemento];
      onFilterChange('elemento', newSelection);
      return newSelection;
    });
  };

  const toggleTipo = (tipo) => {
    setSelectedTipi(prev => {
      const isSelected = prev.includes(tipo);
      const newSelection = isSelected
        ? prev.filter(t => t !== tipo)
        : [...prev, tipo];
      onFilterChange('tipo', newSelection);
      return newSelection;
    });
  };

  // Aggiorna filtro testo e numerici e invia a onFilterChange
  useEffect(() => {
    onFilterChange('nome', nameFilter);
  }, [nameFilter]);

  useEffect(() => {
    onFilterChange('effetti', effectsFilter);
  }, [effectsFilter]);

  useEffect(() => {
    onFilterChange('atk', atkFilter);
  }, [atkFilter]);

  useEffect(() => {
    onFilterChange('res', resFilter);
  }, [resFilter]);

  const handleDrop = e => {
    e.preventDefault();
    const cardData = e.dataTransfer.getData('application/json');
    if (!cardData) return;
    const card = JSON.parse(cardData);

    const totalCards = deck.reduce((acc, c) => acc + c.count, 0);
    const found = deck.find(c => c.card.id === card.id);

    if (totalCards >= maxDeckSize) {
      alert('Mazzo pieno (max 40 carte)');
      return;
    }

    if (found && found.count >= maxCopies) {
      alert('Max 3 copie per carta');
      return;
    }

    onAddCard(card);
  };

  const handleDragOver = e => e.preventDefault();

  return (
    <>
      {/* Invisible hover area to trigger open sidebar */}
      {collapsed && (
        <div
          className="sidebar-hover-trigger"
          onMouseEnter={() => setCollapsed(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="filters-header">
          <h3>Filtri</h3>
          <button
            className="collapse-btn"
            onClick={toggleCollapse}
            aria-label={collapsed ? "Apri sidebar" : "Chiudi sidebar"}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {!collapsed && (
          <>
            <div className="filters-section">
              {/* Filtro nome */}
              <div className="filter-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={nameFilter}
                  onChange={e => setNameFilter(e.target.value)}
                  placeholder="Filtra per nome"
                />
              </div>

              {/* Filtro effetti */}
              <div className="filter-group">
                <label>Effetti</label>
                <input
                  type="text"
                  value={effectsFilter}
                  onChange={e => setEffectsFilter(e.target.value)}
                  placeholder="Filtra per effetti"
                />
              </div>

              {/* Filtro elemento come checkbox */}
              <div className="filter-group">
                <label>Elemento</label>
                <div className="checkbox-group">
                  {filters.elemento.map(el => (
                    <label key={el}>
                      <input
                        type="checkbox"
                        checked={selectedElementi.includes(el)}
                        onChange={() => toggleElemento(el)}
                      />
                      {el}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro tipo come checkbox */}
              <div className="filter-group">
                <label>Tipo</label>
                <div className="checkbox-group">
                  {filters.tipo.map(t => (
                    <label key={t}>
                      <input
                        type="checkbox"
                        checked={selectedTipi.includes(t)}
                        onChange={() => toggleTipo(t)}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro atk e res affiancati */}
              <div className="filter-group">
                <div className="atk-res-inline">
                  <div className="atk-res-field">
                    <label>Atk</label>
                    <input
                      type="number"
                      value={atkFilter}
                      onChange={e => setAtkFilter(e.target.value)}
                      placeholder="Valore"
                      min="0"
                    />
                  </div>
                  <div className="atk-res-field">
                    <label>Res</label>
                    <input
                      type="number"
                      value={resFilter}
                      onChange={e => setResFilter(e.target.value)}
                      placeholder="Valore"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div
              className="deck-dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h3>Mazzo ({deck.reduce((acc, c) => acc + c.count, 0)} / 40)</h3>
              {deck.length === 0 && <p>Trascina le carte qui per aggiungerle</p>}

              <div className="deck-cards-grid">
                {deck.map(({ card, count }) => (
                  <div
                    key={card.id}
                    className="deck-card-wrapper"
                    onClick={() => onRemoveOne(card)}
                    title="Clicca per rimuovere 1 copia"
                  >
                    <img src={card.immagine} alt={card.nome} className="deck-card-img" />
                    <span className="card-count-badge">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
