import { useState, useEffect } from 'react';
// Make sure the path is correct and the file exists
import { apiService } from '../services/api';
// If the file is missing, create src/services/api.ts and export apiService

export const useApiData = <T>(
  apiCall: () => Promise<{ data?: T; error?: string }>,
  dependencies: unknown[] = []
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
  }, [apiCall, ...dependencies]);

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

export const useMatch = (id: string) => {
  return useApiData(() => apiService.getMatch(id), [id]);
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