// src/components/NavigationBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

export default function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <Link to="/deck-builder" className="nav-button">Card List</Link>
      <Link to="/shop" className="nav-button">Shop</Link>
      <Link to="/events" className="nav-button">Events</Link>
      <Link to="/account" className="nav-button">Account</Link>
      <Link to="/admin" className="nav-button">Admin</Link>
    </nav>
  );
}
