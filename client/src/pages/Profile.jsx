import React, { useContext, useEffect, useState } from 'react';
import http from '../http';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../contexts/UserContext';
import { Container, Typography, CircularProgress } from '@mui/material';

function Profile() {
  const { user } = useContext(UserContext);
  const [highScore, setHighScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      http.get(`/users/${user.id}`).then((res) => {
        setHighScore(res.data.highScore);
        setUserData(res.data);
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
        Profile
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        <Typography component="span" sx={{ fontWeight: 'bold' }}>Username:</Typography> {userData.username}
      </Typography>
      <Typography variant="body1">
        <Typography component="span" sx={{ fontWeight: 'bold' }}>Email:</Typography> {userData.email}
      </Typography>
      <Typography variant="body1">
        <Typography component="span" sx={{ fontWeight: 'bold' }}>High Score:</Typography> {highScore}
      </Typography>
    </Container>
  );
}

export default Profile;