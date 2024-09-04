import axios from 'axios';

const BASE_URL = 'https://investacademy.onrender.com';

// Fetch AI Mode stock data
export const fetchAIModeData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trading/ai-mode`);
    return response.data;
  } catch (error) {
    console.error('Error fetching AI Mode data:', error);
    throw error;
  }
};

// Fetch Real-Life Scenarios data
export const fetchRealLifeScenariosData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trading/real-life-scenarios`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Real-Life Scenarios data:', error);
    throw error;
  }
};

// Fetch Guided Trading data
export const fetchGuidedTradingData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trading/training-mode`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Guided Trading data:', error);
    throw error;
  }
};

// Fetch Portfolio data
export const fetchPortfolioData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/portfolio/portfolio`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Portfolio data:', error);
    throw error;
  }
};

// Fetch Transaction History data
export const fetchTransactionHistory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/portfolio/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Transaction History data:', error);
    throw error;
  }
};

// Buy stocks
export const buyStock = async (stockData) => {
  try {
    const response = await axios.post(`${BASE_URL}/portfolio/buy`, stockData);
    return response.data;
  } catch (error) {
    console.error('Error buying stock:', error);
    throw error;
  }
};

// Sell stocks
export const sellStock = async (stockData) => {
  try {
    const response = await axios.post(`${BASE_URL}/portfolio/sell`, stockData);
    return response.data;
  } catch (error) {
    console.error('Error selling stock:', error);
    throw error;
  }
};
