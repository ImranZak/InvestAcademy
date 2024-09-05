import React, { useState } from 'react';
import { Container, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Button, Divider, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    section: {
        padding: '20px',
        marginTop: '80px',
    },
    question: {
        marginBottom: '20px '
    },
    explanation: {
        marginTop: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    result: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#e0f7fa',
        borderRadius: '5px',
    },
});

const questions = [
    {
        question: "1. Which of the following best describes a stock market?",
        options: ["A place where stocks are bought and sold.", "A place where you can get a loan.", "A place where food is sold."],
        answer: "A",
        explanation: "The stock market is a marketplace where stocks are bought and sold."
    },
    {
        question: "2. What is the New York Stock Exchange (NYSE) known for?",
        options: ["A platform for buying groceries.", "One of the largest and oldest stock exchanges.", "A place to buy fashion items."],
        answer: "B",
        explanation: "The NYSE is one of the largest and oldest stock exchanges in the world."
    },
    {
        question: "3. What does a limit order do?",
        options: ["Buys or sells at the current price.", "Buys or sells at a specific price.", "Holds a stock for a set period."],
        answer: "B",
        explanation: "A limit order buys or sells a stock at a specific price set by the investor."
    },
    {
        question: "4. When is the best time to sell a stock according to the 'Buy Low, Sell High' strategy?",
        options: ["When the stock price is low.", "When the stock price is high.", "When the stock price is stable."],
        answer: "B",
        explanation: "'Buy Low, Sell High' suggests buying stocks when they are inexpensive and selling them when their price increases."
    },
    {
        question: "5. Which stock exchange is known for its focus on technology stocks?",
        options: ["NYSE", "NASDAQ", "London Stock Exchange"],
        answer: "B",
        explanation: "NASDAQ is known for its focus on technology and innovation stocks."
    },
    {
        question: "6. How does positive news affect stock prices?",
        options: ["It generally decreases the stock price.", "It has no effect on stock prices.", "It generally increases the stock price."],
        answer: "C",
        explanation: "Positive news about a company can lead to an increase in its stock price due to expected improved performance."
    },
    {
        question: "7. What is a broker in the context of stock trading?",
        options: ["Someone who provides financial advice.", "A person or platform that facilitates buying and selling stocks.", "A company that manufactures goods."],
        answer: "B",
        explanation: "A broker is a person or a platform that helps investors buy and sell stocks."
    },
    {
        question: "8. What type of order is executed immediately at the current market price?",
        options: ["Market order", "Limit order", "Stop order"],
        answer: "A",
        explanation: "A market order is executed immediately at the current market price."
    },
    {
        question: "9. What might cause a stock’s price to drop?",
        options: ["Positive earnings report", "Company expansion", "Negative news about the company"],
        answer: "C",
        explanation: "Negative news about a company, such as poor earnings or scandals, can cause a stock's price to drop."
    },
    {
        question: "10. What analogy is used to describe the process of buying stocks?",
        options: ["Ordering from an online store", "Buying a house", "Going to a concert"],
        answer: "A",
        explanation: "Buying stocks is often compared to ordering from an online store, where you select what you want and place an order."
    },
    {
        question: "11. What is a practical example of using the 'Buy Low, Sell High' strategy?",
        options: ["Buying shares of a company at $50 and selling them at $75.", "Buying shares of a company at $75 and selling them at $50.", "Buying shares at any price."],
        answer: "A",
        explanation: "An example of the 'Buy Low, Sell High' strategy is buying shares at a lower price and selling them when the price increases to make a profit."
    },
    {
        question: "12. How does the concept of 'Buy Low, Sell High' guide investors?",
        options: ["Invest in stocks that are trending.", "Buy stocks at their highest price.", "Purchase stocks when they are undervalued and sell them when they are overvalued."],
        answer: "C",
        explanation: "The concept advises purchasing stocks when their price is low and selling when their price is high to maximize profit."
    },
    {
        question: "13. What impact does a major technological breakthrough have on a company's stock price?",
        options: ["It typically decreases the stock price.", "It typically has no impact on the stock price.", "It can increase the stock price."],
        answer: "C",
        explanation: "A major technological breakthrough can lead to an increase in a company's stock price due to anticipated growth and profitability."
    },
];

const ModuleQuiz = () => {
    const classes = useStyles();
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const handleChange = (questionIndex, event) => {
        setAnswers({
            ...answers,
            [questionIndex]: event.target.value
        });
    };

    const handleSubmit = () => {
        let count = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) {
                count++;
            }
        });
        setCorrectAnswers(count);
        setSubmitted(true);
    };

    return (
        <Container>
            <Paper className={classes.section}>
                <Typography variant="h4" className={classes.question} sx={{mb: 2, padding: '100px', paddingBottom:'0px'}}>Quiz: Test Your Knowledge</Typography>
                <FormControl component="fieldset" sx={{padding: '100px', paddingTop: '0px'}}>
                    <RadioGroup aria-label="quiz">
                        {questions.map((q, index) => (
                            <div key={index}>
                                <Typography variant="h6" className={classes.question}>{q.question}</Typography>
                                <FormControl component="fieldset" sx={{mb: 4}}>
                                    {q.options.map((option, i) => (
                                        <FormControlLabel
                                            key={i}
                                            value={String.fromCharCode(65 + i)}
                                            control={<Radio />}
                                            label={option}
                                            checked={answers[index] === String.fromCharCode(65 + i)}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    ))}
                                </FormControl>
                                {submitted && answers[index] !== q.answer && (
                                    <Typography className={classes.explanation}>
                                        <strong>Explanation:</strong> {q.explanation}
                                    </Typography>
                                )}
                            </div>
                        ))}
                    </RadioGroup>
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                        Submit Quiz
                    </Button>
                </FormControl>
                {submitted && (
                    <div className={classes.result}>
                        <Typography variant="h6">
                            You got {correctAnswers} out of {questions.length} correct!
                        </Typography>
                    </div>
                )}
            </Paper>
        </Container>
    );
};

export default ModuleQuiz;
