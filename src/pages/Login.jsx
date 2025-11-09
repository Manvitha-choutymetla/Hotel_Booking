// src/pages/Login.jsx
import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <Box sx={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#f4f7fb" }}>
      <Paper sx={{ p:4, width:360 }}>
        <Typography variant="h5" sx={{ mb:2, textAlign:"center" }}>Login</Typography>

        <TextField fullWidth label="Email" value={email} onChange={e=>setEmail(e.target.value)} sx={{ mb:2 }} />
        <TextField fullWidth label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} sx={{ mb:3 }} />

        <Button variant="contained" fullWidth onClick={login}>Login</Button>

        <Typography sx={{ textAlign:"center", mt:2 }}>
          Don't have an account? <Link to="/signup">Create one</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
