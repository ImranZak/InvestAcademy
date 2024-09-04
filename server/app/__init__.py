from flask import Flask, render_template, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import requests
import os

db = SQLAlchemy()

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///investacademy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Import routes
# TODO: Use url_prefix for user routes
from app.routes.user import user_bp
app.register_blueprint(user_bp)
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
        'email': 'test1@example.com',
        'password': 'password123'
    }, {
        'username': 'testuser2',
        'email': 'test2@example.com',
        'password': 'password123'
    }]
    for user in data:
        response = requests.post(url, json=user)
        print(response.status_code)
        print(response.json())

    # Login as testuser1
    response = requests.post('http://localhost:5000'+url_for('user_bp.login'), json=data[0])
    token = response.json()['token']
    print(response.status_code)
    print(response.json())

    # Authenticate logged in user
    response = requests.get('http://localhost:5000'+url_for('user_bp.authenticate'), headers={'Authorization': token})
    print(response.status_code)
    print(response.json())

    return redirect(url_for('home'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
