import { Team, Match, Venue, GeneralInfo } from '../types';

export const teams: Team[] = [
  {
    id: '1',
    name: 'Brazil',
    flag: 'https://images.pexels.com/photos/1026421/pexels-photo-1026421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'A'
  },
  {
    id: '2',
    name: 'Argentina',
    flag: 'https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'A'
  },
  {
    id: '3',
    name: 'Germany',
    flag: 'https://images.pexels.com/photos/4551288/pexels-photo-4551288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'B'
  },
  {
    id: '4',
    name: 'France',
    flag: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'B'
  },
  {
    id: '5',
    name: 'Spain',
    flag: 'https://images.pexels.com/photos/3608311/pexels-photo-3608311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'C'
  },
  {
    id: '6',
    name: 'England',
    flag: 'https://images.pexels.com/photos/272815/pexels-photo-272815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'C'
  },
  {
    id: '7',
    name: 'Portugal',
    flag: 'https://images.pexels.com/photos/11361098/pexels-photo-11361098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'D'
  },
  {
    id: '8',
    name: 'Belgium',
    flag: 'https://images.pexels.com/photos/8378334/pexels-photo-8378334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    group: 'D'
  }
];

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Maracanã Stadium',
    city: 'Rio de Janeiro',
    capacity: 78838,
    image: 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Lusail Stadium',
    city: 'Lusail',
    capacity: 80000,
    image: 'https://images.pexels.com/photos/243587/pexels-photo-243587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Wembley Stadium',
    city: 'London',
    capacity: 90000,
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Camp Nou',
    city: 'Barcelona',
    capacity: 99354,
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const matches: Match[] = [
  {
    id: '1',
    homeTeam: teams[0],
    awayTeam: teams[1],
    date: '2025-06-12',
    time: '15:00',
    venue: venues[0].name,
    stage: 'Group Stage',
    status: 'upcoming'
  },
  {
    id: '2',
    homeTeam: teams[2],
    awayTeam: teams[3],
    date: '2025-06-13',
    time: '18:00',
    venue: venues[1].name,
    stage: 'Group Stage',
    status: 'upcoming'
  },
  {
    id: '3',
    homeTeam: teams[4],
    awayTeam: teams[5],
    date: '2025-06-14',
    time: '20:00',
    venue: venues[2].name,
    stage: 'Group Stage',
    score: { home: 2, away: 1 },
    status: 'live',
    highlights: ['Goal Spain - 23\'', 'Goal England - 45\'', 'Goal Spain - 78\'']
  },
  {
    id: '4',
    homeTeam: teams[6],
    awayTeam: teams[7],
    date: '2025-06-15',
    time: '17:00',
    venue: venues[3].name,
    stage: 'Group Stage',
    score: { home: 3, away: 2 },
    status: 'completed',
    highlights: ['Goal Portugal - 15\'', 'Goal Belgium - 25\'', 'Goal Portugal - 40\'', 'Goal Belgium - 65\'', 'Goal Portugal - 88\'']
  },
  {
    id: '5',
    homeTeam: teams[0],
    awayTeam: teams[2],
    date: '2025-06-20',
    time: '15:00',
    venue: venues[0].name,
    stage: 'Quarter-finals',
    status: 'upcoming'
  },
  {
    id: '6',
    homeTeam: teams[1],
    awayTeam: teams[3],
    date: '2025-06-21',
    time: '18:00',
    venue: venues[1].name,
    stage: 'Quarter-finals',
    status: 'upcoming'
  },
  {
    id: '7',
    homeTeam: teams[4],
    awayTeam: teams[6],
    date: '2025-06-22',
    time: '20:00',
    venue: venues[2].name,
    stage: 'Quarter-finals',
    status: 'upcoming'
  },
  {
    id: '8',
    homeTeam: teams[5],
    awayTeam: teams[7],
    date: '2025-06-23',
    time: '17:00',
    venue: venues[3].name,
    stage: 'Quarter-finals',
    status: 'upcoming'
  }
];

export const generalInfo: GeneralInfo[] = [
  {
    id: '1',
    title: 'Tournament Rules',
    content: 'The World Cup follows the standard FIFA rules for international competitions. The tournament consists of a group stage followed by knockout rounds. Teams are awarded 3 points for a win, 1 for a draw, and 0 for a loss in the group stage. The top two teams from each group advance to the knockout stage where matches cannot end in a draw and extra time and penalties may be used to determine a winner.',
    category: 'rules'
  },
  {
    id: '2',
    title: 'Participating Teams',
    content: 'This World Cup features 32 teams from around the globe, divided into 8 groups of 4 teams each. The teams were selected through a rigorous qualification process spanning over two years.',
    category: 'teams'
  },
  {
    id: '3',
    title: 'Stadium Information',
    content: 'The tournament will be hosted across 8 state-of-the-art stadiums in various cities. Each venue has been renovated or built specifically for this event, with capacities ranging from 40,000 to 80,000 spectators.',
    category: 'venues'
  },
  {
    id: '4',
    title: 'World Cup History',
    content: 'The FIFA World Cup is the most prestigious soccer tournament in the world. Held every four years, it brings together the top national teams from around the globe. The first tournament was hosted by Uruguay in 1930, and it has since grown to become the most widely viewed sporting event in the world.',
    category: 'history'
  },
  {
    id: '5',
    title: 'Ticketing FAQ',
    content: 'Tickets for matches can be purchased through our official website or authorized resellers. Prices vary depending on the match and seating category. All tickets are digital and can be accessed through our mobile app.',
    category: 'faq'
  }
];