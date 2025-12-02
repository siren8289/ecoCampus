from flask import Blueprint
from utils.common import success_response

character_bp = Blueprint('character', __name__, url_prefix='/api/character')

@character_bp.route('/info', methods=['GET'])
def get_character_info():
    """캐릭터 기본 정보"""
    return success_response({
        "level": 2,
        "exp": 350,
        "max_exp": 1000,
        "exp_percentage": 35,
        "character_name": "나무",
        "character_image": "https://cdn.ecocampus/tree_lv2.png",
        "next_level_remaining_point": 1950
    })

@character_bp.route('/today-growth', methods=['GET'])
def today_growth():
    """오늘의 성장 정보"""
    return success_response({
        "mission_completed": 2,
        "growth_percent": 4,
        "earned_points": 120,
        "streak_days": 3
    })

@character_bp.route('/level-up', methods=['POST'])
def level_up():
    """레벨업 처리"""
    return success_response({
        "message": "레벨업 완료!",
        "new_level": 3,
        "exp": 0,
        "max_exp": 2000
    })
