import React, { useState } from 'react';
import './popupName.css';

export default function PopupName({ onConfirm, onCancel }) {
  const [filename, setFilename] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filename.trim()) {
      onConfirm(filename.trim());
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Nome del file</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Inserisci nome del file"
          />
          <div className="popup-buttons">
            <button type="submit">Salva</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Annulla</button>
          </div>
        </form>
      </div>
    </div>
  );
}

