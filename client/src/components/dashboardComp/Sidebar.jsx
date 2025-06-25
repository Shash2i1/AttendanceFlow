import Footer from "../Footer";
import { X, Home, BookOpen, Settings, LogOut, User } from 'lucide-react';
import { useState } from "react";
import useAuthstore from "../../store/auth.store";
import { Link, useLocation } from "react-router-dom";


const Sidebar = ({ isOpen, toggleSidebar, isDark, toggleTheme }) => {
  const { logoutUser, authUser } = useAuthstore();
  const location = useLocation();

  const menuItems = [
    { name: 'Overview', icon: Home, path: "" },
    { name: 'Classes', icon: BookOpen, path: "class-info" },
    { name: 'Settings', icon: Settings, path: "settings" },
  ];

  // Function to check if a menu item is active based on current route
  const isActiveItem = (itemPath) => {
    const currentPath = location.pathname;
    
    // Handle root path case (Overview)
    if (itemPath === "") {
      return currentPath === "/" || currentPath === "";
    }
    
    // For other paths, check if current path includes the item path
    return currentPath.includes(itemPath);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:h-screen
        border-r border-green-100 dark:border-green-800/50
      `}>
        <div className="flex flex-col h-full p-4">
          {/* App Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">AttandanceFlow</h1>
              </div>
            </Link>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-green-50 to-green-100/80 dark:from-green-900/30 dark:to-green-800/20 rounded-xl p-4 mb-6 border border-green-200/50 dark:border-green-700/50 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{authUser.name}</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Teacher</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveItem(item.path);
                
                return (
                  <li key={item.name}>
                    <Link to={item.path}>
                      <button
                        className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group
                        ${isActive
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 scale-[1.02]'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300 hover:scale-[1.01]'
                          }
                      `}
                      >
                        <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                        <span className="font-semibold">{item.name}</span>
                      </button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="pt-4 border-t border-green-100 dark:border-green-800/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-[1.01] group">
              <LogOut className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Sidebar;