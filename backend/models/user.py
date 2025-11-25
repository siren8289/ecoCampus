from app import db
from datetime import datetime


class User(db.Model):
    """User model"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    department = db.Column(db.String(100), nullable=True)
    student_id = db.Column(db.String(50), unique=True, nullable=True)
    
    # Character/Level related
    level = db.Column(db.Integer, default=1)
    experience = db.Column(db.Integer, default=0)
    total_points = db.Column(db.Integer, default=0)
    current_points = db.Column(db.Integer, default=0)
    
    # Statistics
    completed_missions_count = db.Column(db.Integer, default=0)
    consecutive_days = db.Column(db.Integer, default=0)
    last_active_date = db.Column(db.Date, nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    missions = db.relationship('Mission', backref='user', lazy=True, cascade='all, delete-orphan')
    points = db.relationship('Point', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'department': self.department,
            'student_id': self.student_id,
            'level': self.level,
            'experience': self.experience,
            'total_points': self.total_points,
            'current_points': self.current_points,
            'completed_missions_count': self.completed_missions_count,
            'consecutive_days': self.consecutive_days,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

