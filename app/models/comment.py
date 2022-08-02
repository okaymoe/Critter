from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    creet_id = db.Column(db.Integer, db.ForeignKey("creets.id"), nullable=False)
    content = db.Column(db.String(280), nullable=False)
    image_url = db.Column(db.String(), nullable=True)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # Relationships
    users = db.relationship("User", back_populates="comments")
    creets = db.relationship("Creet", back_populates="comments")

    # Grab all
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "image_url": self.image_url,
            "creet_id": self.creets.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
