import React from 'react';
import logo from "../../dist/assets/LEVEL UP TURF-1.png";
const Header: React.FC = () => {
  return (
    <header className="bg-black shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <img
  src={logo}
  alt="Level Up Turf Logo"
  className="h-14 w-auto border-none"
/>

            <div className="font-bold text-xl md:text-2xl text-white">
              Level <span className="text-green-600">Up</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            
           
            <a href="/gallery" className="text-white hover:text-green-600 transition-colors font-medium">
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