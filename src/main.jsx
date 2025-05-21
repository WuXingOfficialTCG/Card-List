import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // globale
import CardList from './pages/CardList.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CardList />
  </React.StrictMode>
);
