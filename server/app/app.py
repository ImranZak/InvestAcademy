from flask import Flask, render_template, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests

db = SQLAlchemy()

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///investacademy.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://u8nr3n8g0oh2vt:p462cc1456f16fb30594d14b69a4227f039b470881270c326857b0d0eacedbeda@cd1goc44htrmfn.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d3sa1io7d7s4pn'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Import the user routes
from app.routes.user import user_bp
app.register_blueprint(user_bp)

# Import the trading and portfolio routes
from app.routes.trading import trading_bp
from app.routes.portfolio import portfolio_bp
app.register_blueprint(trading_bp, url_prefix='/trading')
app.register_blueprint(portfolio_bp, url_prefix='/portfolio')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test')
def populate():
    # Unsure of how to implement base url so I am setting it manually here
    url = 'http://localhost:5000/users'

    # Get all user ids
    response = requests.get(url)
    users = response.json()
    print(response.status_code)
    print(users)

    # Delete all users
    for user in users:
        try:
            response = requests.delete(f"{url}/{user['id']}")
            print(response.status_code)
            print(response.json())
        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")

    # Create users
    data = [{
        'username': 'testuser1',
        'email': 'test1@example.com'
    }, {
        'username': 'testuser2',
        'email': 'test2@example.com'
    }]
    for user in data:
        response = requests.post(url, json=user)
        print(response.status_code)
        print(response.json())

    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
