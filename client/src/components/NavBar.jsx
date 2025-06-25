import { Menu,  LogOut, Sun, Moon } from 'lucide-react';
import useAuthstore from '../store/auth.store';


const Navbar = ({ toggleSidebar, isDark, toggleTheme }) => {

  const {logoutUser} = useAuthstore();

  const handleLogout = (e) =>{
      e.preventDefault();

      logoutUser();
  }
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-green-100 dark:border-green-800/50 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-105"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Desktop title */}
            <div className="hidden lg:block ml-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Dashboard</h2>
            </div>
          </div>

          {/* Right side - Theme toggle and logout */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-105"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Logout */}
            <button 
            onClick={handleLogout}
            className="sm:hidden p-2.5 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105">
              <LogOut className="w-5 h-5" />
            </button>

            {/* Desktop Logout */}
            <button 
            onClick={handleLogout}
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar