export interface Team {
  id: string;
  name: string;
  flag: string;
  group: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  venue: string;
  stage: 'Group Stage' | 'Round of 16' | 'Quarter-finals' | 'Semi-finals' | 'Final';
  score?: {
    home: number;
    away: number;
  };
  status: 'upcoming' | 'live' | 'completed';
  highlights?: string[];
}

export interface Reservation {
  id: string;
  matchId: string;
  name: string;
  email: string;
  seats: number;
  section: 'A' | 'B' | 'C' | 'VIP';
  confirmed: boolean;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: number;
  image: string;
}

export interface GeneralInfo {
  id: string;
  title: string;
  content: string;
  category: 'rules' | 'teams' | 'venues' | 'history' | 'faq';
}