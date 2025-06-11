import React, { useState } from 'react';
import { Bath as Bat, Dribbble } from 'lucide-react';

const SportSelector: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<'cricket' | 'football'>('cricket');
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Sport</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
            selectedSport === 'cricket'
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
          }`}
          onClick={() => setSelectedSport('cricket')}
        >
          <Bat 
            className={`h-8 w-8 mb-2 ${
              selectedSport === 'cricket' ? 'text-green-600' : 'text-gray-600'
            }`} 
          />
          <span 
            className={`font-medium ${
              selectedSport === 'cricket' ? 'text-green-800' : 'text-gray-800'
            }`}
          >
            Cricket
          </span>
        </button>
        
        <button
          className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
            selectedSport === 'football'
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
          }`}
          onClick={() => setSelectedSport('football')}
        >
          <Dribbble 
            className={`h-8 w-8 mb-2 ${
              selectedSport === 'football' ? 'text-green-600' : 'text-gray-600'
            }`} 
          />
          <span 
            className={`font-medium ${
              selectedSport === 'football' ? 'text-green-800' : 'text-gray-800'
            }`}
          >
            Football
          </span>
        </button>
      </div>
    </div>
  );
};

export default SportSelector;