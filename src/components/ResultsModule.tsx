import React from 'react';
import { useApp } from '../context/AppContext';
import MatchCard from './MatchCard';

const ResultsModule: React.FC = () => {
  const { matches, filterMatches } = useApp();
  
  // Get completed and live matches
  const completedMatches = matches.filter(match => match.status === 'completed');
  const liveMatches = matches.filter(match => match.status === 'live');

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Matches</h2>
        
        {liveMatches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No matches are currently live
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Matches</h2>
        
        {completedMatches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No completed matches yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsModule;