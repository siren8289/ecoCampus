class Point:
    def __init__(self, user_id, amount, type, created_at):
        self.user_id = user_id
        self.amount = amount
        self.type = type
        self.created_at = created_at

    @staticmethod
    def get_total_points(user_id):
        # 임시 예시 값 (DB 연결되면 여기 수정)
        return 8500

    @staticmethod
    def get_available_points(user_id):
        return 8500

    @staticmethod
    def get_history(user_id):
        return [
            {"amount": 1000, "type": "earn", "created_at": "2024-01-01"},
            {"amount": -200, "type": "use", "created_at": "2024-01-02"}
        ]
class Point:
    pass
