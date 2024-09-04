import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          InvestAcademy
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/guided-trading">Guided Trading</Button>
          <Button color="inherit" component={Link} to="/real-life-scenario">Real Life Scenario</Button>
          <Button color="inherit" component={Link} to="/ai-trading-mode">AI Trading Mode</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
