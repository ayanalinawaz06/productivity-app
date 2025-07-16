import React from 'react';
import Navbar from './NavBar'; // To be created

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar /> {/* Your navigation will go here */}
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;