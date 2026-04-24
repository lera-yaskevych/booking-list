import { BookingTable } from './components/BookingTable';
import { mockBookings } from './data/mockBookings';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Booking Management System</h1>
        <p>View, sort, and filter your bookings</p>
      </header>
      <main>
        <BookingTable data={mockBookings} />
      </main>
    </div>
  );
}

export default App;
