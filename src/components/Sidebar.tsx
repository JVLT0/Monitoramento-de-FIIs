import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp, BarChart, LineChart, Info, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentPath: string;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, currentPath, isDarkMode }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/recommendations', label: 'Recomendações', icon: <TrendingUp size={20} /> },
    { path: '/forecasts', label: 'Previsões', icon: <LineChart size={20} /> },
    { path: '/about', label: 'Sobre', icon: <Info size={20} /> },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
        border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <BarChart size={24} className="text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold">FII Tracker</h2>
          </div>
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-md transition-colors duration-200 
                    ${currentPath === item.path 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 FII Tracker</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;