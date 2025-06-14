import React, { createContext, useContext, useState, useEffect } from 'react';
import { Match, Reservation } from '../types';
import { matches as initialMatches } from '../data';

interface AppContextType {
  matches: Match[];
  filteredMatches: Match[];
  reservations: Reservation[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filterMatches: (filter: string) => void;
  currentFilter: string;
  addReservation: (reservation: Omit<Reservation, 'id' | 'confirmed'>) => void;
  updateMatchStatus: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>(initialMatches);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentFilter, setCurrentFilter] = useState('all');

  // Function to filter matches
  const filterMatches = (filter: string) => {
    setCurrentFilter(filter);
    
    if (filter === 'all') {
      setFilteredMatches(matches);
    } else if (filter === 'live') {
      setFilteredMatches(matches.filter(match => match.status === 'live'));
    } else if (filter === 'upcoming') {
      setFilteredMatches(matches.filter(match => match.status === 'upcoming'));
    } else if (filter === 'completed') {
      setFilteredMatches(matches.filter(match => match.status === 'completed'));
    } else if (['Group Stage', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'].includes(filter)) {
      setFilteredMatches(matches.filter(match => match.stage === filter));
    }
  };

  // Function to add a reservation
  const addReservation = (reservation: Omit<Reservation, 'id' | 'confirmed'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `res-${Date.now()}`,
      confirmed: true
    };
    setReservations([...reservations, newReservation]);
  };

  // Function to simulate real-time updates (for demo purposes)
  const updateMatchStatus = () => {
    // This function would typically connect to a real-time API
    // For this demo, we'll just simulate updates
    const updatedMatches = matches.map(match => {
      if (match.status === 'live') {
        // Simulate score changes for live matches
        const homeScoreChange = Math.random() > 0.9 ? 1 : 0;
        const awayScoreChange = Math.random() > 0.9 ? 1 : 0;
        
        if (homeScoreChange || awayScoreChange) {
          const currentScore = match.score || { home: 0, away: 0 };
          const newScore = {
            home: currentScore.home + homeScoreChange,
            away: currentScore.away + awayScoreChange
          };
          
          let newHighlights = [...(match.highlights || [])];
          if (homeScoreChange) {
            newHighlights.push(`Goal ${match.homeTeam.name} - ${Math.floor(Math.random() * 90 + 1)}'`);
          }
          if (awayScoreChange) {
            newHighlights.push(`Goal ${match.awayTeam.name} - ${Math.floor(Math.random() * 90 + 1)}'`);
          }
          
          return { ...match, score: newScore, highlights: newHighlights };
        }
      }
      return match;
    });
    
    setMatches(updatedMatches);
    filterMatches(currentFilter);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateMatchStatus();
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, [matches, currentFilter]);

  useEffect(() => {
    filterMatches(currentFilter);
  }, [matches]);

  return (
    <AppContext.Provider
      value={{
        matches,
        filteredMatches,
        reservations,
        activeTab,
        setActiveTab,
        filterMatches,
        currentFilter,
        addReservation,
        updateMatchStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};