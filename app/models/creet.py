from datetime import datetime
from .db import db

class Creet(db.Model):
    __tablename__ = 'creets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image_url = db.Column(db.String(), nullable=True)
    content = db.Column(db.String(280))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # Relationships
    users = db.relationship("User", back_populates="creets")
    comments = db.relationship("Comment", back_populates="creets", cascade="all, delete")



    # Grab all
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image_url": self.image_url,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "joined": self.users.to_dict()
        }