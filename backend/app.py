from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import config
import os

# Initialize extensions (must be before importing models)
db = SQLAlchemy()
cors = CORS()


def create_app(config_name=None):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    config_name = config_name or os.getenv('FLASK_ENV', 'development')
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    cors.init_app(app, origins=app.config['CORS_ORIGINS'])
    
    # Register blueprints (import after db is initialized)
    from routes import home, my, point, ranking, settings
    app.register_blueprint(home.bp)
    app.register_blueprint(my.bp)
    app.register_blueprint(point.bp)
    app.register_blueprint(ranking.bp)
    app.register_blueprint(settings.bp)
    
    # Health check endpoint
    @app.route('/health')
    def health():
        return {'status': 'healthy', 'message': 'EcoCampus API is running'}
    
    # Root endpoint
    @app.route('/')
    def index():
        return {'message': 'EcoCampus API', 'status': 'success'}
    
    # Create database tables
    with app.app_context():
        # Import models to register them with SQLAlchemy
        from models import User, Mission, Point, Ranking
        db.create_all()
    
    return app


# Create app instance
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
