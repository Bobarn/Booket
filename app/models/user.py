from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .bookmark import bookmarks
from .checkouts import checkouts
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    about = db.Column(db.String(400), nullable=True)
    profileImage = db.Column(db.String(256), default='https://cdn.discordapp.com/attachments/1187515837817557065/1202130354081890314/pngegg_2.png?ex=65cc5622&is=65b9e122&hm=1438e7ae47de79c51b8154031f76113e59a4961b593bbcf9f97ae3b4bd749c36&', nullable=True)
    profileImageName = db.Column(db.String(255), nullable=True)
    bannerImage = db.Column(db.String(256), nullable=True)
    bannerImageName = db.Column(db.String(255), nullable=True)
    joined = db.Column(db.DateTime, default=datetime.now)

    books = db.relationship("Book", back_populates="author")
    pages = db.relationship("Page", back_populates="author")
    annotations = db.relationship("Annotation", back_populates="user")
    checkouts = db.relationship("Book", secondary=checkouts, back_populates="borrowing")
    bookmarks = db.relationship("Page", secondary=bookmarks, back_populates="readers")
    # chats = db.relationship('Chat', secondary='user_chat', back_populates='users')

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
            'about': self.about,
            'profileImage': self.profileImage,
            'profileImageName': self.profileImageName,
            'bannerImage': self.bannerImage,
            'bannerImageName': self.bannerImageName,
            "books": len(self.books),
            "pages": len(self.pages),
            "joined": self.joined,
            # "chats": [chat.id for chat in self.chats]
        }
