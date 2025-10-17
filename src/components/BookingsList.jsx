import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

//displays all booked rooms
export default function BookingsList({ bookings, onCancel }) {
  // If there are no bookings
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
        {/* Heading with total number of bookings */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Your Bookings ({bookings.length})
        </Typography>

        {/* List all bookings */}
        {bookings.map((booking) => (
          <Box
            key={booking.id} //unique key
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
            {/* Booking details */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {booking.name} {/* Room name */}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                ${booking.price}/night • {booking.capacity} guests {/* Price and capacity */}
              </Typography>
            </Box>

            {/* Button to cancel the booking */}
            <Button
              onClick={() => onCancel(booking.id)} // Call parent function to remove booking
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
