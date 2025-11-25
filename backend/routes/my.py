from flask import Blueprint
from utils.common import success_response
from models.user import User

my_bp = Blueprint('my', __name__, url_prefix='/api/my')

@my_bp.route('/profile', methods=['GET'])
def get_my_profile():
    """내 프로필 조회 (myPage)"""
    return success_response({
        'username': '지구지킴이',
        'email': 'eco@example.com',
        'level': 6,
        'points': 8500,
        'rank': 5,
        'character': {
            'name': '초록이',
            'level': 6,
            'exp': 6500,
            'max_exp': 10000
        },
        'joined_date': '2024-01-15',
        'total_missions_completed': 45,
        'total_points_earned': 8500,
        'profile_image': 'url_to_profile_image'
    })

@my_bp.route('/badges', methods=['GET'])
def get_my_badges():
    """내 배지 조회"""
    return success_response({
        'badges': [
            {'id': 1, 'name': '에코 입문자', 'acquired': True},
            {'id': 2, 'name': '미션 달인', 'acquired': True},
            {'id': 3, 'name': '포인트 수집가', 'acquired': False}
        ]
    })

@my_bp.route('/statistics', methods=['GET'])
def get_my_statistics():
    """내 통계"""
    return success_response({
        'total_points_earned': 8500,
        'total_points_used': 0,
        'total_missions_completed': 45,
        'current_streak': 15,  # 연속 로그인
        'most_completed_category': 'eco'
    })
