from .db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(255))
    profile_img = db.Column(db.String(255))
    header_img = db.Column(db.String(255))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    birthday = db.Column(db.String(35), nullable=True)
    location = db.Column(db.String(50), nullable=True)
    joined = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    creets = db.relationship("Creet", back_populates="users")
    comments = db.relationship("Comment", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'bio': self.bio,
            'profile_img': self.profile_img,
            'header_img': self.header_img,
            'email': self.email,
            'hashed_password': self.hashed_password,
            'birthday': self.birthday,
            'location': self.location,
            "joined": self.joined,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
