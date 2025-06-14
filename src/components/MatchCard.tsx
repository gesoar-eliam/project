import React from 'react';
import { Match } from '../types';
import { CalendarDays, MapPin, Timer } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  showReserveButton?: boolean;
  onReserve?: (matchId: string) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, showReserveButton = false, onReserve }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <span className="animate-pulse h-2 w-2 bg-white rounded-full mr-1"></span>
            LIVE
          </div>
        );
      case 'completed':
        return (
          <div className="absolute top-2 right-2 bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            FINAL
          </div>
        );
      default:
        return (
          <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            UPCOMING
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
      {getStatusBadge()}
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-medium text-gray-500">{match.stage}</div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-gray-200">
              <img 
                src={match.homeTeam.flag} 
                alt={match.homeTeam.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">{match.homeTeam.name}</div>
              <div className="text-xs text-gray-600">Group {match.homeTeam.group}</div>
            </div>
          </div>
          
          {match.status !== 'upcoming' ? (
            <div className="text-2xl font-bold mx-2">
              {match.score?.home}
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-500 mx-2">VS</div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-gray-200">
              <img 
                src={match.awayTeam.flag} 
                alt={match.awayTeam.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">{match.awayTeam.name}</div>
              <div className="text-xs text-gray-600">Group {match.awayTeam.group}</div>
            </div>
          </div>
          
          {match.status !== 'upcoming' ? (
            <div className="text-2xl font-bold mx-2">
              {match.score?.away}
            </div>
          ) : null}
        </div>
        
        <div className="border-t pt-3 mt-2">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{formatDate(match.date)}</span>
            <span className="mx-2">•</span>
            <Timer className="h-4 w-4 mr-1" />
            <span>{match.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{match.venue}</span>
          </div>
        </div>
        
        {showReserveButton && match.status === 'upcoming' && (
          <button
            onClick={() => onReserve && onReserve(match.id)}
            className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition duration-200 font-medium"
          >
            Reserve Seats
          </button>
        )}
        
        {match.highlights && match.highlights.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <h4 className="text-sm font-semibold mb-1">Highlights</h4>
            <ul className="text-xs text-gray-600">
              {match.highlights.slice(-3).map((highlight, index) => (
                <li key={index} className="mb-1">{highlight}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;