import React, { useState, useCallback } from 'react';
import { Card, TextField, Button, Box, MenuItem } from '@mui/material';

export default function FilterSection({ onFilterChange }) {
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const handleApplyFilters = useCallback(() => {
    onFilterChange({ date, priceRange });
  }, [date, priceRange, onFilterChange]);

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          type="date"
          label="Check-in Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
          sx={{ width: '150px' }}
        />

        <TextField
          select
          label="Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          size="small"
          sx={{ width: '140px' }}
        >
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="budget">Budget ($100-150)</MenuItem>
          <MenuItem value="mid">Mid-Range ($150-250)</MenuItem>
          <MenuItem value="luxury">Luxury ($250+)</MenuItem>
        </TextField>

        <Button
          onClick={handleApplyFilters}
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