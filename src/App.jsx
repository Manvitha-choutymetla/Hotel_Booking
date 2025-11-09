// src/App.jsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import BookingApp from "./BookingApp.jsx";
import { Box, Button } from "@mui/material";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();

  // Listen for login/logout changes
  useEffect(() => {
    const stop = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => stop();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    nav("/"); // go back to login
  };

  if (loading) {
    return <div style={{ padding: 40 }}>Checking login...</div>;
  }

  return (
    <>
      {/* Show Logout button only when logged in */}
      {loggedIn && (
        <Box sx={{ p: 2, textAlign: "right", background: "#0b1e39" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Box>
      )}

      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/booking" /> : <Login />}
        />
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/booking" /> : <Signup />}
        />
        <Route
          path="/booking"
          element={loggedIn ? <BookingApp /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}
