import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navLinks = [
    { path: '/', name: 'Dashboard' },
    { path: '/tasks', name: 'Tasks' },
    { path: '/notes', name: 'Notes' },
    { path: '/focus-timer', name: 'Focus Timer' },
    { path: '/habits', name: 'Habits' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-center space-x-4">
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
      {/* Theme Toggle will go here later */}
    </nav>
  );
};

export default Navbar;