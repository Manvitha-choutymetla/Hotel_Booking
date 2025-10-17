import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { UserContext } from './context/UserContext.js';
import { bookingReducer } from './reducers/BookingReducer.js';
import FilterSection from './components/FilterSection';
import RoomList from './components/RoomList';
import BookingsList from './components/BookingsList';

//Material-UI
const theme = createTheme({
  palette: {
    primary: { main: '#3b82f6' },
    background: { default: '#f5f5f5' },
  },
  typography: { fontFamily: 'Arial, sans-serif' },
});

//BookingApp component
export default function BookingApp() {
  // State for rooms, bookings, loading status, and filters
  const [rooms, setRooms] = useState([]);
  const [bookings, dispatch] = useReducer(bookingReducer, []);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ date: '', priceRange: 'all' });
  const [userPrefs] = useState({ currency: 'USD', language: 'EN' });

  // Fetch room data on component mount
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        // Transform user data into room objects
        const roomsData = data.slice(0, 6).map((user, index) => ({
          id: user.id,
          name: `Room ${user.id}`,
          type: ['Deluxe', 'Standard', 'Suite'][index % 3],
          price: Math.floor(Math.random() * 200) + 80, // Random price 80-280
          capacity: [2, 3, 4][index % 3],
        }));

        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load rooms:', error);
        setRooms([]);
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // Function to handle booking a room
  const handleBookRoom = useCallback((room) => {
    dispatch({ type: 'ADD_BOOKING', payload: room });
  }, []);

  // Function to handle canceling a booking
  const handleCancelBooking = useCallback((roomId) => {
    dispatch({ type: 'REMOVE_BOOKING', payload: roomId });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ prefs: userPrefs }}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 3 }}>
          <Container maxWidth="md">
            {/* App Header */}
            <Box sx={{ mb: 3 }}>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>Hotel Booking</h1>
            </Box>

            {/* Filter section for rooms */}
            <FilterSection onFilterChange={setFilters} />

            {/* Section title for available rooms */}
            <Box sx={{ mb: 3, mt: 3 }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#333' }}>Available Rooms</h2>
            </Box>

            {/* List of available rooms */}
            <RoomList
              rooms={rooms}
              onBook={handleBookRoom}
              bookings={bookings}
              loading={loading}
              filters={filters}
            />

            {/* List of booked rooms */}
            <BookingsList bookings={bookings} onCancel={handleCancelBooking} />
          </Container>
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  );
}
