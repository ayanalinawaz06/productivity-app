import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { path: '/', name: 'Dashboard' },
    { path: '/tasks', name: 'Tasks' },
    { path: '/notes', name: 'Notes' },
    { path: '/focus-timer', name: 'Focus Timer' },
    { path: '/habits', name: 'Habits' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center px-8">
      <div className="flex space-x-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </nav>
  );
};

export default Navbar;