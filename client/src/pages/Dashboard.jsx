import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const location = useLocation();
  const headers = location.state?.headers;

  useEffect(() => {
    const updateHighScore = headers?.updateHighScore ?? false;;
    if (updateHighScore) {
      toast.success("High score updated!");
    }
  }, [location]); 

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Guided Trading</Typography>
              <Button component={Link} to="/guided-trading" variant="contained" color="primary">
                Go to Guided Trading
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Real-Life Scenarios</Typography>
              <Button component={Link} to="/real-life-scenario" variant="contained" color="primary">
                Go to Scenarios
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more cards for other features like AI Trading Mode */}
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Dashboard;
