// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSS globale
import App from './App.jsx'; // Usa App, non CardList

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
