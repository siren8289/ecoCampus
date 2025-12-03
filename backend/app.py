import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from models import db

load_dotenv()

app = Flask(__name__)
CORS(app)

# -------------------------
# 🔥 1) DB 설정
# -------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# -------------------------
# 🔥 2) 블루프린트 import (⚠ 여기서 import 해야 순환 import 안남)
# -------------------------
from routes.home import home_bp
from routes.my import my_bp
from routes.ranking import ranking_bp
from routes.settings import settings_bp
from routes.point import point_bp   # 이 자리로 이동!!!

# -------------------------
# 🔥 3) 블루프린트 등록
# -------------------------
app.register_blueprint(home_bp)
app.register_blueprint(my_bp)
app.register_blueprint(ranking_bp)
app.register_blueprint(settings_bp)
app.register_blueprint(point_bp)

# 기본 라우트
@app.route('/')
def index():
    return {'message': 'EcoCampus API is running', 'status': 'success'}

@app.route('/health')
def health():
    return {'status': 'healthy'}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)), debug=True)
