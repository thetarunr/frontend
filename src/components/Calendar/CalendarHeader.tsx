import React from 'react';

const CalendarHeader: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="grid grid-cols-7 gap-1 p-4 border-b border-gray-100">
      {days.map((day) => (
        <div key={day} className="h-10 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-500">{day}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;