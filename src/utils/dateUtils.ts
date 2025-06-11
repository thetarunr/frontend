export const getMonthName = (monthIndex: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

export const getDayName = (dayIndex: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFormattedDate = (date: Date, short: boolean = false): string => {
  if (short) {
    return `${date.getDate()} ${getMonthName(date.getMonth()).substring(0, 3)}`;
  }
  
  return `${getDayName(date.getDay())}, ${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getNextNDays = (startDate: Date, n: number): Date[] => {
  const days: Date[] = [];
  for (let i = 0; i < n; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push(date);
  }
  return days;
};

export const formatTimeToAmPm = (hour: number): string => {
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? 'AM' : 'PM';
  return `${formattedHour}:00 ${period}`;
};