<<<<<<< HEAD
from flask import Blueprint, request
from utils.common import success_response, error_response
from models.point import Point
from models.user import User
from datetime import datetime

point_bp = Blueprint('point', __name__, url_prefix='/api/point')

@point_bp.route('/balance', methods=['GET'])
def get_point_balance():
    """현재 포인트 조회 (pointMain)"""
    # 실제로는 로그인한 사용자의 포인트를 조회
    total_points = 8500
    available_points = 8500

    return success_response({
        'total_points': total_points,
        'available_points': available_points,
        'locked_points': 0
    })

@point_bp.route('/history', methods=['GET'])
def get_point_history():
    """포인트 적립 내역 조회 (pointUser)"""
    points = Point.query.order_by(Point.created_at.desc()).limit(20).all()

    return success_response({
        'history': [
            {
                'id': p.id,
                'amount': p.amount,
                'reason': p.reason,
                'date': p.created_at.isoformat(),
                'type': 'earn' if p.amount > 0 else 'use'
            } for p in points
        ],
        'total_count': len(points)
    })

@point_bp.route('/methods', methods=['GET'])
def get_point_earning_methods():
    """포인트 얻는 방법 조회 (pointDo)"""
    return success_response({
        'methods': [
            {
                'id': 1,
                'name': '미션 완료',
                'description': '일일 미션을 완료하면 포인트 획득',
                'reward': 100,
                'icon': 'mission_icon'
            },
            {
                'id': 2,
                'name': '환경 기여',
                'description': '친환경 활동을 하면 포인트 획득',
                'reward': 50,
                'icon': 'eco_icon'
            },
            {
                'id': 3,
                'name': '콘텐츠 공유',
                'description': '콘텐츠를 공유하면 포인트 획득',
                'reward': 20,
                'icon': 'share_icon'
            },
            {
                'id': 4,
                'name': '로그인 보너스',
                'description': '매일 로그인하면 포인트 획득',
                'reward': 10,
                'icon': 'login_icon'
            }
        ]
    })

@point_bp.route('/use', methods=['POST'])
def use_points():
    """포인트 사용"""
    data = request.get_json()
    amount = data.get('amount')
    reason = data.get('reason', '포인트 사용')

    return success_response({
        'message': f'{amount} 포인트를 사용했습니다',
        'remaining_points': 8500 - amount
    })
=======
from flask import Blueprint
from utils.common import success_response

bp = Blueprint('point', __name__, url_prefix='/api/point')

# TODO: Implement point routes
# Example:
# @bp.route('/balance', methods=['GET'])
# def get_balance():
#     return success_response({'message': 'Point balance'})
>>>>>>> 9f614c7bb64b1d469b67648a4b73423c1a96b00f

