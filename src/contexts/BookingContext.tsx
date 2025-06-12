import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<string[]>([]);

  // Fetch bookings on initial load
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('https://liveupturf.duckdns.org/booking');
        const fetched = res.data;

        const parsed = fetched.map((booking:any ) => {
          const date = new Date(booking.bookingDate).toDateString();
          const hour = parseInt(booking.startTime.split(":")[0], 10);
          return `${date}-${hour}`;
        });

        setBookings(parsed);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, []);

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
