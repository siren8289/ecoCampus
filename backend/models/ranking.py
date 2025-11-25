from app import db
from datetime import datetime, date


class Ranking(db.Model):
    """Ranking model for weekly/monthly rankings"""
    __tablename__ = 'rankings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Ranking period
    period_type = db.Column(db.String(20), nullable=False)  # 'weekly', 'monthly', 'all_time'
    period_start = db.Column(db.Date, nullable=False, index=True)
    period_end = db.Column(db.Date, nullable=False)
    
    # Ranking metrics
    rank = db.Column(db.Integer, nullable=False, index=True)
    total_points = db.Column(db.Integer, default=0)
    missions_completed = db.Column(db.Integer, default=0)
    energy_saved = db.Column(db.Float, default=0.0)  # kWh saved
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Unique constraint: one ranking per user per period
    __table_args__ = (
        db.UniqueConstraint('user_id', 'period_type', 'period_start', name='unique_user_period'),
    )
    
    def __repr__(self):
        return f'<Ranking {self.id}: User {self.user_id} - Rank {self.rank}>'
    
    def to_dict(self):
        """Convert ranking to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'period_type': self.period_type,
            'period_start': self.period_start.isoformat() if self.period_start else None,
            'period_end': self.period_end.isoformat() if self.period_end else None,
            'rank': self.rank,
            'total_points': self.total_points,
            'missions_completed': self.missions_completed,
            'energy_saved': self.energy_saved,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

