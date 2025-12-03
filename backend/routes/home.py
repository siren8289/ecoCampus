from flask import Blueprint
from utils.common import success_response

home_bp = Blueprint('home', __name__, url_prefix='/api/home')

@home_bp.route('/dashboard', methods=['GET'])
def get_home_dashboard():
    """홈 대시보드 조회"""
    return success_response({
        'greeting': '안녕하세요!',
        'current_points': 850,
        'daily_mission_count': 3,
        'completed_missions': 2,
        'user_level': 5
    })

@home_bp.route('/quick-stats', methods=['GET'])
def get_quick_stats():
    """빠른 통계"""
    return success_response({
        'total_points': 5200,
        'weekly_missions_completed': 8,
        'today_growth': 15,
        'character_level': 5
    })
