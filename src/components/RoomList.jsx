import React from 'react';
import { Box, Typography } from '@mui/material';  
import RoomCard from './RoomCard';               

// list of rooms 
export default function RoomList({ rooms, onBook, bookings, filters }) {

  // If no rooms are available
  if (!rooms || rooms.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1">No rooms available</Typography>
      </Box>
    );
  }

  // Rendering all rooms
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
      {rooms.map((room) => {
        if (!room) return null; 

        // Check if the current room is already booked
        const isBooked = bookings.some(b => b.id === room.id);

        // Determine availability based on filters
        let isAvailable = true;
        if (filters.priceRange === 'budget' && room.price > 150) isAvailable = false;
        if (filters.priceRange === 'mid' && (room.price < 150 || room.price > 250)) isAvailable = false;
        if (filters.priceRange === 'luxury' && room.price <= 250) isAvailable = false;
        if (isBooked) isAvailable = false;

        // Render individual RoomCard with booking status
        return (
          <RoomCard
            key={room.id}       
            room={room}         // Passing room data to RoomCard
            onBook={onBook}     // Passing booking function to RoomCard
            isAvailable={isAvailable} // Pass availability status
          />
        );
      })} 
    </Box>
  );
}
