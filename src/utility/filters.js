export const initialFilters = {
  elemento: [],
  tipo: [],
  nome: '',
  effetti: '',
  atk: '',
  res: '',
};

export const availableFilters = {
  elemento: ['Water', 'Wood', 'Metal', 'Fire', 'Earth'],
  tipo: ['Entity', 'Chakra'],
};

export function filterCards(cards, filters) {
  return cards.filter(card => {
    if (filters.elemento.length && !filters.elemento.includes(card.elemento)) return false;
    if (filters.tipo.length && !filters.tipo.includes(card.tipo)) return false;
    if (filters.nome && !card.nome?.toLowerCase().includes(filters.nome.toLowerCase())) return false;

    if (filters.effetti) {
      // filtra effetti e descrizione concatenati
      const effectsDescription = (card.effetti || []).map(e => `${e.tipo} ${e.descrizione}`).join(' ').toLowerCase();
      if (!effectsDescription.includes(filters.effetti.toLowerCase())) return false;
    }

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
