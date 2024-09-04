import os
from app import app, db

if __name__ == '__main__':
    # Ensure the app binds to 0.0.0.0 and uses the port provided by Render
    port = int(os.environ.get('PORT', 5000))  # Default to 5000 if PORT is not set
    
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
    
    # Run the app
    app.run(host='0.0.0.0', port=port, debug=True)
