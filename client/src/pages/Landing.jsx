import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Landing = () => {
  const [section, setSection] = useState(1);

  const handleNextSection = (nextSection) => {
    setSection(nextSection);
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
      {section === 1 && (
        <Box>
          <Typography variant="h2" gutterBottom>
            Invest Academy
          </Typography>
          <Button variant="contained" size="large" onClick={() => handleNextSection(2)}>
            Get Started
          </Button>
        </Box>
      )}
      {section === 2 && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Are you new to investing?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" size="large" onClick={() => window.location.href = '/learning-mode'}>
              Yes, I’d like to learn the basics
            </Button>
            <Button variant="contained" size="large" onClick={() => handleNextSection(3)}>
              No, I know the basic concepts
            </Button>
          </Box>
        </Box>
      )}
      {section === 3 && (
        <Box>
          <Typography variant="h4" gutterBottom>
            What kind of learning experience would you prefer?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" size="large" onClick={() => window.location.href = '/guided-trading'}>
              Something simple to get started
            </Button>
            <Button variant="contained" size="large" onClick={() => window.location.href = '/real-life-scenario'}>
              I’d like a challenge
            </Button>
            <Button variant="contained" size="large" onClick={() => window.location.href = '/ai-trading-mode'}>
              Surprise me
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Landing;
