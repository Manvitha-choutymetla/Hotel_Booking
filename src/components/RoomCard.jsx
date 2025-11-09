// src/components/RoomCard.jsx
import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function RoomCard({ room, onBook }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{room.name || room.type}</Typography>
        <Typography variant="body2">${room.price}/night • {room.capacity} guests</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          disabled={!room.isAvailable}
          onClick={() => onBook(room)}
          fullWidth
        >
          {room.isAvailable ? "Book" : "Unavailable"}
        </Button>
      </CardActions>
    </Card>
  );
}
