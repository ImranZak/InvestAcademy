import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Landing from './pages/Landing';
import LearningMode from './pages/LearningMode';
import GuidedTrading from './pages/GuidedTrading';
import RealLifeScenario from './pages/RealLifeScenario';
import AITradingMode from './pages/AITradingMode';
import Dashboard from './pages/Dashboard'; // Ensure you have a Dashboard page
import { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary'; // Import error boundary if needed

const theme = createTheme({
  palette: {
    mode: 'light', // light mode to ensure visibility
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f4f4', // Light background for better contrast
      paper: '#ffffff',   // Paper background
    },
    text: {
      primary: '#000000', // Ensure primary text is black
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000', // Black text for buttons
        },
      },
    },
  },
});

function App() {
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setHasVisited(true);
    }
  }, []);

  const handleChoice = () => {
    localStorage.setItem('hasVisited', 'true');
    setHasVisited(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Router basename="/InvestAcademy">
          <Container>
            <Routes>
              <Route path="/" element={hasVisited ? <Navigate to="/dashboard" /> : <Landing onChoice={handleChoice} />} />
              <Route path="/learning-mode" element={<LearningMode />} />
              <Route path="/guided-trading" element={<GuidedTrading />} />
              <Route path="/real-life-scenario" element={<RealLifeScenario />} />
              <Route path="/ai-trading-mode" element={<AITradingMode />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
