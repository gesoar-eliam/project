import React from 'react';
import { Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <header className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Trophy className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">World Cup 2025</h1>
        </div>
        
        <nav className="w-full sm:w-auto">
          <ul className="flex justify-center sm:justify-end space-x-1 md:space-x-2">
            <li>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-3 py-2 rounded-t-lg text-sm transition-colors duration-200 ${
                  activeTab === 'schedule'
                    ? 'bg-white text-emerald-800 font-medium'
                    : 'text-white hover:bg-emerald-600'
                }`}
              >
                Schedule
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3 py-2 rounded-t-lg text-sm transition-colors duration-200 ${
                  activeTab === 'results'
                    ? 'bg-white text-emerald-800 font-medium'
                    : 'text-white hover:bg-emerald-600'
                }`}
              >
                Results
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('reservations')}
                className={`px-3 py-2 rounded-t-lg text-sm transition-colors duration-200 ${
                  activeTab === 'reservations'
                    ? 'bg-white text-emerald-800 font-medium'
                    : 'text-white hover:bg-emerald-600'
                }`}
              >
                Reservations
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('info')}
                className={`px-3 py-2 rounded-t-lg text-sm transition-colors duration-200 ${
                  activeTab === 'info'
                    ? 'bg-white text-emerald-800 font-medium'
                    : 'text-white hover:bg-emerald-600'
                }`}
              >
                Info
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;