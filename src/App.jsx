import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Container, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { UserContext } from './context/UserContext.js';
import { bookingReducer } from './reducers/BookingReducer.js';
import FilterSection from './components/FilterSection';
import RoomList from './components/RoomList';
import BookingsList from './components/BookingsList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default function BookingApp() {
  const [rooms, setRooms] = useState([]);
  const [bookings, dispatch] = useReducer(bookingReducer, []);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ date: '', priceRange: 'all' });
  const [userPrefs] = useState({ currency: 'USD', language: 'EN' });

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        const roomsData = data.slice(0, 6).map((user, index) => ({
          id: user.id,
          name: `Room ${user.id}`,
          type: ['Deluxe', 'Standard', 'Suite'][index % 3],
          price: Math.floor(Math.random() * 200) + 80,
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

  const handleBookRoom = useCallback((room) => {
    dispatch({
      type: 'ADD_BOOKING',
      payload: room
    });
  }, []);

    const handleCancelBooking = useCallback((roomId) => {
    dispatch({
      type: 'REMOVE_BOOKING',
      payload: roomId
    });
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ prefs: userPrefs }}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 3 }}>
          <Container maxWidth="md">
            <Box sx={{ mb: 3 }}>
              <h1 style={{ margin: 0, fontSize: '28px', color: '#333' }}>Hotel Booking</h1>
            </Box>

            <FilterSection onFilterChange={setFilters} />

            <Box sx={{ mb: 3, mt: 3 }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#333' }}>Available Rooms</h2>
            </Box>

            <RoomList
              rooms={rooms}
              onBook={handleBookRoom}
              bookings={bookings}
              loading={loading}
              filters={filters}
            />

            <BookingsList bookings={bookings} onCancel={handleCancelBooking} />
          </Container>
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  );
}