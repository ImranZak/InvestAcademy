import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

<<<<<<< HEAD
const Navbar = ({ onDebug }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

=======
const Navbar = ({}) => {
>>>>>>> main
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
<<<<<<< HEAD
          <Button color="inherit" component={Link} to="/resources" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Resources</Button>
          <Button color="inherit" component={Link} to="/leaderboard" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Leaderboard</Button>
          <Button color="inherit" component={Link} to="/events" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Events</Button>
          <Button color="inherit" component={Link} to="/community" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Community</Button>
          { user ? 
            <>
              <Button color="inherit" onClick={logout} sx={{ color: '#ffffff', fontWeight: 'bold' }}>Logout</Button>
              <Button><Avatar onClick={() => {navigate('/profile')}}></Avatar></Button>
            </>
            :
            <Button color="inherit" component={Link} to="/login" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Login</Button>
          }
=======
          <Button color="inherit" component={Link} to="/guided-trading" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Guided Training</Button>
          <Button color="inherit" component={Link} to="/real-life-scenario" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Real Life Scenario</Button>
          <Button color="inherit" component={Link} to="/casestudies" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Case Studies </Button>
          <Button color="inherit" component={Link} to="/aboutus" sx={{ color: '#ffffff', fontWeight: 'bold' }}>About Us</Button>
>>>>>>> main
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
