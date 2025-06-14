import React, { useState } from 'react';
import { generalInfo, venues } from '../data';

const InfoModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Information' },
    { id: 'rules', name: 'Tournament Rules' },
    { id: 'teams', name: 'Teams' },
    { id: 'venues', name: 'Venues' },
    { id: 'history', name: 'History' },
    { id: 'faq', name: 'FAQ' }
  ];
  
  const filteredInfo = activeCategory === 'all' 
    ? generalInfo 
    : generalInfo.filter(info => info.category === activeCategory);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tournament Information</h2>
      
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">General Information</h3>
            
            <div className="space-y-6">
              {filteredInfo.map(info => (
                <div key={info.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h4 className="text-lg font-medium mb-2">{info.title}</h4>
                  <p className="text-gray-700">{info.content}</p>
                </div>
              ))}
              
              {filteredInfo.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  No information available for this category
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {activeCategory === 'venues' || activeCategory === 'all' ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Tournament Venues</h3>
              
              <div className="space-y-4">
                {venues.map(venue => (
                  <div key={venue.id} className="rounded-lg overflow-hidden shadow-sm border">
                    <img 
                      src={venue.image} 
                      alt={venue.name} 
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="font-medium">{venue.name}</h4>
                      <div className="text-sm text-gray-600">
                        {venue.city} • Capacity: {venue.capacity.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-center font-medium mr-2">
                    →
                  </span>
                  <span className="text-gray-700">
                    The tournament features 32 teams from 5 confederations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-center font-medium mr-2">
                    →
                  </span>
                  <span className="text-gray-700">
                    64 matches will be played across 8 stadiums
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-center font-medium mr-2">
                    →
                  </span>
                  <span className="text-gray-700">
                    The final will be held at the Lusail Stadium with a capacity of 80,000
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-center font-medium mr-2">
                    →
                  </span>
                  <span className="text-gray-700">
                    The tournament will last for 28 days
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-center font-medium mr-2">
                    →
                  </span>
                  <span className="text-gray-700">
                    Over 3 million spectators are expected to attend
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModule;