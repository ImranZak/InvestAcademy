import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchRealLifeScenariosData } from '../api'; // Import the API function

const RealLifeScenario = () => {
  const [scenarioData, setScenarioData] = useState([]);

  useEffect(() => {
    fetchRealLifeScenariosData().then(data => setScenarioData(data)).catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Real-Life Scenario
      </Typography>
      <ul>
        {scenarioData.map((scenario, index) => (
          <li key={index}>{scenario.stock}: ${scenario.price}</li>
        ))}
      </ul>
    </Container>
  );
};

export default RealLifeScenario;
