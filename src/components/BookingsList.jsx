import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

export default function BookingsList({ bookings, onCancel }) {
  if (bookings.length === 0) {
    return (
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
        <Typography variant="body2">No bookings yet</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Your Bookings ({bookings.length})
        </Typography>
        {bookings.map((booking) => (
          <Box
            key={booking.id}
            sx={{
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 1,
              mb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {booking.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                ${booking.price}/night • {booking.capacity} guests
              </Typography>
            </Box>
            <Button
              onClick={() => onCancel(booking.id)}
              variant="outlined"
              color="error"
              size="small"
            >
              Remove
            </Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}