from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Page(db.Model):
    __tablename__ = "pages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    caption = db.Column(db.String(300), nullable=False)
    image = db.Column(db.String(256), nullable=False)
    imageName = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)

    author = db.relationship("User", back_populates="pages")
    book = db.relationship("Book", back_populates="pages")
    annotations = db.relationship("Annotation", back_populates="page", cascade="all, delete-orphan")


    def to_dict(self):
        return{
            "id": self.id,
            "caption": self.caption,
            "image" : self.image,
            "imageName": self.imageName,
            "date": self.date,
            "book_id": self.book_id,
            "user_id": self.user_id,
        }
