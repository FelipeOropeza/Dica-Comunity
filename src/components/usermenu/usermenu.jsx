import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './usermenu.css';

const UserMenu = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="user-menu">
      <button onClick={toggleMenu} className="user-name">
        {user} <span className="arrow">▼</span>
      </button>
      {menuOpen && (
        <ul className="menu-dropdown">
          <li>
            <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
