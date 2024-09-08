import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from flask import Blueprint, request, jsonify
from app import app, db
from app.models.User import User
from bcrypt import hashpw, checkpw, gensalt
import jwt
from datetime import datetime, timedelta
from functools import wraps

user_bp = Blueprint('user_bp', __name__)

# TODO: Add input validation for all routes

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 400
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
            current_user = User.query\
                .filter_by(id = data['user_id'])\
                .first()
        except Exception as e:
            return jsonify({
                'message' : f'Token is invalid !! {e}'
            }), 400
        return  f(current_user, *args, **kwargs)
    return decorated


@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = hashpw(data['password'].encode('utf-8'), gensalt())
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@user_bp.route('/login', methods=['POST'])

def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and checkpw(data['password'].encode('utf-8'), user.password):
        token = jwt.encode({
            'user_id': user.id,
            'exp':  datetime.now() + timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'email': user.email}, 'token': token})
    return jsonify({'message': 'Invalid email or username'}), 400


@user_bp.route('/authenticate', methods=['GET'])
@token_required
def authenticate(current_user):
    return jsonify({'user': {'id': current_user.id, 'email': current_user.email}})


@user_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    hashed_password = hashpw(data['password'].encode('utf-8'), gensalt())
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'email': user.email} for user in users])


@user_bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email, 'highScore': user.high_score})


@user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.username = data.get('username', None) or user.username
    user.email = data.get('email', None) or user.email
    user.high_score = data.get('highScore', None) or user.high_score
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})


@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})


if __name__ == "__main__":
    raise RuntimeError("User routes cannot be run directly")