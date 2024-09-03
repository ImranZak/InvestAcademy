import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LearningMode from './pages/LearningMode';
import GuidedTrading from './pages/GuidedTrading';
import RealLifeScenario from './pages/RealLifeScenario';
import AITradingMode from './pages/AITradingMode';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/learning-mode" element={<LearningMode />} />
          <Route path="/guided-trading" element={<GuidedTrading />} />
          <Route path="/real-life-scenario" element={<RealLifeScenario />} />
          <Route path="/ai-trading-mode" element={<AITradingMode />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
