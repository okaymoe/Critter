from .db import db


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    creetId = db.Column(db.Integer, db.ForeignKey("creets.id"), nullable=False)
    url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            "url": self.url,
        }
