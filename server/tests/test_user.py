import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import unittest
from flask_testing import TestCase
from app import app, db

# TODO: Update tests to check validation (Jake)

class TestUser(TestCase):

    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        return app

    def setUp(self):
        with app.app_context():
            db.create_all()
        self.client = app.test_client()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_add_user(self):
        response = self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})
        self.assertEqual(response.status_code, 201)
        self.assertIn(b'User created successfully', response.data)

    def test_get_users(self):
        self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})
        response = self.client.get('/users')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'testuser', response.data)

    def test_get_user(self):
        self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})
        response = self.client.get('/users/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'testuser', response.data)

    def test_update_user(self):
        self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})
        response = self.client.put('/users/1', json={'username': 'updateduser', 'email': 'updated@example.com'})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'User updated successfully', response.data)

    def test_delete_user(self):
        self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})
        response = self.client.delete('/users/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'User deleted successfully', response.data)
    
    def test_login_user(self):
        self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})
        response = self.client.post('/login', json={'email': 'test@example.com', 'password': 'password123'})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Login successful', response.data)

    def test_authenticate(self):
        # Create a user
        self.client.post('/users', json={'username': 'testuser', 'email': 'test@example.com', 'password': 'password123'})

        # Login to get the token
        login_response = self.client.post('/login', json={'email': 'test@example.com', 'password': 'password123'})
        token = login_response.json['token']

        # Make a request to the authenticate route with the token
        response = self.client.get('/authenticate', headers={'Authorization': token})

        print(response.json)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['user']['email'], 'test@example.com')

if __name__ == '__main__':
    unittest.main()