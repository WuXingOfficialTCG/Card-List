import React from "react";

const PopupSupport = ({ onClose }) => {
  return (
    <div className="popup-support-overlay">
      <div className="popup-support">
        <h2>Supporta Wu Xing TCG</h2>
        <p>
          Questo progetto è gratuito e indipendente. Se ti piace, considera di
          supportarlo!
        </p>
        <div className="popup-buttons">
          <a
            href="https://ko-fi.com/tua_pagina" // <-- modifica con il tuo link reale
            target="_blank"
            rel="noopener noreferrer"
            className="support-btn"
          >
            Supporta su Ko-fi
          </a>
          <button className="close-btn" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupSupport;
