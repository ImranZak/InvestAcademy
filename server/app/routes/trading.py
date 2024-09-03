from flask import Blueprint, jsonify
import random

trading_bp = Blueprint('trading_bp', __name__)

# Simulate fixed stock trajectories (Training Mode)
@trading_bp.route('/training-mode', methods=['GET'])
def training_mode():
    fixed_trajectories = [
        {"stock": "AAPL", "price": 150},
        {"stock": "GOOGL", "price": 2800},
        {"stock": "TSLA", "price": 700}
    ]
    return jsonify(fixed_trajectories)

# Simulate random AI Mode
@trading_bp.route('/ai-mode', methods=['GET'])
def ai_mode():
    stocks = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT"]
    random_prices = [{"stock": stock, "price": round(random.uniform(100, 3000), 2)} for stock in stocks]
    return jsonify(random_prices)

# Simulate real-life scenarios using historical data
@trading_bp.route('/real-life-scenarios', methods=['GET'])
def real_life_scenarios():
    historical_data = [
        {"stock": "AAPL", "price": 145},
        {"stock": "GOOGL", "price": 2780},
        {"stock": "TSLA", "price": 690}
    ]
    return jsonify(historical_data)
