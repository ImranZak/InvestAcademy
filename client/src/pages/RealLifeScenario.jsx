import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import StockChart from './StockChart';

const scenarios = [
  {
    id: 1,
    title: "Scenario 1: Tesla's Stock Surges After Earnings Report",
    description: "Tesla announces better-than-expected earnings, resulting in a 12% surge in its stock price.",
    stockData: [950, 970, 990, 1020, 1064],
    stockDataLabel: "Tesla Stock",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    yMin: "900",
    yMax: "1100",
    stockPrice: "Stock Price: $950.00 → $1,064.00 (+12%)",
    correctAction: "Buy",
    correctComment: "The 12% surge in Tesla’s stock price following a strong earnings report indicates continued positive momentum. Buying now could capitalize on the ongoing positive investor sentiment and potential for further gains.",
    wrongComment: "Selling might be premature given that the stock has just surged by 12% due to strong earnings. If the positive earnings report is a sign of sustained growth, selling could mean missing out on further gains. The upward momentum might continue as investor sentiment remains positive.",
    graphType: "line",
  },
  {
    id: 2,
    title: "Scenario 2: GameStop Short Squeeze",
    description: "GameStop experiences a massive short squeeze, causing its stock to skyrocket by 200% in just a few days.",
    stockData: [30, 50, 80, 120, 150],
    stockDataLabel: "GameStop Stock",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    yMin: "0",
    yMax: "200",
    stockPrice: "Stock Price: $30.00 → $150.00 (+200%)",
    correctAction: "Sell",
    correctComment: "The stock has skyrocketed by 200% due to a short squeeze. Selling now locks in substantial profits and mitigates the risk of a potential price correction or reversal as the short squeeze effect fades.",
    wrongComment: "Buying at this point after a 200% increase due to a short squeeze could be risky. The extreme price movement suggests potential volatility and a correction could be imminent. Buying now may lead to losses if the stock experiences a sharp decline after the initial surge.",
    graphType: "bar",
  },
  {
    id: 3,
    title: "Scenario 3: Amazon Stock Dips After Antitrust Lawsuit",
    description: "Amazon faces an antitrust lawsuit, causing its stock to drop by 8%.",
    stockData: [3400, 3350, 3300, 3200, 3128],
    stockDataLabel: "Amazon Stock",
    yMin: "3500",
    yMax: "3000",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $3,400.00 → $3,128.00 (-8%)",
    correctAction: "Sell",
    correctComment: "The 8% decline in Amazon's stock due to regulatory concerns suggests potential ongoing challenges. Selling might be prudent to avoid further losses if regulatory issues continue to impact the stock negatively.",
    wrongComment: "Buying in response to an 8% drop due to regulatory concerns might be risky. The antitrust lawsuit could have long-term implications that could further depress the stock price. Investing in the face of such uncertainties could lead to further losses if the situation worsens.",
    graphType: "line",
  },
  {
    id: 4,
    title: "Scenario 4: COVID-19 Market Crash",
    description: "The global pandemic leads to widespread fear and uncertainty, resulting in a 30% drop in major stock indexes.",
    stockData: [28000, 25000, 22000, 20000, 19600],
    stockDataLabel: "Major Stock Index",
    yMin: "29000",
    yMax: "19000",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Index: $28,000.00 → $19,600.00 (-30%)",
    correctAction: "Buy",
    correctComment: "The 30% drop in major stock indexes due to the pandemic presents a potential buying opportunity. If you believe the market will eventually recover, buying at these lower levels could benefit from future gains as the market stabilizes.",
    wrongComment: "Selling during a 30% market drop due to the pandemic could lock in losses when the market might eventually recover. Selling in a panic during a market crash could result in missing out on potential gains as the market rebounds from the downturn.",
    graphType: "line",
  },
  {
    id: 5,
    title: "Scenario 5: Apple's Stock Climbs After New Product Launch",
    description: "Apple launches a new iPhone, and its stock price increases by 5%.",
    stockData: [150, 152, 154, 156, 157.5],
    stockDataLabel: "Apple Stock",
    yMin: "140",
    yMax: "160",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $150.00 → $157.50 (+5%)",
    correctAction: "Buy",
    correctComment: "The 5% increase in Apple’s stock following a new product launch reflects positive market reception. Buying could capture additional gains if the product drives further growth and investor enthusiasm.",
    wrongComment: "Selling after a 5% increase post-product launch might mean missing out on further growth. The new product could drive additional gains if it is well-received, so selling now could be premature if the stock continues to benefit from positive market reception.",
    graphType: "line",
  },
  {
    id: 6,
    title: "Scenario 6: Oil Prices Plummet Due to Global Oversupply",
    description: "A sudden oversupply of oil causes oil company stocks to fall by 15%.",
    stockData: [80, 75, 70, 68, 68],
    stockDataLabel: "Oil Company Stock Average",
    yMin: "90",
    yMax: "60",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $80.00 → $68.00 (-15%)",
    correctAction: "Sell",
    correctComment: "The 15% drop in oil company stocks due to oversupply conditions suggests a prolonged negative trend. Selling could prevent further losses if the oversupply issue is expected to persist.",
    wrongComment: "Buying oil company stocks after a 15% drop might be risky if the oversupply situation persists. The decline indicates ongoing market challenges, and buying could result in further losses if the oversupply continues to impact prices negatively.",
    graphType: "bar",
  },
  {
    id: 7,
    title: "Scenario 7: Facebook (Meta) Stock Drops After Privacy Scandal",
    description: "Facebook's stock declines by 10% following a major privacy scandal.",
    stockData: [330, 320, 310, 300, 297],
    stockDataLabel: "Facebook Stock",
    yMin: "340",
    yMax: "290",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $330.00 → $297.00 (-10%)",
    correctAction: "Sell",
    correctComment: "The 10% decline in Facebook’s stock due to a privacy scandal indicates potential long-term damage. Selling now could limit losses if the scandal impacts the company’s reputation and performance.",
    wrongComment: "Buying after a 10% drop due to a privacy scandal could be problematic if the scandal has long-term repercussions. The decline might reflect deeper issues with the company’s reputation, and buying could expose you to further losses if the scandal has lasting effects.",
    graphType: "line",
  },
  {
    id: 8,
    title: "Scenario 8: Google Stock Rises on Positive AI Developments",
    description: "Google announces advancements in AI technology, leading to a 7% increase in stock price.",
    stockData: [2800, 2850, 2900, 2950, 2996],
    stockDataLabel: "Google Stock",
    yMin: "2750",
    yMax: "3000",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $2,800.00 → $2,996.00 (+7%)",
    correctAction: "Buy",
    correctComment: "The 7% increase in Google’s stock due to advancements in AI technology suggests continued positive prospects. Buying could benefit from further growth and investor excitement around AI developments.",
    wrongComment: "Selling after a 7% increase due to positive AI developments might mean missing out on additional gains. If the advancements in AI are expected to drive continued growth, selling now could lead to lost opportunities as the stock benefits from ongoing positive news.",
    graphType: "line",
  },
  {
    id: 9,
    title: "Scenario 9: Cryptocurrency Market Boom",
    description: "Bitcoin and other cryptocurrencies surge in value, with Bitcoin increasing by 20% in a week.",
    stockData: [45000, 47000, 49000, 52000, 54000],
    stockDataLabel: "Bitcoin Stock",
    yMin: "46000",
    yMax: "55000",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $45,000 → $54,000 (+20%)",
    correctAction: "Buy",
    correctComment: "The 20% increase in Bitcoin price amid a broader cryptocurrency market boom presents a strong growth opportunity. Buying now could capitalize on the ongoing bullish trend in the cryptocurrency market.",
    wrongComment: "Selling during a 20% increase in Bitcoin price amidst a broader market boom could mean missing out on further gains. If the cryptocurrency market is experiencing a strong upward trend, selling now might result in lost profits as the momentum continues.",
    graphType: "line",
  },
  {
    id: 10,
    title: "Scenario 10: Pharmaceutical Stock Plummets After Failed Drug Trial",
    description: "A major pharmaceutical company reports a failed drug trial, resulting in a 25% drop in its stock price.",
    stockData: [120, 115, 110, 100, 90],
    stockDataLabel: "Pharmaceuitical Stock",
    yMin: "130",
    yMax: "80",
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    stockPrice: "Stock Price: $120.00 → $90.00 (-25%)",
    correctAction: "Sell",
    correctComment: "The 25% drop in the pharmaceutical stock following a failed drug trial indicates a significant setback. Selling could prevent further losses if the failed trial undermines confidence in the company's future prospects.",
    wrongComment: "Buying after a 25% drop due to a failed drug trial could be risky if the trial indicates serious underlying issues. The stock’s significant decline suggests a loss of confidence, and buying might lead to further losses if the company struggles with additional setbacks.",
    graphType: "line",
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

  const { title, description, correctAction, correctComment, wrongComment, stockData, stockDataLabel, labels, stockPrice, graphType, yMin, yMax } = scenarios[currentScenario];

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
            <Typography variant="body1" paragraph>{stockPrice}</Typography>
          </CardContent>

          {/* Replace the static image with the StockChart component */}
          <StockChart
            labels={labels}
            data={stockData}
            title={title}
            stockDataLabel={stockDataLabel}
            graphType={graphType}
            yMin={yMin}
            yMax={yMax}
          />

          <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 2, marginX: 10}}>
            {showResult && (
              <Typography variant="h6" color={userAction === correctAction ? "green" : "red"}>
                {userAction === correctAction ? "Correct!" : "Wrong Action"}
              </Typography>
            )}

            {showResult && (
              <Typography variant="body1" align="center" sx={{ marginTop: 0 }}>
                {userAction === correctAction ? correctComment : wrongComment}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => handleAction("Buy")}>
                Buy
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleAction("Sell")}>
                Sell
              </Button>
            </Box>

            {showResult && (
              <Box sx={{ marginTop: 2 }}>
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