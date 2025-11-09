// src/BookingApp.jsx
import React, { useEffect, useReducer, useState, useCallback } from "react";
import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { db, auth} from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { UserContext } from "./context/UserContext";
import { bookingReducer } from "./reducers/BookingReducer";
import FilterSection from "./components/FilterSection";
import RoomList from "./components/RoomList";
import BookingsList from "./components/BookingsList";



const theme = createTheme({
  palette: {
    primary: { main: "#0f172a" }, // Navy
    secondary: { main: "#3b82f6" },
    background: { default: "#f4f7fb" },
  },
  typography: { fontFamily: "Inter, Arial, sans-serif" },
});

export default function BookingApp() {
  const [rooms, setRooms] = useState([]);
  const [bookings, dispatch] = useReducer(bookingReducer, []);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ priceRange: "all", date: null });
  const [userPrefs] = useState({ currency: "USD", language: "EN" });

  // Load rooms 
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "rooms"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRooms(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Load bookings for current user 
  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      dispatch({ type: "SET_BOOKINGS", payload: data });
    });
    return () => unsub();
  }, [auth.currentUser]);

  const handleBookRoom = useCallback(async (room) => {
    if (!auth.currentUser) return alert("Please log in first.");
    await addDoc(collection(db, "bookings"), {
      userId: auth.currentUser.uid,
      roomId: room.id,
      bookedAt: new Date(),
    });
  }, []);

  const handleCancelBooking = useCallback(async (bookingId) => {
    await deleteDoc(doc(db, "bookings", bookingId));
  }, []);

  // FILTER ROOMS
  const getFilteredRooms = useCallback(() => {
    const bookedIds = new Set(bookings.map((b) => b.roomId));

    return rooms
      .filter((room) => {
        // Price filter
        const price = room.price ?? 0;
        if (filters.priceRange === "budget" && price > 150) return false;
        if (filters.priceRange === "mid" && (price < 150 || price > 250))
          return false;
        if (filters.priceRange === "luxury" && price <= 250) return false;

        // Date filter
        if (filters.date) {
          const dateStr = filters.date.split("T")[0];
          if (
            !room.availableDates ||
            !room.availableDates.includes(dateStr)
          ) {
            return false;
          }
        }

        return true;
      })
      .map((room) => ({
        ...room,
        isAvailable: !bookedIds.has(room.id),
      }));
  }, [rooms, bookings, filters]);

  const filteredRooms = getFilteredRooms(); 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={{ prefs: userPrefs }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ minHeight: "100vh", py: 4, backgroundColor: "background.default" }}>
            <Container maxWidth="md">
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
                Hotel Booking
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                <FilterSection onFilterChange={setFilters} />
                <DatePicker
                  label="Select Date"
                  value={filters.date ? dayjs(filters.date) : null}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      date: value ? value.toISOString() : null,
                    }))
                  }
                />
              </Box>

              <RoomList
                rooms={filteredRooms}
                onBook={handleBookRoom}
                bookings={bookings}
                loading={loading}
                filters={filters}
              />

              <BookingsList
                bookings={bookings}
                onCancel={handleCancelBooking}
                rooms={rooms}
              />
            </Container>
          </Box>
        </LocalizationProvider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}
