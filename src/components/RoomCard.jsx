import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';

//rendering individual room details and booking button
export default function RoomCard({ room, onBook, isAvailable }) {
  if (!room) return null; // Skip rendering if room data is missing

  return (
    <Card
      sx={{
        opacity: isAvailable ? 1 : 0.4, // Fade out if room is unavailable
        filter: isAvailable ? 'none' : 'grayscale(100%)', 
        transition: 'all 0.3s', 
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        {/* Room name */}
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          {room.name}
        </Typography>

        {/* Room type */}
        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          {room.type}
        </Typography>

        {/* Price */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Chip label={`$${room.price}/night`} size="small" /> 
          <Chip label={`${room.capacity} guests`} size="small" /> 
        </Box>

        {/* Booking button */}
        <Button
          onClick={() => onBook(room)} // Call booking function when clicked
          disabled={!isAvailable}      // Disable button if room is unavailable
          variant="contained"
          size="small"
          fullWidth
          sx={{ fontWeight: 'bold' }}
        >
          {!isAvailable ? 'Unavailable' : 'Book Now'} {/* Button text changes based on availability */}
        </Button>
      </CardContent>
    </Card>
  );
}
