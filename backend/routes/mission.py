from flask import Blueprint, request
from utils.common import success_response, error_response
from models.mission import Mission
from models.point import Point
from app import db
from datetime import datetime

mission_bp = Blueprint('mission', __name__, url_prefix='/api/mission')

@mission_bp.route('/list', methods=['GET'])
def get_missions_list():
    """미션 리스트 조회 (missionPage)"""
    missions = Mission.query.all()

    return success_response({
        'missions': [
            {
                'id': m.id,
                'title': m.title,
                'description': m.description,
                'reward_points': m.reward_points,
                'status': 'completed' if m.id <= 2 else 'pending',  # 예시
                'created_at': m.created_at.isoformat()
            } for m in missions
        ],
        'total_count': len(missions),
        'completed_count': 2
    })

@mission_bp.route('/<int:mission_id>', methods=['GET'])
def get_mission_detail(mission_id):
    """미션 상세 조회 (mission)"""
    mission = Mission.query.get(mission_id)

    if not mission:
        return error_response('미션을 찾을 수 없습니다', 404)

    return success_response({
        'id': mission.id,
        'title': mission.title,
        'description': mission.description,
        'long_description': '이 미션은 환경 보호를 위한 활동입니다. 완료하면 포인트를 얻을 수 있습니다.',
        'reward_points': mission.reward_points,
        'difficulty': 'normal',
        'category': 'eco',
        'completion_criteria': '활동을 사진으로 증명',
        'is_completed': mission.id <= 2
    })

@mission_bp.route('/<int:mission_id>/complete', methods=['POST'])
def complete_mission(mission_id):
    """미션 완료"""
    mission = Mission.query.get(mission_id)

    if not mission:
        return error_response('미션을 찾을 수 없습니다', 404)

    # 포인트 추가
    new_point = Point(
        user_id=1,  # 실제로는 로그인한 사용자
        amount=mission.reward_points,
        reason=f'{mission.title} 완료'
    )
    db.session.add(new_point)
    db.session.commit()

    return success_response({
        'message': '미션 완료!',
        'earned_points': mission.reward_points,
        'total_points': 8500 + mission.reward_points
    })

@mission_bp.route('/daily', methods=['GET'])
def get_daily_missions():
    """오늘의 미션 조회"""
    return success_response({
        'daily_missions': [
            {
                'id': 1,
                'title': '물 마시기',
                'reward_points': 10,
                'is_completed': True
            },
            {
                'id': 2,
                'title': '산책하기',
                'reward_points': 50,
                'is_completed': True
            },
            {
                'id': 3,
                'title': '종이 재활용',
                'reward_points': 30,
                'is_completed': False
            }
        ],
        'completed_count': 2,
        'total_count': 3
    })
