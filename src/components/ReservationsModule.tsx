import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Match } from '../types';
import { Check } from 'lucide-react';

const ReservationsModule: React.FC = () => {
  const { matches, reservations, addReservation } = useApp();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    seats: 1,
    section: 'A'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Filter only upcoming matches for reservations
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMatch) return;
    
    addReservation({
      matchId: selectedMatch.id,
      name: formData.name,
      email: formData.email,
      seats: formData.seats,
      section: formData.section as 'A' | 'B' | 'C' | 'VIP'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      seats: 1,
      section: 'A'
    });
    setSelectedMatch(null);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'seats' ? parseInt(value) : value
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Seat Reservations</h2>
      
      {showSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2" />
          <span>Reservation successfully completed!</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Available Matches</h3>
            
            {upcomingMatches.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No upcoming matches available for reservation
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingMatches.map(match => (
                  <div 
                    key={match.id}
                    className={`border rounded-md p-3 cursor-pointer transition ${
                      selectedMatch?.id === match.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{match.homeTeam.name} vs {match.awayTeam.name}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(match.date).toLocaleDateString()} • {match.time} • {match.venue}
                        </div>
                      </div>
                      {selectedMatch?.id === match.id && (
                        <Check className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {reservations.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Your Reservations</h3>
              <div className="space-y-4">
                {reservations.map(reservation => {
                  const match = matches.find(m => m.id === reservation.matchId);
                  if (!match) return null;
                  
                  return (
                    <div key={reservation.id} className="border rounded-md p-3 bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{match.homeTeam.name} vs {match.awayTeam.name}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(match.date).toLocaleDateString()} • {match.time}
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">{reservation.seats} {reservation.seats > 1 ? 'seats' : 'seat'}</span> • 
                            Section {reservation.section}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Reserved for</div>
                          <div className="font-medium">{reservation.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Reserve Seats</h3>
            
            {!selectedMatch ? (
              <div className="text-center text-gray-500 py-4">
                Please select a match from the list
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    title="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    title="Enter your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    min="1"
                    max="10"
                    value={formData.seats}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter number of seats"
                    title="Enter number of seats"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label="Section"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="VIP">VIP Section</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition duration-200"
                >
                  Complete Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsModule;