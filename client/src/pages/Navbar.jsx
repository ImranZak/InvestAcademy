import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({}) => {
  return (
    <AppBar 
      position="fixed"
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
          <Button color="inherit" component={Link} to="/homepage" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Home</Button>
          <Button color="inherit" component={Link} to="/learning-mode" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Course</Button>
          <Button color="inherit" component={Link} to="/guided-trading" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Guided Training</Button>
          <Button color="inherit" component={Link} to="/real-life-scenario" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Real Life Scenario</Button>
          <Button color="inherit" component={Link} to="/casestudies" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Case Studies </Button>
          <Button color="inherit" component={Link} to="/aboutus" sx={{ color: '#ffffff', fontWeight: 'bold' }}>About Us</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
