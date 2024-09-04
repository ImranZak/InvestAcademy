import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';

const scenarios = [
  {
    id: 1,
    title: "Scenario 1: Tech Stocks Surge",
    description: "Tech stocks are surging due to new innovations in the AI industry. Stock price has increased by 10%.",
    correctAction: "Buy",
    stockData: "Stock Price: $150.00"
  },
  {
    id: 2,
    title: "Scenario 2: Market Crash",
    description: "Due to unforeseen global events, stock markets are crashing. Stock prices are plummeting by 20%.",
    correctAction: "Sell",
    stockData: "Stock Price: $95.00"
  }
];

const RealLifeScenario = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAction = (action) => {
    setUserAction(action);
    setShowResult(true);
  };

  const handleNextScenario = () => {
    setCurrentScenario((prev) => Math.min(prev + 1, scenarios.length - 1));
    setUserAction(null);
    setShowResult(false);
  };

  const { title, description, correctAction, stockData } = scenarios[currentScenario];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Real-Life Stock Scenarios
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{title}</Typography>
          <Typography variant="body1" paragraph>{description}</Typography>
          <Typography variant="body2" paragraph><strong>{stockData}</strong></Typography>

          {showResult ? (
            <Typography variant="h6" color={userAction === correctAction ? "green" : "red"}>
              {userAction === correctAction ? "Correct!" : "Wrong Action"}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 4 }}>
              <Button variant="contained" color="primary" onClick={() => handleAction("Buy")}>
                Buy
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleAction("Sell")}>
                Sell
              </Button>
            </Box>
          )}

          {showResult && (
            <Box sx={{ marginTop: 4 }}>
              <Button variant="contained" onClick={handleNextScenario}>
                Next Scenario
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default RealLifeScenario;
