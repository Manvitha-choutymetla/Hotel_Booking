import React, { useState, useCallback } from 'react';
import { Card, TextField, Button, Box, MenuItem } from '@mui/material';

//filter rooms by date and price range
export default function FilterSection({ onFilterChange }) {
  //check-in date
  const [date, setDate] = useState('');
  //price range
  const [priceRange, setPriceRange] = useState('all');

   // Pass selected filters to parent
  const handleApplyFilters = useCallback(() => {
    onFilterChange({ date, priceRange }); 
  }, [date, priceRange, onFilterChange]);

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* Date input for check-in */}
        <TextField
          type="date"
          label="Check-in Date"
          value={date}
          onChange={(e) => setDate(e.target.value)} 
          InputLabelProps={{ shrink: true }} // Keep label visible above input
          size="small"
          sx={{ width: '150px' }}
        />

        {/* Select input for price range */}
        <TextField
          select
          label="Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)} 
          size="small"
          sx={{ width: '140px' }}
        >
          {/* Options for price range */}
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="budget">Budget ($100-150)</MenuItem>
          <MenuItem value="mid">Mid-Range ($150-250)</MenuItem>
          <MenuItem value="luxury">Luxury ($250+)</MenuItem>
        </TextField>

        {/* Button to apply filters */}
        <Button
          onClick={handleApplyFilters} // Call filter function
          variant="contained"
          size="small"
          sx={{ height: '40px' }}
        >
          Apply
        </Button>
      </Box>
    </Card>
  );
}
