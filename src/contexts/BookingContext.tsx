import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';

interface BookingContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  bookings: string[];
  addBooking: (booking: string) => void;
  removeBooking: (booking: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = 'service';

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // Step 1: Load token from localStorage if available
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    } else {
      getNewToken();
    }
  }, []);

  // Step 2: Fetch new token from API and store
  const getNewToken = async () => {
    try {
      const res = await axios.post('https://liveupturf.duckdns.org/api/generate-token');
      const newToken = res.data.token;
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    } catch (err) {
      console.error('Failed to get new token:', err);
    }
  };

  // Step 3: Fetch bookings with valid token
  const fetchBookings = async (jwt: string) => {
    try {
      const res = await axios.get('https://liveupturf.duckdns.org/booking', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const parsed = res.data.map((booking: any) => {
        const date = new Date(booking.bookingDate).toDateString();
        const hour = parseInt(booking.startTime.split(':')[0], 10);
        return `${date}-${hour}`;
      });

      setBookings(parsed);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        console.warn('Token expired. Fetching new token...');
        await getNewToken(); // this sets new token, and retriggers useEffect
      } else {
        console.error('Failed to fetch bookings:', err);
      }
    }
  };

  // Step 4: Reactively fetch bookings when token changes
  useEffect(() => {
    if (token) {
      fetchBookings(token);
    }
  }, [token]);

  const addBooking = (booking: string) => {
    setBookings((prev) => [...prev, booking]);
  };

  const removeBooking = (booking: string) => {
    setBookings((prev) => prev.filter((b) => b !== booking));
  };

  return (
    <BookingContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        bookings,
        addBooking,
        removeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};
