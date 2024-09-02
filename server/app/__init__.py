from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import requests

db = SQLAlchemy()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///investacademy.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

from app.routes.user import user_bp
app.register_blueprint(user_bp)


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