import { BookingProvider } from './contexts/BookingContext';
import MainLayout from './components/Layout/MainLayout';
import BookingPage from './pages/BookingPage';


function App() {
  return (
    <BookingProvider>
      <MainLayout>
        <BookingPage />
      </MainLayout>
    </BookingProvider>
  );
}

export default App;