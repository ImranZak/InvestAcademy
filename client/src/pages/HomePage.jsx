import React, { useEffect, useContext } from 'react';
import { Container, Typography, Button, Box, Grid, TextField, IconButton, Card, CardContent, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Feedback, Star, School } from '@mui/icons-material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../contexts/UserContext';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#002d5e' },
    secondary: { main: '#dc004e' },
    background: { default: '#f4f4f4', paper: '#ffffff' },
    text: { primary: '#000000' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

const useStyles = makeStyles({
  heroSection: {
    textAlign: 'center',
    padding: '5rem 0',
    backgroundColor: '#002d5e',
    color: '#ffffff',
  },
  featureCard: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  testimonialCard: {
    padding: '2rem',
    marginBottom: '1rem',
  },
  feedbackForm: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    marginTop: '2rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
});

const HomePage = () => {
  const classes = useStyles();
  const { updateHighScore, setUpdateHighScore } = useContext(UserContext);


  useEffect(() => {
    if (updateHighScore) {
      toast.success("High score updated!");
      setUpdateHighScore(false);
    }
  }, [updateHighScore]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box className={classes.heroSection}>
          <Typography variant="h2" gutterBottom >
            <strong>Welcome to InvestAcademy</strong>
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Master Stock Trading with Our Interactive Learning Modules
          </Typography>
          <Button variant="contained" color="secondary" component={Link} to="/learning-mode">
            Start Your Journey
          </Button>
        </Box>

        {/* Guided Training Section */}
        <Container sx={{ mt: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom color='#002d5e'>
              <strong>Guided Training</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Dive into guided training with interactive case studies and graph visualizations to practice and hone your trading skills.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/guided-trading">
              Explore Guided Training
            </Button>
          </Box>
        </Container>

        {/* Features Overview */}
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className={classes.featureCard}>
                <CardContent>
                  <School color="primary" fontSize="large" />
                  <Typography variant="h6" gutterBottom>
                    Learning Module
                  </Typography>
                  <Typography variant="body2">
                    An introductory course about stocks, designed to teach teenagers the basics with quizzes to reinforce learning.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.featureCard}>
                <CardContent>
                  <HandshakeIcon color="primary" fontSize="large" />
                  <Typography variant="h6" gutterBottom>
                    Guided Training Simulator
                  </Typography>
                  <Typography variant="body2">
                    Designed to enhance users' practical understanding of stock trading through hands-on practice and interactive learning
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.featureCard}>
                <CardContent>
                  <Star color="primary" fontSize="large" />
                  <Typography variant="h6" gutterBottom>
                    Real-life Scenarios
                  </Typography>
                  <Typography variant="body2">
                    Engage with real-life scenarios and graph visualizations. Make decisions based on both real and AI-generated case studies.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
            <strong>What Our Users Say</strong>
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className={classes.testimonialCard}>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    "InvestAcademy transformed my understanding of stock trading with its interactive approach. Highly recommended!"
                  </Typography>
                  <Typography variant="subtitle2" align="right">
                    - Alex, 16
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.testimonialCard}>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    "The guided training module is fantastic. It really helps in applying the concepts in a practical manner."
                  </Typography>
                  <Typography variant="subtitle2" align="right">
                    - Jamie, 17
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Feedback Form */}
        <Container>
          <Box className={classes.feedbackForm}>
            <Typography variant="h4" gutterBottom>
              We Value Your Feedback
            </Typography>
            <Typography variant="body1" paragraph>
              Please let us know how we're doing and how we can improve.
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                label="Name"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Comments"
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit">
                Submit Feedback
              </Button>
            </form>
          </Box>
        </Container>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default HomePage;
