export function importDeckFromFile(file, onSuccess, onError) {
  const reader = new FileReader();

  reader.onload = (ev) => {
    try {
      const json = JSON.parse(ev.target.result);
      if (!Array.isArray(json)) {
        onError('Formato del mazzo non valido: deve essere un array');
        return;
      }
      onSuccess(json);
    } catch (e) {
      onError('Impossibile leggere il file JSON o formato errato');
    }
  };

  reader.readAsText(file);
}

export function exportDeckToFile(deck, filename = 'deck.json') {
  const jsonStr = JSON.stringify(deck, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
