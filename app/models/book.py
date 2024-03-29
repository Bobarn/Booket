from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .checkouts import checkouts

class Book(db.Model):
    __tablename__ = "books"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(35), nullable=False)
    synopsis = db.Column(db.String(350), nullable=False)
    category = db.Column(db.String(20), nullable=False)
    coverImage = db.Column(db.String(256), nullable=False)
    coverImageName = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, nullable=False, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.now)


    author = db.relationship("User", back_populates="books")
    borrowing = db.relationship("User", secondary=checkouts, back_populates="checkouts")
    pages = db.relationship("Page", back_populates="book", cascade="all, delete-orphan")

    def to_dict(self):
        pages = sorted(self.pages, key= lambda page: page.id)
        return {
            "id": self.id,
            "title": self.title,
            "synopsis": self.synopsis,
            "category": self.category,
            "cover": self.coverImage,
            "coverName": self.coverImageName,
            "date": self.createdAt,
            "author": self.author.to_dict(),
            "pages": [page.to_dict() for page in pages],
            "private": self.private
        }
