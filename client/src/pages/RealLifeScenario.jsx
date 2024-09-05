import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, CardMedia, Button, Box } from '@mui/material';
import IntroToStocksImage from "../assets/images/introtostocks.png";

const scenarios = [
  {
    id: 1,
    title: "Scenario 1: Tech Stocks Surge",
    description: "Tech stocks are surging due to new innovations in the AI industry. Stock price has increased by 10%.",
    stockImage: IntroToStocksImage,
    correctAction: "Buy",
    stockData: "Stock Price: $150.00"
  },
  {
    id: 2,
    title: "Scenario 2: Market Crash",
    description: "Due to unforeseen global events, stock markets are crashing. Stock prices are plummeting by 20%.",
    stockImage: "",
    correctAction: "Sell",
    stockData: "Stock Price: $95.00"
  }
];

const RealLifeScenario = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0); // Track the user's score
  const [showScore, setShowScore] = useState(false); // Determine when to show the final score

  const handleAction = (action) => {
    setUserAction(action);
    setShowResult(true);

    if (action === scenarios[currentScenario].correctAction) {
      setScore(score + 1);
    }
  };

  const handleNextScenario = () => {
    const nextScenario = currentScenario + 1;
    if (nextScenario < scenarios.length) {
      setCurrentScenario(nextScenario);
      setUserAction(null);
      setShowResult(false);
    } else {
      setShowScore(true); // Show the final score when all scenarios are completed
    }
  };

  const { title, description, correctAction, stockData, stockImage } = scenarios[currentScenario];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Real-Life Stock Scenarios
      </Typography>

      {showScore ? (
        <Typography variant="h5">
          You scored {score} out of {scenarios.length}
        </Typography>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Typography variant="body1" paragraph>{description}</Typography>
          </CardContent>

          <CardMedia
            sx={{ height: 140 }}
            image={stockImage} 
            title="real life example"
          />

          <CardActions>
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
                  {currentScenario + 1 < scenarios.length ? 'Next Scenario' : 'View Score'}
                </Button>
              </Box>
            )}
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default RealLifeScenario;
