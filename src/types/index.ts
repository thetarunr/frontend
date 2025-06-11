export interface Booking {
  id: string;
  date: Date;
  hour: number;
  sport: 'cricket' | 'football';
  userId?: string;
  contactName?: string;
  contactPhone?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}