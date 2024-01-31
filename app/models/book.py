from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .bookmark import bookmarks

class Book(db.Model):
    __tablename__ = "books"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(35), nullable=False)
    synopsis = db.Column(db.String(500), nullable=False)
    coverImage = db.Column(db.String(256), nullable=False)
    coverImageName = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, nullable=False, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)


    author = db.relationship("User", back_populates="books")
    pages = db.relationship("Page", back_populates="book", cascade="all, delete-orphan")
    readers = db.relationship("User", secondary=bookmarks, back_populates="bookmarks")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "synopsis": self.synopsis,
            "cover": self.coverImage,
            "coverName": self.coverImageName,
            "date": self.createdAt,
            "author": self.author.to_dict(),
        }
