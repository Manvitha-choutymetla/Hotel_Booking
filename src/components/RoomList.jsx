import React from 'react';
import { Box, Typography } from '@mui/material';  
import RoomCard from './RoomCard';               

export default function RoomList({ rooms, onBook, bookings, filters }) {
  if (!rooms || rooms.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1">No rooms available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
      {rooms.map((room) => {
        if (!room) return null;

        const isBooked = bookings.some(b => b.id === room.id);

        let isAvailable = true;
        if (filters.priceRange === 'budget' && room.price > 150) isAvailable = false;
        if (filters.priceRange === 'mid' && (room.price < 150 || room.price > 250)) isAvailable = false;
        if (filters.priceRange === 'luxury' && room.price <= 250) isAvailable = false;
        if (isBooked) isAvailable = false;

        return (
          <RoomCard
            key={room.id}
            room={room}
            onBook={onBook}
            isAvailable={isAvailable}
          />
        );
      })}
    </Box>
  );
}
