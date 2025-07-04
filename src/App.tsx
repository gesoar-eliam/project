import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import ScheduleModule from './components/ScheduleModule';
import ResultsModule from './components/ResultsModule';
import ReservationsModule from './components/ReservationsModule';
import InfoModule from './components/InfoModule';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-grow bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {activeTab === 'schedule' && <ScheduleModule />}
        {activeTab === 'results' && <ResultsModule />}
        {activeTab === 'reservations' && <ReservationsModule />}
        {activeTab === 'info' && <InfoModule />}
      </div>
    </main>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">World Cup 2025</h3>
            <p className="text-gray-400 text-sm">All rights reserved &copy; 2025</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;