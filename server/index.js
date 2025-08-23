const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const MATCHES_FILE = path.join(DATA_DIR, 'matches.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const TEAMS_FILE = path.join(DATA_DIR, 'teams.json');
const VENUES_FILE = path.join(DATA_DIR, 'venues.json');
const INFO_FILE = path.join(DATA_DIR, 'info.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Helper functions for file operations
const readJsonFile = async (filePath, defaultData = []) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return defaultData;
  }
};

const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Initialize data files with default data
const initializeData = async () => {
  await ensureDataDir();
  
  // Initialize teams
  const defaultTeams = [
    { id: '1', name: 'Brazil', flag: 'https://images.pexels.com/photos/1026421/pexels-photo-1026421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'A' },
    { id: '2', name: 'Argentina', flag: 'https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'A' },
    { id: '3', name: 'Germany', flag: 'https://images.pexels.com/photos/4551288/pexels-photo-4551288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'B' },
    { id: '4', name: 'France', flag: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'B' },
    { id: '5', name: 'Spain', flag: 'https://images.pexels.com/photos/3608311/pexels-photo-3608311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'C' },
    { id: '6', name: 'England', flag: 'https://images.pexels.com/photos/272815/pexels-photo-272815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'C' },
    { id: '7', name: 'Portugal', flag: 'https://images.pexels.com/photos/11361098/pexels-photo-11361098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'D' },
    { id: '8', name: 'Belgium', flag: 'https://images.pexels.com/photos/8378334/pexels-photo-8378334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', group: 'D' }
  ];
  
  const defaultVenues = [
    { id: '1', name: 'Maracanã Stadium', city: 'Rio de Janeiro', capacity: 78838, image: 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: '2', name: 'Lusail Stadium', city: 'Lusail', capacity: 80000, image: 'https://images.pexels.com/photos/243587/pexels-photo-243587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: '3', name: 'Wembley Stadium', city: 'London', capacity: 90000, image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: '4', name: 'Camp Nou', city: 'Barcelona', capacity: 99354, image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
  ];
  
  const defaultMatches = [
    { id: '1', homeTeamId: '1', awayTeamId: '2', date: '2025-06-12', time: '15:00', venueId: '1', stage: 'Group Stage', status: 'upcoming' },
    { id: '2', homeTeamId: '3', awayTeamId: '4', date: '2025-06-13', time: '18:00', venueId: '2', stage: 'Group Stage', status: 'upcoming' },
    { id: '3', homeTeamId: '5', awayTeamId: '6', date: '2025-06-14', time: '20:00', venueId: '3', stage: 'Group Stage', score: { home: 2, away: 1 }, status: 'live', highlights: ['Goal Spain - 23\'', 'Goal England - 45\'', 'Goal Spain - 78\''] },
    { id: '4', homeTeamId: '7', awayTeamId: '8', date: '2025-06-15', time: '17:00', venueId: '4', stage: 'Group Stage', score: { home: 3, away: 2 }, status: 'completed', highlights: ['Goal Portugal - 15\'', 'Goal Belgium - 25\'', 'Goal Portugal - 40\'', 'Goal Belgium - 65\'', 'Goal Portugal - 88\''] }
  ];
  
  const defaultInfo = [
    { id: '1', title: 'Tournament Rules', content: 'The World Cup follows the standard FIFA rules for international competitions. The tournament consists of a group stage followed by knockout rounds.', category: 'rules' },
    { id: '2', title: 'Participating Teams', content: 'This World Cup features 32 teams from around the globe, divided into 8 groups of 4 teams each.', category: 'teams' },
    { id: '3', title: 'Stadium Information', content: 'The tournament will be hosted across 8 state-of-the-art stadiums in various cities.', category: 'venues' },
    { id: '4', title: 'World Cup History', content: 'The FIFA World Cup is the most prestigious soccer tournament in the world.', category: 'history' },
    { id: '5', title: 'Ticketing FAQ', content: 'Tickets for matches can be purchased through our official website or authorized resellers.', category: 'faq' }
  ];
  
  // Write default data if files don't exist
  const teams = await readJsonFile(TEAMS_FILE, defaultTeams);
  if (teams.length === 0) await writeJsonFile(TEAMS_FILE, defaultTeams);
  
  const venues = await readJsonFile(VENUES_FILE, defaultVenues);
  if (venues.length === 0) await writeJsonFile(VENUES_FILE, defaultVenues);
  
  const matches = await readJsonFile(MATCHES_FILE, defaultMatches);
  if (matches.length === 0) await writeJsonFile(MATCHES_FILE, defaultMatches);
  
  const info = await readJsonFile(INFO_FILE, defaultInfo);
  if (info.length === 0) await writeJsonFile(INFO_FILE, defaultInfo);
  
  const reservations = await readJsonFile(RESERVATIONS_FILE, []);
  if (reservations.length === 0) await writeJsonFile(RESERVATIONS_FILE, []);
};

// API Routes

// Get all teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await readJsonFile(TEAMS_FILE, []);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get all venues
app.get('/api/venues', async (req, res) => {
  try {
    const venues = await readJsonFile(VENUES_FILE, []);
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// Get all matches with populated team and venue data
app.get('/api/matches', async (req, res) => {
  try {
    const matches = await readJsonFile(MATCHES_FILE, []);
    const teams = await readJsonFile(TEAMS_FILE, []);
    const venues = await readJsonFile(VENUES_FILE, []);
    
    const populatedMatches = matches.map(match => {
      const homeTeam = teams.find(t => t.id === match.homeTeamId);
      const awayTeam = teams.find(t => t.id === match.awayTeamId);
      const venue = venues.find(v => v.id === match.venueId);
      
      return {
        ...match,
        homeTeam,
        awayTeam,
        venue: venue?.name || 'Unknown Venue'
      };
    });
    
    res.json(populatedMatches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Get match by ID
app.get('/api/matches/:id', async (req, res) => {
  try {
    const matches = await readJsonFile(MATCHES_FILE, []);
    const teams = await readJsonFile(TEAMS_FILE, []);
    const venues = await readJsonFile(VENUES_FILE, []);
    
    const match = matches.find(m => m.id === req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    const homeTeam = teams.find(t => t.id === match.homeTeamId);
    const awayTeam = teams.find(t => t.id === match.awayTeamId);
    const venue = venues.find(v => v.id === match.venueId);
    
    const populatedMatch = {
      ...match,
      homeTeam,
      awayTeam,
      venue: venue?.name || 'Unknown Venue'
    };
    
    res.json(populatedMatch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch match' });
  }
});

// Update match (for live scores and status)
app.put('/api/matches/:id', async (req, res) => {
  try {
    const matches = await readJsonFile(MATCHES_FILE, []);
    const matchIndex = matches.findIndex(m => m.id === req.params.id);
    
    if (matchIndex === -1) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    matches[matchIndex] = { ...matches[matchIndex], ...req.body };
    await writeJsonFile(MATCHES_FILE, matches);
    
    res.json(matches[matchIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update match' });
  }
});

// Get all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await readJsonFile(RESERVATIONS_FILE, []);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Create new reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservations = await readJsonFile(RESERVATIONS_FILE, []);
    const newReservation = {
      id: uuidv4(),
      ...req.body,
      confirmed: true,
      createdAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    await writeJsonFile(RESERVATIONS_FILE, reservations);
    
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Get reservation by ID
app.get('/api/reservations/:id', async (req, res) => {
  try {
    const reservations = await readJsonFile(RESERVATIONS_FILE, []);
    const reservation = reservations.find(r => r.id === req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
});

// Delete reservation
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    const reservations = await readJsonFile(RESERVATIONS_FILE, []);
    const filteredReservations = reservations.filter(r => r.id !== req.params.id);
    
    if (reservations.length === filteredReservations.length) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    await writeJsonFile(RESERVATIONS_FILE, filteredReservations);
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

// Get general information
app.get('/api/info', async (req, res) => {
  try {
    const info = await readJsonFile(INFO_FILE, []);
    const { category } = req.query;
    
    if (category && category !== 'all') {
      const filteredInfo = info.filter(item => item.category === category);
      return res.json(filteredInfo);
    }
    
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch information' });
  }
});

// Simulate live match updates
const simulateLiveUpdates = async () => {
  try {
    const matches = await readJsonFile(MATCHES_FILE, []);
    let updated = false;
    
    const updatedMatches = matches.map(match => {
      if (match.status === 'live') {
        // Simulate random score changes (10% chance)
        if (Math.random() < 0.1) {
          const currentScore = match.score || { home: 0, away: 0 };
          const homeScoreChange = Math.random() > 0.5 ? 1 : 0;
          const awayScoreChange = Math.random() > 0.5 ? 1 : 0;
          
          if (homeScoreChange || awayScoreChange) {
            const newScore = {
              home: currentScore.home + homeScoreChange,
              away: currentScore.away + awayScoreChange
            };
            
            let newHighlights = [...(match.highlights || [])];
            if (homeScoreChange) {
              newHighlights.push(`Goal ${match.homeTeamId} - ${Math.floor(Math.random() * 90 + 1)}'`);
            }
            if (awayScoreChange) {
              newHighlights.push(`Goal ${match.awayTeamId} - ${Math.floor(Math.random() * 90 + 1)}'`);
            }
            
            updated = true;
            return { ...match, score: newScore, highlights: newHighlights };
          }
        }
      }
      return match;
    });
    
    if (updated) {
      await writeJsonFile(MATCHES_FILE, updatedMatches);
      console.log('Live match data updated');
    }
  } catch (error) {
    console.error('Error updating live matches:', error);
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
const startServer = async () => {
  await initializeData();
  
  // Start live updates simulation every 30 seconds
  setInterval(simulateLiveUpdates, 30000);
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });
};

startServer().catch(console.error);