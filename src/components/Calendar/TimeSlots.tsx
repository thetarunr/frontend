import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useBookingContext } from '../../contexts/BookingContext';
import { isPeakHour } from '../../utils/bookingUtils';
import { getNextNDays, getFormattedDate } from '../../utils/dateUtils';

interface TimeSlotsProps {
  view: 'day' | 'week';
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ view }) => {
  const { selectedDate, bookings, setSelectedTime } = useBookingContext();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate time slots from 8 AM to 11 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 23; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? 'AM' : 'PM';
    timeSlots.push(`${formattedHour}:00 ${period}`);
  }

  const renderDayView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {timeSlots.map((slot, index) => {
          const hour = index + 8; // Starting from 8 AM
          const slotKey = `${selectedDate.toDateString()}-${hour}`;
          const isBooked = bookings.includes(slotKey);
          const isPeak = isPeakHour(hour);

          return (
            <div
              key={slot}
              className={`relative p-4 rounded-lg border transition-all ${
                isBooked
                  ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                  : selectedSlot === slotKey
                  ? 'bg-green-50 border-green-500 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-green-400 cursor-pointer'
              }`}
              onClick={() => {
                if (!isBooked) {
                  setSelectedSlot(slotKey);
                  const timeString = `${hour.toString().padStart(2, '0')}:00`;
                  setSelectedTime(timeString);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className={`h-4 w-4 mr-2 ${isPeak ? 'text-indigo-600' : 'text-yellow-500'}`} />
                  <span className="font-medium text-gray-800">{slot}</span>
                </div>
                <span className="text-sm font-medium">
                  {isPeak ? '₹799' : '₹699'}
                </span>
              </div>

              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-800 bg-opacity-70">
                  <span className="text-white font-medium text-sm px-2 py-1 rounded-full bg-red-500">
                    Booked
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const nextDays = getNextNDays(selectedDate, 7);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              {nextDays.map((day) => (
                <th
                  key={day.toDateString()}
                  className="py-2 px-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {getFormattedDate(day, true)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((slot, index) => {
              const hour = index + 8; // Starting from 8 AM
              const isPeak = isPeakHour(hour);

              return (
                <tr key={slot} className="hover:bg-gray-50">
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-2 ${isPeak ? 'text-indigo-600' : 'text-yellow-500'}`} />
                      <span className="font-medium text-gray-800">{slot}</span>
                      <span className="ml-2 text-xs font-medium text-gray-500">
                        {isPeak ? '₹799' : '₹699'}
                      </span>
                    </div>
                  </td>

                  {nextDays.map((day) => {
                    const slotKey = `${day.toDateString()}-${hour}`;
                    const isBooked = bookings.includes(slotKey);

                    return (
                      <td key={slotKey} className="py-2 px-3 whitespace-nowrap">
                        <button
                          className={`w-full py-1 px-2 rounded text-sm font-medium transition-colors focus:outline-none ${
                            isBooked
                              ? 'bg-red-100 text-red-800 cursor-not-allowed'
                              : selectedSlot === slotKey
                              ? 'bg-green-100 text-green-800 border border-green-500'
                              : 'bg-gray-100 text-gray-800 hover:bg-green-50 hover:text-green-700'
                          }`}
                          disabled={isBooked}
                          onClick={() => {
                            setSelectedSlot(slotKey);
                            const timeString = `${hour.toString().padStart(2, '0')}:00`;
                            setSelectedTime(timeString);
                          }}
                        >
                          {isBooked ? 'Booked' : 'Available'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{view === 'day' ? renderDayView() : renderWeekView()}</div>;
};

export default TimeSlots;
