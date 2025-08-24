import { useState, useEffect } from 'react';
<<<<<<< HEAD
// Make sure the path is correct and the file exists
import { apiService } from '../services/api';
// If the file is missing, create src/services/api.ts and export apiService

export const useApiData = <T>(
  apiCall: () => Promise<{ data?: T; error?: string }>,
  dependencies: unknown[] = []
=======
import { apiService } from '../services/api';

export const useApiData = <T>(
  apiCall: () => Promise<{ data?: T; error?: string }>,
  dependencies: any[] = []
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      
      if (result.error) {
        setError(result.error);
      } else {
        setData(result.data || null);
      }
      
      setLoading(false);
    };

    fetchData();
<<<<<<< HEAD
  }, [apiCall, ...dependencies]);
=======
  }, dependencies);
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97

  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    const result = await apiCall();
    
    if (result.error) {
      setError(result.error);
    } else {
      setData(result.data || null);
    }
    
    setLoading(false);
  };

  return { data, loading, error, refetch };
};

<<<<<<< HEAD
export const useMatch = (id: string) => {
  return useApiData(() => apiService.getMatch(id), [id]);
=======
export const useMatches = () => {
  return useApiData(() => apiService.getMatches(), []);
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97
};

export const useReservations = () => {
  return useApiData(() => apiService.getReservations(), []);
};

export const useTeams = () => {
  return useApiData(() => apiService.getTeams(), []);
};

export const useVenues = () => {
  return useApiData(() => apiService.getVenues(), []);
};

export const useInfo = (category?: string) => {
  return useApiData(() => apiService.getInfo(category), [category]);
};