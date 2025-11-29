from flask import Blueprint, request
from utils.common import success_response
from app import db

character_bp = Blueprint('character', __name__, url_prefix='/api/character')

@character_bp.route('/info', methods=['GET'])
def get_character_info():
    """캐릭터 정보 조회"""
    return success_response({
        'level': 5,
        'exp': 6500,
        'max_exp': 10000,
        'exp_percentage': 65,
        'character_name': '초록이',
        'character_image': 'url_to_character_image'
    })

@character_bp.route('/level-up', methods=['POST'])
def level_up():
    """레벨업"""
    return success_response({
        'message': '레벨업 완료!',
        'new_level': 6,
        'exp': 0,
        'max_exp': 12000
    })
