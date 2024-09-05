import React, { useState } from 'react';
import { Container, Typography, Button, Box, Slide, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = ({ onChoice }) => {
  const [section, setSection] = useState(1);
  const [checked, setChecked] = useState(true);
  const [direction, setDirection] = useState('up');
  const navigate = useNavigate();

  const handleNextSection = (nextSection) => {
    setChecked(false);
    setDirection('down');
    setTimeout(() => {
      setSection(nextSection);
      setDirection('up');
      setChecked(true);
    }, 700);
  };

  const handleSelection = (path) => {
    onChoice(); // Mark as visited in localStorage
    navigate(path); // Redirect to the chosen path (learning mode, guided trading, etc.)
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      {section === 1 && (
        <Fade in={checked} timeout={1000}>
          <Box>
            <Slide
              direction={direction}
              in={checked}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              style={{ transformOrigin: '50% 60%' }}>
              <Box>
                <Typography variant="h2" gutterBottom>
                  Invest Academy
                </Typography>
                <Button variant="contained" size="large" onClick={() => handleNextSection(2)}>
                  Get Started
                </Button>
              </Box>
            </Slide>
          </Box>
        </Fade>
      )}
      {section === 2 && (
        <Fade in={checked} timeout={1000}>
          <Box>
            <Slide
              direction={direction}
              in={checked}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              style={{ transformOrigin: '50% 60%' }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Are you new to investing?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button variant="contained" size="large" onClick={() => handleSelection('/learning-mode')}>
                    Yes, I’d like to learn the basics
                  </Button>
                  <Button variant="contained" size="large" onClick={() => handleNextSection(3)}>
                    No, I know the basic concepts
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Box>
        </Fade>
      )}
      {section === 3 && (
        <Fade in={checked} timeout={1000}>
          <Box>
            <Slide
              direction={direction}
              in={checked}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              style={{ transformOrigin: '50% 60%' }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  What kind of learning experience would you prefer?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button variant="contained" size="large" onClick={() => handleSelection('/guided-trading')}>
                    Something simple to get started
                  </Button>
                  <Button variant="contained" size="large" onClick={() => handleSelection('/real-life-scenario')}>
                    I’d like a challenge
                  </Button>
                  <Button variant="contained" size="large" onClick={() => handleSelection('/ai-trading-mode')}>
                    Surprise me
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default Landing;
