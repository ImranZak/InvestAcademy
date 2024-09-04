import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchAIModeData } from '../api'; // Import the API function

const AITradingMode = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchAIModeData().then(data => setStockData(data)).catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AI Trading Mode
      </Typography>
      <ul>
        {stockData.map((stock, index) => (
          <li key={index}>{stock.stock}: ${stock.price}</li>
        ))}
      </ul>
    </Container>
  );
};

export default AITradingMode;
