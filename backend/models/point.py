from app import db
from datetime import datetime


class Point(db.Model):
    """Point transaction model"""
    __tablename__ = 'points'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Point transaction details
    amount = db.Column(db.Integer, nullable=False)  # Can be positive (earned) or negative (used)
    transaction_type = db.Column(db.String(50), nullable=False)  # e.g., 'earned', 'used', 'donated'
    description = db.Column(db.String(200), nullable=True)
    
    # Related entities
    mission_id = db.Column(db.Integer, db.ForeignKey('missions.id'), nullable=True)
    related_item = db.Column(db.String(100), nullable=True)  # e.g., '교환권', '기부'
    
    # Balance tracking
    balance_before = db.Column(db.Integer, nullable=False)
    balance_after = db.Column(db.Integer, nullable=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    
    def __repr__(self):
        return f'<Point {self.id}: {self.amount} ({self.transaction_type})>'
    
    def to_dict(self):
        """Convert point transaction to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'amount': self.amount,
            'transaction_type': self.transaction_type,
            'description': self.description,
            'mission_id': self.mission_id,
            'related_item': self.related_item,
            'balance_before': self.balance_before,
            'balance_after': self.balance_after,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

