import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';

export default function RoomCard({ room, onBook, isAvailable }) {
  if (!room) return null;

  return (
    <Card
      sx={{
        opacity: isAvailable ? 1 : 0.4,
        filter: isAvailable ? 'none' : 'grayscale(100%)',
        transition: 'all 0.3s',
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          {room.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          {room.type}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Chip label={`$${room.price}/night`} size="small" />
          <Chip label={`${room.capacity} guests`} size="small" />
        </Box>

        <Button
          onClick={() => onBook(room)}
          disabled={!isAvailable}
          variant="contained"
          size="small"
          fullWidth
          sx={{ fontWeight: 'bold' }}
        >
          {!isAvailable ? 'Unavailable' : 'Book Now'}
        </Button>
      </CardContent>
    </Card>
  );
}