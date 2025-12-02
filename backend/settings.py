<<<<<<< HEAD
from flask import Blueprint, request
from utils.common import success_response

settings_bp = Blueprint('settings', __name__, url_prefix='/api/settings')

@settings_bp.route('/', methods=['GET'])
def get_settings():
    """설정 조회"""
    return success_response({
        'notifications': {
            'mission': True,
            'reward': True,
            'ranking': False
        },
        'theme': 'light',
        'language': 'ko',
        'privacy': {
            'show_profile': True,
            'show_points': True,
            'show_ranking': False
        }
    })

@settings_bp.route('/', methods=['PUT'])
def update_settings():
    """설정 수정"""
    data = request.get_json()

    return success_response({
        'message': '설정이 저장되었습니다',
        'settings': data
    })
=======
from flask import Blueprint
from utils.common import success_response

bp = Blueprint('settings', __name__, url_prefix='/api/settings')

# TODO: Implement settings routes
# Example:
# @bp.route('/profile', methods=['PUT'])
# def update_profile():
#     return success_response({'message': 'Profile updated'})

>>>>>>> 6c0558c0ffa624f8c205339af25efeecff1d4230
