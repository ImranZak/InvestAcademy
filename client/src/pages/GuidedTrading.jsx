import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchGuidedTradingData } from '../api'; // Import the API function

const GuidedTrading = () => {
  const [tradingData, setTradingData] = useState([]);

  useEffect(() => {
    fetchGuidedTradingData().then(data => setTradingData(data)).catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Guided Trading Feature
      </Typography>
      <ul>
        {tradingData.map((data, index) => (
          <li key={index}>{data.stock}: ${data.price}</li>
        ))}
      </ul>
    </Container>
  );
};

export default GuidedTrading;
