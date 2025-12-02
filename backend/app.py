from routes.point import point_bp
from flask import Flask
from models import db

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

    db.init_app(app)

# Register API Blueprints (⭐ 두 번째 핵심 추가)
app.register_blueprint(ranking_bp)
app.register_blueprint(settings_bp)
app.register_blueprint(my_bp)

# 기본 루트
@app.route('/')
def index():
    return {'message': 'EcoCampus API is running', 'status': 'success'}

@app.route('/health')
def health():
    return {'status': 'healthy'}

# 서버 실행
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

