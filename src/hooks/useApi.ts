import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useApiData = <T>(
  apiCall: () => Promise<{ data?: T; error?: string }>,
  dependencies: any[] = []
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
  }, dependencies);

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

export const useMatches = () => {
  return useApiData(() => apiService.getMatches(), []);
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