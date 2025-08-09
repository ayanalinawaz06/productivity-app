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

  const navBgColor = theme === 'light' ? '#60A5FA' : '#3B82F6';

  return (
    <nav style={{ backgroundColor: navBgColor }} className="shadow-lg p-4 flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 rounded-b-lg">
      <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 mb-2 md:mb-0">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-darker-light text-white shadow-md dark:bg-primary-dark'
                  : 'text-white hover:bg-primary-darker-light dark:hover:bg-primary-lighter-dark'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-full text-sm font-medium
                   bg-white text-primary-dark dark:bg-gray-700 dark:text-white
                   hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm
                   mt-2 md:mt-0"
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </nav>
  );
};

export default Navbar;