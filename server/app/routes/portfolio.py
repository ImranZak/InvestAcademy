from flask import Blueprint, jsonify, request

portfolio_bp = Blueprint('portfolio_bp', __name__)

# Sample portfolio (for simplicity, stored in-memory)
portfolio = {"cash": 10000, "stocks": {}}
transaction_history = []

# Buy stocks
@portfolio_bp.route('/buy', methods=['POST'])
def buy_stock():
    data = request.get_json()
    stock = data['stock']
    quantity = data['quantity']
    price = data['price']

    if portfolio['cash'] >= price * quantity:
        portfolio['cash'] -= price * quantity
        portfolio['stocks'][stock] = portfolio['stocks'].get(stock, 0) + quantity
        transaction_history.append({"action": "buy", "stock": stock, "quantity": quantity, "price": price})
        return jsonify({"message": f"Bought {quantity} shares of {stock}"}), 200
    else:
        return jsonify({"message": "Insufficient funds"}), 400

# Sell stocks
@portfolio_bp.route('/sell', methods=['POST'])
def sell_stock():
    data = request.get_json()
    stock = data['stock']
    quantity = data['quantity']
    price = data['price']

    if portfolio['stocks'].get(stock, 0) >= quantity:
        portfolio['stocks'][stock] -= quantity
        portfolio['cash'] += price * quantity
        transaction_history.append({"action": "sell", "stock": stock, "quantity": quantity, "price": price})
        return jsonify({"message": f"Sold {quantity} shares of {stock}"}), 200
    else:
        return jsonify({"message": "Insufficient stocks to sell"}), 400

# View portfolio
@portfolio_bp.route('/portfolio', methods=['GET'])
def view_portfolio():
    return jsonify(portfolio)

# View transaction history
@portfolio_bp.route('/transactions', methods=['GET'])
def view_transactions():
    return jsonify(transaction_history)
