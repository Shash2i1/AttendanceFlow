import { useState } from 'react';
import React from 'react';
import Sidebar from '../components/dashboardComp/Sidebar';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference or default to light
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    // Save theme preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }
  };

  React.useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Force a re-render by updating a data attribute
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Use flexbox layout for proper sidebar positioning */}
      <div className="flex h-screen">
        {/* Sidebar - takes fixed width on desktop */}
        <div className="hidden lg:block">
          <Sidebar 
            isOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        </div>
        
        {/* Mobile Sidebar - overlay on mobile */}
        <div className="lg:hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        </div>
        
        {/* Main Content Area - takes remaining space */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <Navbar 
            toggleSidebar={toggleSidebar}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
          
          {/* Page Content - scrollable */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet/>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;