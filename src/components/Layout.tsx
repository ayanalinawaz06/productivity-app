import React from 'react';
import Navbar from './NavBar';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme(); // Get theme from context

  // Define background colors based on theme
  const backgroundColor = theme === 'light' ? '#F8F8F8' : '#2C2C2C'; // Your app-light and app-dark hex codes

  return (
    // Apply inline style for guaranteed background color
    <div style={{ backgroundColor }} className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;