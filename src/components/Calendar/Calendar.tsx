import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import TimeSlots from './TimeSlots';
import { useBookingContext } from '../../contexts/BookingContext';
import { getFormattedDate, getDaysInMonth, getMonthName } from '../../utils/dateUtils';

const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate } = useBookingContext();
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [view, setView] = useState<'day' | 'week'>('day');

  
  
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };
  
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
    const days = [];
    const today = new Date();
    // Normalize today's date (ignore time)
    today.setHours(0, 0, 0, 0);
  
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
  
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
  
      const isPast = date < today;
  
      days.push(
        <button
          key={day}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors focus:outline-none
            ${isSelected ? 'bg-green-600 text-white font-medium' : ''}
            ${!isSelected && isToday ? 'bg-green-100 text-green-800 font-medium' : ''}
            ${!isSelected && !isToday && !isPast ? 'hover:bg-gray-100' : ''}
            ${isPast ? 'text-gray-400 cursor-not-allowed' : ''}
          `}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
        >
          {day}
        </button>
      );
    }
  
    return days;
  };
  
  
  return (
    <div>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-medium text-gray-800">
            {getMonthName(currentMonth)} {currentYear}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex rounded-md overflow-hidden border border-gray-200">
          <button
            className={`px-3 py-1 text-sm focus:outline-none ${
              view === 'day' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 text-sm focus:outline-none ${
              view === 'week' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setView('week')}
          >
            Week
          </button>
        </div>
      </div>
      
      <CalendarHeader />
      
      <div className="grid grid-cols-7 gap-1 p-4">
        {renderCalendarDays()}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <h3 className="text-md font-medium text-gray-800 mb-4">
          {getFormattedDate(selectedDate)}
        </h3>
        <TimeSlots view={view} />
      </div>
    </div>
  );
};

export default Calendar;