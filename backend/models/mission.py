from app import db
from datetime import datetime


class Mission(db.Model):
    """Mission model"""
    __tablename__ = 'missions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # Mission details
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    mission_type = db.Column(db.String(50), nullable=False)  # e.g., 'light_off', 'hvac_off', 'recycle'
    emoji = db.Column(db.String(10), nullable=True)
    
    # Mission status
    status = db.Column(db.String(20), default='pending')  # pending, active, completed, failed
    points_reward = db.Column(db.Integer, default=0)
    
    # Mission timing
    start_time = db.Column(db.DateTime, nullable=True)
    end_time = db.Column(db.DateTime, nullable=True)
    completed_at = db.Column(db.DateTime, nullable=True)
    duration_minutes = db.Column(db.Integer, nullable=True)  # Duration in minutes
    
    # Mission data
    device_name = db.Column(db.String(100), nullable=True)  # e.g., '전등', '냉난방기'
    location = db.Column(db.String(200), nullable=True)  # e.g., 'A동 101호'
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Mission {self.id}: {self.title}>'
    
    def to_dict(self):
        """Convert mission to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'mission_type': self.mission_type,
            'emoji': self.emoji,
            'status': self.status,
            'points_reward': self.points_reward,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'duration_minutes': self.duration_minutes,
            'device_name': self.device_name,
            'location': self.location,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

