const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Teams
  async getTeams() {
    return this.request('/teams');
  }

  // Venues
  async getVenues() {
    return this.request('/venues');
  }

  // Matches
  async getMatches() {
    return this.request('/matches');
  }

  async getMatch(id: string) {
    return this.request(`/matches/${id}`);
  }

  async updateMatch(id: string, data: any) {
    return this.request(`/matches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Reservations
  async getReservations() {
    return this.request('/reservations');
  }

  async createReservation(reservation: any) {
    return this.request('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservation),
    });
  }

  async getReservation(id: string) {
    return this.request(`/reservations/${id}`);
  }

  async deleteReservation(id: string) {
    return this.request(`/reservations/${id}`, {
      method: 'DELETE',
    });
  }

  // General Information
  async getInfo(category?: string) {
    const endpoint = category ? `/info?category=${category}` : '/info';
    return this.request(endpoint);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();