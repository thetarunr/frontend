import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Level Up</h3>
            <p className="text-gray-300 mb-4">
              Premium turf facility for cricket and football enthusiasts.
              Book your slot today and level up your game!
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/levelup_turf?igsh=MTAxbzdsdmRybjRidw==" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a> */}
            </div>
          </div>
          
       <div></div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-green-500" />
                <span className="text-gray-300">Vinayagam salai, Lakshmipuram, poonthotam, Velapadi, Vellore, Tamil Nadu 632001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-gray-300">+91 7200705517, +91 9952394338</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-500" />
                <span className="text-gray-300">levelupturf@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Level Up. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;