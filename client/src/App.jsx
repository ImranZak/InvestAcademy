import './App.css';
import { Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path={"/"} element={<Landing />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;