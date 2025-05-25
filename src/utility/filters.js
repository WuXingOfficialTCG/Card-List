export function filterCards(cards, filters) {
  return cards.filter(card => {
    if (filters.elemento.length && !filters.elemento.includes(card.elemento)) return false;
    if (filters.tipo.length && !filters.tipo.includes(card.tipo)) return false;
    if (filters.nome && !card.nome?.toLowerCase().includes(filters.nome.toLowerCase())) return false;

    if (filters.effetti) {
      const filtroEffetti = filters.effetti.toLowerCase();

      // verifica se almeno un effetto ha tipo o descrizione che contiene filtroEffetti
      const matchEffetti = card.effetti?.some(eff =>
        (eff.tipo && eff.tipo.toLowerCase().includes(filtroEffetti)) ||
        (eff.descrizione && eff.descrizione.toLowerCase().includes(filtroEffetti))
      );

      if (!matchEffetti) return false;
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
