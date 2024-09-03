import React from 'react';
import { Container, Typography } from '@mui/material';

const AITradingMode = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AI Trading Mode
      </Typography>
      <Typography variant="body1">
        This section will use AI to simulate random stock prices for trading.
      </Typography>
    </Container>
  );
};

export default AITradingMode;
