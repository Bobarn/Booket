from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user_chat import user_chats


class Chat(db.Model):

    __tablename__ = 'chats'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    users = db.relationship('User', secondary=user_chats, back_populates='chats')
    messages = db.relationship('Message', back_populates='chat', cascade='all, delete-orphan')


    def to_dict(self):

        return {
        'id': self.id,
        'users': [user.to_dict() for user in self.users],
        'messages': [message.to_dict() for message in self.messages]
        }
