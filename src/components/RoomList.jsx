// src/components/RoomList.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import RoomCard from "./RoomCard";

export default function RoomList({ rooms, onBook, loading }) {
  if (loading) {
    return <Box sx={{ textAlign: "center", py: 6 }}>Loading...</Box>;
  }
  if (!rooms || rooms.length === 0) {
    return <Box sx={{ textAlign: 'center', py: 4 }}><Typography>No rooms available</Typography></Box>;
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} onBook={onBook} />
      ))}
    </Box>
  );
}
