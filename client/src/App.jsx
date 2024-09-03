import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          {/* Landing page with multi-section support */}
          <Route path="/" element={<Landing />} />
          {/* Add more routes as needed */}
          {/* You can add more routes here when you create new components */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
