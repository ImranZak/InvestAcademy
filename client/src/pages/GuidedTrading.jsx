import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import http from '../http.js'
import UserContext from '../contexts/UserContext';


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
    explanation: "A stock market is a platform where buyers and sellers trade shares of publicly listed companies."
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
    explanation: "'Diversify' means spreading risk by buying shares in different industries or sectors."
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
    explanation: "A dividend is a regular payment made by a company to its shareholders out of its profits."
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
    explanation: "The performance of a company is the most significant factor affecting stock prices."
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
    explanation: "A bull market refers to a market where stock prices are generally rising."
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
    explanation: "An ETF is an Exchange-Traded Fund that tracks an index, commodity, or sector."
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
  }
];

const GuidedTrading = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
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
    }
    if (user) {
      http.put(`/high_score/${user.id}`, { 'score': score })
        .catch(function (err) {
            console.error(err)
            toast.error(`${err.response.data.message}`);
        });
    }
  };
  
  const handleSaveScore = () => {
    localStorage.setItem('highScore', score)
    navigate('/login')
  };

  if (shuffledQuestions.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
          Financial Literacy Quiz
        </Typography>

        <Typography variant="h6" gutterBottom>
          Question {currentQuestion + 1} of {shuffledQuestions.length}
        </Typography>

        {showScore ? (
          <>
            <Typography variant="h5">
            You scored {score} out of {shuffledQuestions.length}
            </Typography>
            { user ? 
              <Button variant='contained' sx={{ mt: 3 }} component='Link' to="/profile">Check high score</Button>
              :
              <Button variant='contained' sx={{ mt: 3 }} onClick={handleSaveScore}>Login to save score</Button>
            }
          </>
        ) : (
          <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {shuffledQuestions[currentQuestion].question}
              </Typography>
              <Box>
                {shuffledQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    onClick={() => setSelectedOption(index)}
                    sx={{
                      margin: 1,
                      color: 'black',
                      backgroundColor:
                        submitted && selectedOption === index
                          ? index === shuffledQuestions[currentQuestion].correctAnswer
                            ? 'green'
                            : 'red'
                          : 'white',
                      '&:hover': {
                        backgroundColor: 'lightgray',
                      }
                    }}
                    disabled={submitted} // Disable buttons after submission
                  >
                    {option}
                  </Button>
                ))}
              </Box>
              <Box sx={{ marginTop: 4 }}>
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
                    <Typography
                      variant="body1"
                      color={selectedOption === shuffledQuestions[currentQuestion].correctAnswer ? "green" : "red"}
                    >
                      {feedback}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNextAfterFeedback}
                      sx={{ marginTop: 2 }}
                    >
                      Next Question
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default GuidedTrading;
