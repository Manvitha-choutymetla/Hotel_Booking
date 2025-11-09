// src/components/BookingsList.jsx
import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export default function BookingsList({ bookings, onCancel, rooms }) {
  if (!bookings || bookings.length === 0) {
    return <Box sx={{ mt:3, p:2, backgroundColor:'#e8f0ff', borderRadius:1 }}><Typography>No bookings yet</Typography></Box>;
  }

  const findRoom = (roomId) => rooms.find(r => r.id === roomId) || { name: "Unknown", price: 0, capacity: 0 };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Your Bookings ({bookings.length})
        </Typography>
        {bookings.map(b => {
          const room = findRoom(b.roomId);
          return (
            <Box key={b.id} sx={{ p:2, border:'1px solid #ddd', borderRadius:1, mb:1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>{room.name}</Typography>
                <Typography variant="caption">${room.price}/night • {room.capacity} guests</Typography>
              </Box>
              <Button variant="outlined" color="error" size="small" onClick={() => onCancel(b.id)}>Remove</Button>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
}
