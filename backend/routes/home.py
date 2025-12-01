from flask import Blueprint
from utils.common import success_response

home_bp = Blueprint('home', __name__, url_prefix='/api/home')

@home_bp.route('/dashboard', methods=['GET'])
def get_home_dashboard():
    """홈 화면 상단 대시보드"""
    return success_response({
        "greeting": "당신의 실천이 우리 캠퍼스를 푸르게 합니다 🍀",
        "current_room": {
            "room_name": "정보문화관 PC34실",
            "temperature": 23.5,
            "people": 25,
            "air_quality": "보통"
        },
        "devices": {
            "ac_count": 7,
            "light_count": 7,
            "usage_kwh": 1.2
        }
    })

@home_bp.route('/quick-stats', methods=['GET'])
def get_quick_stats():
    """오늘의 절약 현황 카드"""
    return success_response({
        "today_usage": 0.7,
        "mission_completed": 2,
        "earned_points": 120,
        "dept_avg_comparison": "+12%",
        "today_growth": "+4%"
    })
