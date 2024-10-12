import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const UserMenu = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId} = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={toggleMenu} 
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        {user} <span className="ml-1">▼</span>
      </button>
      {menuOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <li>
            <Link 
              to="/cria-postagem" 
              onClick={() => setMenuOpen(false)} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Criar Postagem
            </Link>
          </li>
          <li>
            <Link 
              to={`/minhas-postagens/${userId}`} 
              onClick={() => setMenuOpen(false)} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Minhas postagens
            </Link>
          </li>
          <li>
            <button 
              onClick={logout} 
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
