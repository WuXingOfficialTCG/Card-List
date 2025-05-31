// src/components/NavigationBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';
import './NavigationBarResponsive.css';

export default function NavigationBar() {
  const location = useLocation();

  const getClass = (path) =>
    location.pathname === path ? 'nav-button active' : 'nav-button';

  return (
    <nav className="navigation-bar">
      <Link to="/" className={getClass('/')}>Home</Link>
      <Link to="/deck-builder" className={getClass('/deck-builder')}>Card List</Link>
      <Link to="/shop" className={getClass('/shop')}>Shop</Link>
      <Link to="/events" className={getClass('/events')}>Events</Link>
      <Link to="/account" className={getClass('/account')}>Account</Link>
      <Link to="/admin" className={getClass('/admin')}>Admin</Link>
    </nav>
  );
}
