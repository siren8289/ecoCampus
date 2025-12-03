from flask import Blueprint
from utils.common import success_response
from models.ranking import Ranking

ranking_bp = Blueprint('ranking', __name__, url_prefix='/api/ranking')

@ranking_bp.route('/top10', methods=['GET'])
def get_top_10():
    """상위 10위 랭킹 조회 (ranking)"""
    return success_response({
        'rankings': [
            {'rank': 1, 'username': '환경지킴이', 'points': 15000, 'level': 10},
            {'rank': 2, 'username': '초록이', 'points': 12500, 'level': 9},
            {'rank': 3, 'username': '에코마스터', 'points': 11200, 'level': 8},
            {'rank': 4, 'username': '자연사랑', 'points': 9800, 'level': 7},
            {'rank': 5, 'username': '지구지킴이', 'points': 8500, 'level': 6},
            {'rank': 6, 'username': '그린키퍼', 'points': 7200, 'level': 5},
            {'rank': 7, 'username': '환경수호자', 'points': 6800, 'level': 5},
            {'rank': 8, 'username': '에코맨', 'points': 5900, 'level': 4},
            {'rank': 9, 'username': '녹색배우자', 'points': 5200, 'level': 4},
            {'rank': 10, 'username': '친환경주의자', 'points': 4500, 'level': 3}
        ],
        'my_rank': 5
    })

@ranking_bp.route('/full', methods=['GET'])
def get_full_ranking():
    """전체 랭킹 조회 (rankingPage)"""
    # 실제로는 페이지네이션 처리
    return success_response({
        'rankings': [
            {'rank': i, 'username': f'user{i}', 'points': 15000 - (i * 500), 'level': 10 - (i // 3)}
            for i in range(1, 51)
        ],
        'total_users': 1000,
        'my_rank': 12,
        'page': 1,
        'per_page': 50
    })

@ranking_bp.route('/my-rank', methods=['GET'])
def get_my_ranking():
    """내 랭킹 조회"""
    return success_response({
        'rank': 5,
        'username': '지구지킴이',
        'points': 8500,
        'level': 6,
        'rank_up_points': 500,  # 다음 랭크까지 필요한 포인트
        'total_users': 1000
    })
