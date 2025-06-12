import React, { useState } from 'react';
import Calendar from '../components/Calendar/Calendar';
import ContactInfo from '../components/ContactInfo';
import { useBookingContext } from '../contexts/BookingContext';
import axios from 'axios';
import * as yup from 'yup';
import toast,{Toaster} from 'react-hot-toast';

// Yup validation schema
const userSchema = yup.object().shape({
  userName: yup.string().min(2, 'Name too short').required('Name is required'),
  userEmail: yup.string().email('Invalid email').required('Email is required'),
  userContact: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
    .required('Contact number is required'),
    
});

const BookingPage: React.FC = () => {
  const { selectedTime, selectedDate, addBooking } = useBookingContext();

  // Form inputs inside popup
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formContact, setFormContact] = useState('');

  // Final user data shown on Booking Summary
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userContact, setUserContact] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const bookingDateISO = selectedDate.toISOString();
  const bookingDateDisplay = selectedDate.toDateString();
  const [startHour] = selectedTime ? selectedTime.split(':') : [''];
  const startTime = `${startHour}:00`;
  const endTime = `${parseInt(startHour) + 1}:00`;

  // Validate form inputs
  const validateUser = async () => {
    try {
      await userSchema.validate(
        { userName: formName, userEmail: formEmail, userContact: formContact },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (validationErrors: any) {
      const formattedErrors: { [key: string]: string } = {};
      validationErrors.inner.forEach((err: any) => {
        if (err.path) formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  // Save form inputs to final user data only if valid
  const handleSave = async () => {
    const isValid = await validateUser();
    if (isValid) {
      setUserName(formName);
      setUserEmail(formEmail);
      setUserContact(formContact);
      setShowPopup(false);
    }
  };

  // Submit booking with validated user data
  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Select both date and time.');
      return;
    }

    if (!userName || !userEmail || !userContact) {
      toast.error('Please enter and save your details first.');
      return;
    }

    const payload = {
      userName,
      userContact,
      userEmail,
      bookingDate: bookingDateISO,
      startTime,
      endTime,
    };

    try {
      await axios.post('https://liveupturf.duckdns.org/booking', payload);
      const key = `${selectedDate.toDateString()}-${parseInt(startHour)}`;
      addBooking(key);
      toast.success('Booking confirmed!');
    } catch (err) {
      toast.error(`Booking failed.`);
    }
  };

  // Open popup and initialize form fields with existing user data
  const openPopup = () => {
    setFormName(userName);
    setFormEmail(userEmail);
    setFormContact(userContact);
    setErrors({});
    setShowPopup(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Book Your Slot</h1>
        <p className="text-gray-600">Select your preferred date and time to book the turf for your game.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <Calendar />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ContactInfo />

          {/* Pricing Info */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span className="text-gray-700">Day Time</span>
                </div>
                <span className="font-medium">₹699/hour</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
                  <span className="text-gray-700">Night Time</span>
                </div>
                <span className="font-medium">₹799/hour</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                <p>Day: 8:00 AM to 5:00 PM</p>
                <p>Night: 6:00 PM to 11:00 AM</p>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedTime && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>

              {!userName || !userEmail || !userContact ? (
                <button
                  onClick={openPopup}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Enter Your Details
                </button>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span>{userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{userEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact:</span>
                      <span>{userContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{bookingDateDisplay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>
                        {startTime} - {endTime}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Book Now
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}

              <input
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
              {errors.userEmail && <p className="text-red-500 text-sm">{errors.userEmail}</p>}

              <input
                type="tel"
                placeholder="Contact"
                className="w-full border px-3 py-2 rounded"
                value={formContact}
                onChange={(e) => setFormContact(e.target.value)}
              />
              {errors.userContact && <p className="text-red-500 text-sm">{errors.userContact}</p>}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default BookingPage;
