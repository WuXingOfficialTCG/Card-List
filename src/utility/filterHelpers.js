export function filterCards(cards, filters) {
  return cards.filter(card => {
    if (filters.elemento.length && !filters.elemento.includes(card.elemento)) return false;
    if (filters.tipo.length && !filters.tipo.includes(card.tipo)) return false;
    if (filters.nome && !card.nome?.toLowerCase().includes(filters.nome.toLowerCase())) return false;
    if (filters.effetti && !card.effetti?.toLowerCase().includes(filters.effetti.toLowerCase())) return false;

    if (filters.atk !== '') {
      const atkValue = Number(filters.atk);
      if (isNaN(atkValue) || Number(card.atk) !== atkValue) return false;
    }

    if (filters.res !== '') {
      const resValue = Number(filters.res);
      if (isNaN(resValue) || Number(card.res) !== resValue) return false;
    }

    return true;
  });
}
