import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, Grid, styled } from '@mui/material';
import Box from '@mui/material/Box';
import YouTube from 'react-youtube';
import ModuleQuiz from '../components/ModuleQuiz';
import ModuleNavbar from '../components/ModuleNavbar';
import Divider from '@mui/material/Divider';
import IntroToStocksImage from "../assets/images/introtostocks.png";
import StockMarketImage from "../assets/images/stockmarket.png";
import HowStocksTradeImage from "../assets/images/howstockstraded.png";
import BuySellStocksImage from "../assets/images/buysellstocks.png";
import WhenBuySellImage from "../assets/images/whentobuy.png";
import NewsImage from "../assets/images/news.png";
import { useNavigate } from 'react-router-dom';



import ModuleKnowledgeCheck from '../components/ModuleKnowledgeCheck';
import { SnackbarProvider } from 'notistack';


// Styled components for the popup
const PopupBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
}));

const PopupContent = styled(Box)(({ theme }) => ({
  background: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  position: 'relative', // Added for positioning the close button
}));

const CloseButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));



const LearningMode = () => {

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const question1 = "What is a stock exchange?";
  const options1 = [
    { value: 'A', label: 'A) A place where people buy and sell groceries.' },
    { value: 'B', label: 'B) A place where stocks are traded.' },
    { value: 'C', label: 'C) A place where you buy clothes.' }
  ];
  const correctAnswer1 = 'B';


  // Question 2
  const question2 = "What is a broker?";
  const options2 = [
    { value: 'A', label: 'A) Someone who sells clothes.' },
    { value: 'B', label: 'B) A platform or person who helps with buying and selling stocks.' },
    { value: 'C', label: 'C) Someone who fixes cars.' }
  ];
  const correctAnswer2 = 'B';

  // Question 3
  const question3 = "What does 'Buy Low, Sell High' mean?";
  const options3 = [
    { value: 'A', label: 'A) Buy expensive items and sell them cheap.' },
    { value: 'B', label: 'B) Buy stocks when they are inexpensive and sell them when their price increases.' },
    { value: 'C', label: 'C) Buy stocks at any price.' }
  ];
  const correctAnswer3 = 'B';

  // Question 4
  const question4 = "How can news affect a company's stock price?";
  const options4 = [
    { value: 'A', label: 'A) It has no effect.' },
    { value: 'B', label: 'B) Positive news can increase the price, and negative news can decrease it.' },
    { value: 'C', label: 'C) News always makes the price go down.' }
  ];
  const correctAnswer4 = 'B';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) { // Check if scrolled to the bottom
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  const handleQuizButtonClick = () => {
    navigate('/module-quiz'); 
  };

  const handleGuidedTrainingButtonClick = () => {
    navigate('/guided-trading');
  };

  return (
    <SnackbarProvider maxSnack={3}>

      <Container>

        <Paper id="intro" sx={{ padding: '100px', pt: '1px', mt: '50px' }}>
          <Typography
            variant="h2"
            sx={{ color: 'navy', mb: '10px', fontSize: '2.5rem', mt: 12 }}
          >
            <strong>Introductory Course to Stock Trading</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                Welcome to your first step into the world of stock trading! In this course, you’ll learn the basics of stock trading, understand key concepts, and get practical examples to help you grasp how the stock market works. Let's dive in!
              </Typography>

            </Grid>

            <Grid item xs={6} md={6}>
              <img src={IntroToStocksImage} sx={{ width: '10%' }} />
            </Grid>
          </Grid>
        </Paper>


        <Paper id="section1" sx={{ p: '100px', pt: '1px', mt: '80px' }}>

          {/* Header */}
          <Typography
            variant="h4"
            sx={{ color: 'navy', mb: '20px', fontSize: '2rem', textAlign: 'center', mt: 10 }}
          >
            Lesson 1: What is the Stock Market?
          </Typography>

          {/* Grid Container */}
          <Grid container spacing={4} sx={{ mb: '40px' }}>

            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ mb: '10px', fontSize: '1.5rem' }}
              >
                1.1 Understanding Stocks and the Stock Market
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: '20px', fontSize: '1.2rem' }}
              >
                <strong>Analogy</strong>: Think of the stock market like a giant shopping mall where instead of buying clothes or gadgets, you're buying small pieces of companies. Each company has a store, and you can own a part of that store through buying stocks.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Concepts</strong>:
                <ul>
                  <li><strong>Stock</strong>: A share of ownership in a company.</li>
                  <li><strong>Stock Market</strong>: A marketplace where stocks are bought and sold.</li>
                </ul>
              </Typography>

              <Typography
                sx={{ mt: '20px', mb: '20px', fontSize: '1.2rem', fontStyle: 'italic' }}
              >
                A quick overview of the stock market basics.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Practical Example</strong>: Imagine you buy a share of a company like Nike. If Nike does well and earns more money, the value of your share might go up, meaning you could sell it for a profit.
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={StockMarketImage} alt="Stock Market" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </Grid>
          </Grid>

          {/* Video Embed */}
          <YouTube videoId="p7HKvqRI_Bo" style={{ margin: '20px 0', width: '100%', maxWidth: '800px', marginRight: 'auto' }} />


        </Paper>

        <Divider sx={{ mt: 10 }} />

        <Paper id="section2" sx={{ p: '100px', pt: '1px', mt: '80px' }}>

          {/* Header */}
          <Typography
            variant="h4"
            sx={{ color: 'navy', mb: '20px', fontSize: '2rem', textAlign: 'center', mt: 10 }}
          >
            Lesson 2: How Stocks Are Traded
          </Typography>

          {/* Grid Container */}
          <Grid container spacing={4} sx={{ mb: '40px' }}>

            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ mt: '20px', fontSize: '1.5rem' }}
              >
                2.1 Stock Exchanges
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: '10px', mb: '10px', fontSize: '1.2rem' }}
              >
                <strong>Analogy</strong>: Think of stock exchanges like sports arenas where teams (companies) play. The New York Stock Exchange (NYSE) and NASDAQ are two popular arenas where stocks are traded.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Concepts</strong>:
                <ul>
                  <li><strong>NYSE</strong>: One of the largest and oldest stock exchanges.</li>
                  <li><strong>NASDAQ</strong>: Known for its technology-focused stocks.</li>
                </ul>
              </Typography>

              <Typography
                sx={{ mt: '20px', mb: '20px', fontSize: '1.2rem', fontStyle: 'italic' }}
              >
                Explains the basics of stock exchanges.
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={HowStocksTradeImage} alt="Stock Exchanges" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </Grid>
          </Grid>

          {/* Video Embed */}
          <YouTube videoId="F3QpgXBtDeo" style={{ margin: '20px 0', width: '100%', maxWidth: '800px', marginRight: 'auto' }} />

          {/* Knowledge Check */}
          <ModuleKnowledgeCheck
            question={question1}
            options={options1}
            correctAnswer={correctAnswer1}
          />


        </Paper>

        <Divider sx={{ mt: 10 }} />

        <Paper id="section3" sx={{ p: '100px', pt: '1px', mt: '80px' }}>

          {/* Header */}
          <Typography
            variant="h4"
            sx={{ color: 'navy', mb: '20px', fontSize: '2rem', textAlign: 'center', mt: 10 }}
          >
            Lesson 3: Buying and Selling Stocks
          </Typography>

          {/* Grid Container */}
          <Grid container spacing={4} sx={{ mb: '40px' }}>

            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ mt: '20px', fontSize: '1.5rem' }}
              >
                3.1 How to Buy Stocks
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: '10px', mb: '10px', fontSize: '1.2rem' }}
              >
                <strong>Analogy</strong>: Buying stocks is like placing an order on your favorite online store. You choose the stock you want, decide how much of it you want to buy, and place your order through a broker.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Concepts</strong>:
                <ul>
                  <li><strong>Broker</strong>: A person or a platform that helps you buy and sell stocks.</li>
                  <li><strong>Order Types</strong>: Market order (buy/sell at current price) and limit order (buy/sell at a specific price).</li>
                </ul>
              </Typography>

              <Typography
                sx={{ mt: '20px', mb: '20px', fontSize: '1.2rem', fontStyle: 'italic' }}
              >
                A guide on purchasing stocks.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Practical Example</strong>: If you want to buy 10 shares of Apple, you use a brokerage app, enter the number of shares, and place your order. If it's a market order, it will be bought at the current price.
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={BuySellStocksImage} alt="Buying and Selling Stocks" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </Grid>
          </Grid>

          {/* Video Embed */}
          <YouTube videoId="i5OZQQWj5-I" style={{ margin: '20px 0', width: '100%', maxWidth: '800px', marginRight: 'auto' }} />

          {/* Knowledge Check */}
          <ModuleKnowledgeCheck
            question={question2}
            options={options2}
            correctAnswer={correctAnswer2}
          />
        </Paper>

        <Divider sx={{ mt: 10 }} />

        <Paper id="section4" sx={{ p: '100px', pt: '1px', mt: '80px' }}>

          {/* Header */}
          <Typography
            variant="h4"
            sx={{ color: 'navy', mb: '20px', fontSize: '2rem', textAlign: 'center', mt: 10 }}
          >
            Lesson 4: When to Buy and Sell
          </Typography>

          {/* Grid Container */}
          <Grid container spacing={4} sx={{ mb: '40px' }}>

            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ mt: '20px', fontSize: '1.5rem' }}
              >
                4.1 Basic Strategies
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: '10px', mb: '10px', fontSize: '1.2rem' }}
              >
                <strong>Analogy</strong>: Think of buying and selling stocks like deciding when to buy or sell items at a yard sale. You might buy something when it’s cheap and sell it when its value goes up.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Concepts</strong>:
                <ul>
                  <li><strong>Buy Low, Sell High</strong>: The basic idea is to buy stocks when they are cheap and sell them when their price increases.</li>
                  <li><strong>Research</strong>: Always do some research before buying a stock. Look at the company's performance and news.</li>
                </ul>
              </Typography>

              <Typography
                sx={{ mt: '20px', mb: '20px', fontSize: '1.2rem', fontStyle: 'italic' }}
              >
                Explains the concept of buying low and selling high.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Practical Example</strong>: You buy shares of a company when they are priced at $50 each. After some time, if the price rises to $75, you might decide to sell them to make a profit.
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={WhenBuySellImage} alt="When to Buy and Sell" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </Grid>
          </Grid>

          {/* Video Embed */}
          <YouTube videoId="IvYNKeVR1jM" style={{ margin: '20px 0', width: '100%', maxWidth: '800px', marginRight: 'auto' }} />

          {/* Knowledge Check */}
          <ModuleKnowledgeCheck
            question={question3}
            options={options3}
            correctAnswer={correctAnswer3}
          />


        </Paper>

        <Divider sx={{ mt: 10 }} />

        <Paper id="section5" sx={{ p: '100px', pt: '1px', mt: '80px' }}>

          {/* Header */}
          <Typography
            variant="h4"
            sx={{ color: 'navy', mb: '20px', fontSize: '2rem', textAlign: 'center', mt: 10 }}
          >
            Lesson 5: The Impact of News on Stock Prices
          </Typography>

          {/* Grid Container */}
          <Grid container spacing={4} sx={{ mb: '40px' }}>

            {/* Text Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ mt: '20px', fontSize: '1.5rem' }}
              >
                5.1 How News Affects Stock Prices
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: '10px', mb: '10px', fontSize: '1.2rem' }}
              >
                <strong>Analogy</strong>: Imagine a weather forecast saying it’s going to be sunny for a week. This news might make you decide to wear shorts. Similarly, news about a company (like a new product launch) can affect its stock price.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Concepts</strong>:
                <ul>
                  <li><strong>Positive News</strong>: Good news about a company can increase its stock price.</li>
                  <li><strong>Negative News</strong>: Bad news can decrease the stock price.</li>
                </ul>
              </Typography>

              <Typography
                sx={{ mt: '20px', mb: '20px', fontSize: '1.2rem', fontStyle: 'italic' }}
              >
                Overview of how news affects stock trading.
              </Typography>

              <Typography
                variant="body1"
                sx={{ fontSize: '1.2rem' }}
              >
                <strong>Practical Example</strong>: If a company announces a major breakthrough in technology, its stock price might go up because investors expect it will be more profitable.
              </Typography>
            </Grid>

            {/* Image */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={NewsImage} alt="Impact of News on Stock Prices" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </Grid>
          </Grid>

          {/* Video Embed */}
          <YouTube videoId="Z0G7ekRoI6g" style={{ margin: '20px 0', width: '100%', maxWidth: '800px', marginRight: 'auto' }} />

          {/* Knowledge Check */}
          <ModuleKnowledgeCheck
            question={question4}
            options={options4}
            correctAnswer={correctAnswer4}
          />


        </Paper>

        <Divider sx={{ mt: 10 }} />






        <Paper id="conclusion" sx={{ padding: '100px', pt: '1px', mt: '80px', mb: '80px' }}>
          <Typography
            variant="h5"
            sx={{ mb: '10px', fontSize: '1.8rem', color: 'darkgreen', mt: 10 }}
          >
            Conclusion and Further Reading
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '1.2rem' }}
          >
            Congratulations on completing the introductory course! You now have a basic understanding of stock trading. For those interested in diving deeper into stock trading strategies and advanced topics, check out the following resources:
          </Typography>
          <ul style={{ fontSize: '1.2rem' }}>
            <li>Investopedia's Guide to Stock Trading</li>
            <li>The Motley Fool's Investing Basics</li>
            <li><a href="https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds" target="_blank" rel="noopener noreferrer">Khan Academy's Stock Market Course</a></li>
          </ul>

          <Typography
            variant="h5"
            sx={{ mb: '10px', fontSize: '1.8rem', color: 'darkblue' }}
          >
            Sources
          </Typography>
          <ul style={{ fontSize: '1.2rem' }}>
            <li><a href="https://www.investopedia.com/" target="_blank" rel="noopener noreferrer">Investopedia</a></li>
            <li><a href="https://www.fool.com/" target="_blank" rel="noopener noreferrer">The Motley Fool</a></li>
            <li><a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer">Khan Academy</a></li>
            <li><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">YouTube Videos</a></li>
          </ul>
        </Paper>

        {showPopup && (
          <PopupBackground>
            <PopupContent>
              <Typography variant="h4" sx={{mb:2}}><strong>Feeling confident?</strong></Typography>
              <Typography variant="h6" sx={{mb:2}}>
                Take The <strong>Quiz</strong> or Try Our <strong>Guided Trading Simulator</strong>
              </Typography>
              <Button variant="contained" color="error" onClick={handleClosePopup} sx={{mr:2}}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleQuizButtonClick}
                sx={{mr: 2}}
              >
                Quiz
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleGuidedTrainingButtonClick}
              >
                Guided Trading Simulator
              </Button>

              
            </PopupContent>
          </PopupBackground>
        )}

      </Container>
    </SnackbarProvider>

  );
};

export default LearningMode;
