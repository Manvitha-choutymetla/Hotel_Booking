// src/components/FilterSection.jsx
import React from "react";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function FilterSection({ onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange(prev => ({ ...prev, priceRange: e.target.value }));
  };
  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel>Price Range</InputLabel>
        <Select defaultValue="all" label="Price Range" onChange={handleChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="budget">Budget (&le; $150)</MenuItem>
          <MenuItem value="mid">Mid-range ($150 - $250)</MenuItem>
          <MenuItem value="luxury">Luxury (&gt; $250)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
