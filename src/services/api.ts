const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

<<<<<<< HEAD
export interface MatchUpdate {
  // Define the properties that can be updated in a match
  // For example:
  date?: string;
  venueId?: string;
  teamAId?: string;
  teamBId?: string;
  scoreA?: number;
  scoreB?: number;
  // Add other fields as needed
}

export interface Reservation {
  // Define the properties of a reservation
  // For example:
  id?: string;
  userId: string;
  venueId: string;
  date: string;
  time: string;
  // Add other fields as needed
}

=======
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97
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

<<<<<<< HEAD
=======
  // Matches
  async getMatches() {
    return this.request('/matches');
  }

>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97
  async getMatch(id: string) {
    return this.request(`/matches/${id}`);
  }

<<<<<<< HEAD
  async updateMatch(id: string, data: MatchUpdate) {
=======
  async updateMatch(id: string, data: any) {
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97
    return this.request(`/matches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

<<<<<<< HEAD
  async createReservation(reservation: Reservation) {
=======
  // Reservations
  async getReservations() {
    return this.request('/reservations');
  }

  async createReservation(reservation: any) {
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97
    return this.request('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservation),
    });
  }
<<<<<<< HEAD
  // Reservations
  async getReservations() {
    return this.request('/reservations');
  }
=======
>>>>>>> 99186b488ca0d2cf44688d1756483479758cff97

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