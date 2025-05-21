import React, { useState, useMemo, useCallback } from 'react';
import cards from '../data/cards.js';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import CardPopup from '../components/CardPopup/CardPopup';
import './cardlist.css';

function CardList() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardSize, setCardSize] = useState(255);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [filters, setFilters] = useState({
    nome: '',
    elemento: [],
    tipo: [],
    effetto: '',
    atk: '',
    res: ''
  });

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback(({ target: { name, value, checked } }) => {
    setFilters(prev => {
      const updated = new Set(prev[name]);
      checked ? updated.add(value) : updated.delete(value);
      return { ...prev, [name]: [...updated] };
    });
  }, []);

  const handleSizeChange = useCallback(({ target: { value } }) => {
    setCardSize(parseInt(value, 10));
  }, []);

  const handleCardClick = useCallback((card) => setSelectedCard(card), []);
  const closePopup = useCallback(() => setSelectedCard(null), []);

  const cardMatchesFilter = useCallback((card) => {
    const matchText = (val, target) => val.toLowerCase().includes(target.toLowerCase());

    return (
      (!filters.nome || matchText(card.nome, filters.nome)) &&
      (!filters.effetto || card.effetti?.some(e => matchText(e.descrizione ?? '', filters.effetto))) &&
      (!filters.elemento.length || filters.elemento.includes(card.elemento)) &&
      (!filters.tipo.length || filters.tipo.includes(card.tipo)) &&
      (!filters.atk || (card.atk ?? -1) === parseInt(filters.atk)) &&
      (!filters.res || (card.res ?? -1) === parseInt(filters.res))
    );
  }, [filters]);

  const filteredCards = useMemo(() => cards.filter(cardMatchesFilter), [cardMatchesFilter]);
  const gap = useMemo(() => Math.round(cardSize * 0.14), [cardSize]);

  const selectedCardIndex = useMemo(
    () => filteredCards.findIndex(c => c.id === selectedCard?.id),
    [filteredCards, selectedCard]
  );

  const handlePrev = useCallback(() => {
    if (filteredCards.length > 0) {
      const newIndex = (selectedCardIndex - 1 + filteredCards.length) % filteredCards.length;
      setSelectedCard(filteredCards[newIndex]);
    }
  }, [filteredCards, selectedCardIndex]);

  const handleNext = useCallback(() => {
    if (filteredCards.length > 0) {
      const newIndex = (selectedCardIndex + 1) % filteredCards.length;
      setSelectedCard(filteredCards[newIndex]);
    }
  }, [filteredCards, selectedCardIndex]);

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 15;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * -15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    card.style.boxShadow = '0px 20px 60px rgba(0, 0, 0, 0.6)';
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.boxShadow = '';
  };

  return (
    <div className="cardlist-container">
      <FilterSidebar
        filters={filters}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSizeChange={handleSizeChange}
        cardSize={cardSize}
        collapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
      />

      <div
        className="card-grid"
        style={{
          gap: `${gap}px`,
          gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize}px, 1fr))`
        }}
      >
        {filteredCards.length === 0 ? (
          <p className="no-cards-message">No cards found.</p>
        ) : (
          filteredCards.map((card) => (
            <div
              key={card.id}
              className="card"
              style={{ width: `${cardSize}px`, height: `${cardSize * 1.4}px` }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              onClick={() => handleCardClick(card)}
            >
              <img
                src={card.immagine}
                alt={card.nome}
                className="card-img"
              />
            </div>
          ))
        )}
      </div>

      {selectedCard && (
        <CardPopup
          card={selectedCard}
          onClose={closePopup}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default CardList;
