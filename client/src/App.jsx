import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import LearningMode from './pages/LearningMode';
import ModuleQuiz from './components/ModuleQuiz';
import GuidedTrading from './pages/GuidedTrading';
import RealLifeScenario from './pages/RealLifeScenario';
import AITradingMode from './pages/AITradingMode';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CaseStudies from './pages/CaseStudies';
import Dashboard from './pages/Dashboard'; // Ensure you have a Dashboard page
import { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary'; // Import error boundary if needed
import Layout from './Layout'; // Import Layout for pages with Navbar
import http from './http';
import UserContext from './contexts/UserContext';

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
          color: '#ffffff', // Black text for buttons
        },
      },
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function App() {
  const [hasVisited, setHasVisited] = useState(false);
  const [user, setUser] = useState(null);
  const [updateHighScore, setUpdateHighScore] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hasVisited')) {
      setHasVisited(true);
    }
    if (localStorage.getItem("accessToken")) {
      http.get('/authenticate').then((res) => {
        setUser(res.data.user);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const handleChoice = () => {
    localStorage.setItem('hasVisited', 'true');
    setHasVisited(true);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateHighScore, setUpdateHighScore }}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router basename="/InvestAcademy">
            <Container sx={{mt:10}}>
              <Routes>
                {/* Exclude Navbar for Landing page */}
                <Route path="/" element={hasVisited ? <Navigate to="/homepage" /> : <Landing onChoice={handleChoice} />} />

                {/* Pages with Navbar using Layout */}
                <Route element={<Layout />}>
                  <Route path="/homepage" element={<HomePage/>}/>
                  <Route path="/aboutus" element={<AboutUs/>}/>
                  <Route path="/learning-mode" element={<LearningMode />} />
                  <Route path="/module-quiz" element={<ModuleQuiz/>}/>
                  <Route path="/guided-trading" element={<GuidedTrading />} />
                  <Route path="/real-life-scenario" element={<RealLifeScenario />} />
                  <Route path="/ai-trading-mode" element={<AITradingMode />} />
                  <Route path="/casestudies" element={<CaseStudies />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                  {/* Fallback Route */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
