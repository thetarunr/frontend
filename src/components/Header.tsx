import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="font-bold text-xl md:text-2xl text-gray-800">
              Level <span className="text-green-600">Up</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            
           
            <a href="/gallery" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Gallery
            </a>
           
          </nav>
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-green-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;