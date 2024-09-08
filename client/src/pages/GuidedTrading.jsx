import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import http from '../http.js'
import UserContext from '../contexts/UserContext';
import { Container, Typography, Card, CardContent, Button, Box, LinearProgress, CircularProgress, CardMedia } from '@mui/material';
import { Fade } from '@mui/material';

// Import images (replace these with the appropriate paths or URLs)
import StockMarketImg from "../assets/images/stock_market.jpg";
import DiversifyImg from "../assets/images/diversify.jpg";
import DividendImg from "../assets/images/dividend.jpg";
import BullMarketImg from "../assets/images/bull_market.jpg";
import ETFImg from "../assets/images/etf.jpg";

const quizQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a stock market?",
    options: [
      "A place to buy and sell bonds",
      "A platform where buyers and sellers trade shares of publicly listed companies",
      "A place where only large corporations invest",
      "A market for real estate"
    ],
    correctAnswer: 1,
    explanation: "A stock market is a platform where buyers and sellers trade shares of publicly listed companies.",
    image: StockMarketImg // Image for this question
  },
  {
    id: 2,
    question: "What does it mean to 'diversify' in stock investments?",
    options: [
      "Buying shares in different industries or sectors to spread risk",
      "Focusing all your investments in a single industry",
      "Selling all your stocks at once",
      "Investing in bonds rather than stocks"
    ],
    correctAnswer: 0,
    explanation: "'Diversify' means spreading risk by buying shares in different industries or sectors.",
    image: DiversifyImg // Image for this question
  },
  {
    id: 3,
    question: "What is a dividend?",
    options: [
      "The profit made from selling a stock",
      "A regular payment made by a company to its shareholders out of its profits",
      "A fee paid when buying stocks",
      "A tax paid on stock earnings"
    ],
    correctAnswer: 1,
    explanation: "A dividend is a regular payment made by a company to its shareholders out of its profits.",
    image: DividendImg // Image for this question
  },
  {
    id: 4,
    question: "Which factor can affect stock prices the most?",
    options: [
      "The performance of the company",
      "Weather conditions",
      "The company’s CEO’s personal life",
      "The number of employees a company has"
    ],
    correctAnswer: 0,
    explanation: "The performance of a company is the most significant factor affecting stock prices.",
    image: StockMarketImg // Image for this question
  },
  {
    id: 5,
    question: "What is meant by a 'bull market'?",
    options: [
      "A market where stock prices are generally rising",
      "A market where stock prices are generally falling",
      "A market focused on agricultural stocks",
      "A market where only new companies are listed"
    ],
    correctAnswer: 0,
    explanation: "A bull market refers to a market where stock prices are generally rising.",
    image: BullMarketImg // Image for this question
  },
  {
    id: 6,
    question: "What is an ETF?",
    options: [
      "Exchange-Traded Fund, a type of security that tracks an index, commodity, or sector",
      "Exclusive Trading Fee charged for international trades",
      "A stock exchange specifically for technology companies",
      "A fund reserved for only the wealthiest investors"
    ],
    correctAnswer: 0,
    explanation: "An ETF is an Exchange-Traded Fund that tracks an index, commodity, or sector.",
    image: ETFImg // Image for this question
  },
  {
    id: 7,
    question: "What is the primary role of a financial advisor?",
    options: [
      "To manage all your stock trades",
      "To provide advice on investments, savings, and financial planning",
      "To give loans to investors",
      "To regulate the stock market"
    ],
    correctAnswer: 1,
    explanation: "A financial advisor provides advice on investments, savings, and financial planning."
    // No image for this question
  },
  {
    id: 8,
    question: "What does IPO stand for?",
    options: [
      "International Price Offering",
      "Initial Public Offering",
      "Internal Private Offering",
      "Income Percentage Output"
    ],
    correctAnswer: 1,
    explanation: "IPO stands for Initial Public Offering, which is when a company first sells its shares to the public."
    // No image for this question
  },
  {
    id: 9,
    question: "Which of the following is a characteristic of a bear market?",
    options: [
      "Rising stock prices",
      "Falling stock prices",
      "Stable stock prices",
      "Increasing stock demand"
    ],
    correctAnswer: 1,
    explanation: "A bear market is characterized by falling stock prices."
    // No image for this question
  },
  {
    id: 10,
    question: "What is a bond?",
    options: [
      "A loan made by an investor to a borrower",
      "A share in a company",
      "A contract for stock trading",
      "A type of insurance policy"
    ],
    correctAnswer: 0,
    explanation: "A bond is essentially a loan made by an investor to a borrower, often a corporation or government."
    // No image for this question
  }
];

const GuidedTrading = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isHighScore, setIsHighScore] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setScore(6);
    setCurrentQuestion(9);
  }, []);

  const handleSubmitAnswer = () => {
    setSubmitted(true);
    if (selectedOption === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! ' + shuffledQuestions[currentQuestion].explanation);
    } else {
      setFeedback('Incorrect. ' + shuffledQuestions[currentQuestion].explanation);
    }
  };

  const handleNextAfterFeedback = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setSubmitted(false);
      setFeedback(''); // Clear feedback for next question
    } else {
      setShowScore(true);
      if (user) {
        http.get(`/users/${user.id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.user.highScore < score) {
              setIsHighScore(true);
              http.put(`/users/${user.id}`, { highScore: score })
                .then((res) => {
                  console.log(res.data); 
                })
                .catch(function (err) {
                  console.error(err)
                  toast.error(`${err.response.data.message}`);
                });
            }
          })
          .catch(function (err) {
            console.error(err)
            toast.error(`${err.response.data.message}`);
          });
      }
    }
  };


  const handleSaveScore = () => {
    localStorage.setItem('highScore', score);
    navigate('/login');
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setSubmitted(false);
    setFeedback('');
    setScore(0);
    setShowScore(false);
  };

  if (shuffledQuestions.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography sx={{ mt: 12 }} variant="h4" gutterBottom align="center">
        Financial Literacy Quiz
      </Typography>

      <LinearProgress
        variant="determinate"
        value={((currentQuestion + 1) / shuffledQuestions.length) * 100}
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="body2" color="textSecondary" align="center">
        Question {currentQuestion + 1} of {shuffledQuestions.length}
      </Typography>

      {showScore ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
          <Box sx={{ mt: 21, textAlign: 'center', padding: 2, border: '1px solid gray', borderRadius: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" component="div">
              You scored
            </Typography>
            <Typography variant="h3" component="div">
              {score} / {shuffledQuestions.length}
            </Typography>
            <Container>
              {isHighScore && (
                <Typography variant='h6' sx={{ color: 'green' }}>
                  New high score!
                </Typography>
              )}
              {user ?
                <Button variant='contained' sx={{ mt: 3 }} component={Link} to="/profile">Check high score</Button>
                :
                <Button variant='contained' sx={{ mt: 3 }} onClick={handleSaveScore}>Login to save score</Button>
              }
            </Container>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Button variant="contained" onClick={restartQuiz}>
              Retry
            </Button>
          </Box>
        </Box>
      ) : (
        <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {shuffledQuestions[currentQuestion].question}
            </Typography>

            {shuffledQuestions[currentQuestion].image && (
              <CardMedia
                component="img"
                height="200"
                image={shuffledQuestions[currentQuestion].image}
                alt="Question Image"
                sx={{ marginBottom: 2, objectFit: 'contain', width: '100%' }}
              />
            )}

            <Box>
              {shuffledQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  fullWidth
                  onClick={() => setSelectedOption(index)}
                  sx={{
                    margin: '10px 0',
                    backgroundColor:
                      submitted && selectedOption === index
                        ? index === shuffledQuestions[currentQuestion].correctAnswer
                          ? 'green'
                          : 'red'
                        : 'white',
                    '&:hover': {
                      backgroundColor: 'lightgray',
                    },
                    color: 'black'
                  }}
                  disabled={submitted}
                >
                  {option}
                </Button>
              ))}
            </Box>

            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
              {feedback === '' ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Box>
                  <Fade in={submitted}>
                    <Typography
                      variant="body1"
                      color={selectedOption === shuffledQuestions[currentQuestion].correctAnswer ? "green" : "red"}
                      align="center"
                    >
                      {feedback}
                    </Typography>
                  </Fade>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNextAfterFeedback}
                    >
                      Next Question
                    </Button>
                  </Box>
                  {!showScore && (
                    <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" onClick={restartQuiz}>
                        Restart from Beginning
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default GuidedTrading;