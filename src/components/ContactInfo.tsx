import React from 'react';
import { Phone } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600">
      <div className="flex items-start">
        <Phone className="w-5 h-5 text-green-600 mt-1 mr-3" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Book via Phone</h3>
          <p className="text-gray-600 mb-3">
            To finalize your booking, please contact us directly at:
          </p>
          <a 
            href="tel:+919940767771" 
            className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors flex items-center"
          >
            +91 7200705517<br>
            </br> +91 9952394338
          </a>
          <p className="text-sm text-gray-500 mt-2">
            Our team will confirm your booking and answer any questions you may have.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;