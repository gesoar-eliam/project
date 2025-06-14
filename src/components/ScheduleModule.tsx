import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MatchCard from './MatchCard';
import { Filter } from 'lucide-react';

const ScheduleModule: React.FC = () => {
  const { filteredMatches, filterMatches, currentFilter } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  
  const filterOptions = [
    { value: 'all', label: 'All Matches' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'live', label: 'Live' },
    { value: 'completed', label: 'Completed' },
    { value: 'Group Stage', label: 'Group Stage' },
    { value: 'Round of 16', label: 'Round of 16' },
    { value: 'Quarter-finals', label: 'Quarter-finals' },
    { value: 'Semi-finals', label: 'Semi-finals' },
    { value: 'Final', label: 'Final' }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Match Schedule</h2>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
        >
          <Filter className="h-4 w-4 mr-1" />
          <span className="text-sm">Filter</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => filterMatches(option.value)}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  currentFilter === option.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-gray-200 text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {filteredMatches.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No matches found for the selected filter
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map(match => (
            <MatchCard 
              key={match.id} 
              match={match} 
              showReserveButton
              onReserve={(matchId) => {
                // Navigate to reservations tab and pre-select this match
                const { setActiveTab } = useApp();
                setActiveTab('reservations');
                // This would ideally store the selected match ID for the reservation form
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleModule;