// Check if the hour is during peak time (6:00 PM to 6:00 AM)
export const isPeakHour = (hour: number): boolean => {
  return hour >= 18 || hour < 6;
};

// Calculate the price based on the hour
export const calculatePrice = (hour: number): number => {
  return isPeakHour(hour) ? 799 : 699;
};

// Format the price to Indian Rupees
export const formatPrice = (price: number): string => {
  return `₹${price}`;
};

// Generate a unique booking ID
export const generateBookingId = (): string => {
  return `LU-${Math.floor(100000 + Math.random() * 900000)}`;
};