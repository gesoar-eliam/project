import React, { createContext, useState, useEffect } from 'react';
import { Match, Reservation } from '../types';
import { apiService } from '../services/api';
import { useMatches, useReservations } from '../hooks/useApi';

interface AppContextType {
  matches: Match[];
  filteredMatches: Match[];
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filterMatches: (filter: string) => void;
  currentFilter: string;
  addReservation: (reservation: Omit<Reservation, 'id' | 'confirmed'>) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: matches = [], loading: matchesLoading, error: matchesError, refetch: refetchMatches } = useMatches();
  const { data: reservations = [], loading: reservationsLoading, error: reservationsError, refetch: refetchReservations } = useReservations();
  
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentFilter, setCurrentFilter] = useState('all');
  
  const loading = matchesLoading || reservationsLoading;
  const error = matchesError || reservationsError;

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
  const addReservation = async (reservation: Omit<Reservation, 'id' | 'confirmed'>) => {
    try {
      await apiService.createReservation(reservation);
      refetchReservations();
    } catch (error) {
      console.error('Failed to create reservation:', error);
    }
  };

<<<<<<< HEAD
  // Function to simulate real-time updates (for demo purposes)
  const updateMatchStatus = React.useCallback(() => {
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
          
          const newHighlights = [...(match.highlights || [])];
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
  }, [matches, currentFilter, filterMatches]);
=======
  // Function to refresh all data
  const refreshData = () => {
    refetchMatches();
    refetchReservations();
  };
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(interval);
<<<<<<< HEAD
  }, [matches, currentFilter, updateMatchStatus]);
=======
  }, []);
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97

  // Update filtered matches when matches change
  useEffect(() => {
    filterMatches(currentFilter);
  }, [matches, currentFilter, filterMatches]);

  return (
    <AppContext.Provider
      value={{
        matches,
        filteredMatches,
        reservations,
        loading,
        error,
        activeTab,
        setActiveTab,
        filterMatches,
        currentFilter,
        addReservation,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// useApp hook moved to a separate file for Fast Refresh compatibility.