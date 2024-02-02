from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Annotation(db.Model):
    __tablename__ = "annotations"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(300), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)
    page_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pages.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="annotations")
    page = db.relationship("Page", back_populates="annotations")


    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "createdAt": self.createdAt,
            "page_id": self.page_id,
            "user_id": self.user_id,
            "user": self.user.username
        }
