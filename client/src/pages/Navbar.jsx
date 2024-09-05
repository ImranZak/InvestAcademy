import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ onDebug }) => {
  return (
    <AppBar 
      position="static"
      sx={{
        backgroundColor: '#002d5e',  // Dark blue background
        padding: '0.5rem',           // Add padding to adjust height
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: '2rem' }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>
          InvestAcademy
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: '1.5rem' }}>
          <Button color="inherit" component={Link} to="/" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Home</Button>
          <Button color="inherit" component={Link} to="/learning-mode" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Course</Button>
          <Button color="inherit" component={Link} to="/leaderboard" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Leaderboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
