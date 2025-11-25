from flask import Flask
from models import db

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    @app.route("/")
    def index():
        return "Flask server running!"

    # ⚠️ 여기서 Blueprint들도 register 해야 함
    # from routes.mission import mission_bp
    # app.register_blueprint(mission_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
