from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):

    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    chat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chats.id')))
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='messages')
    chat = db.relationship('Chat', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'chat_id': self.chat_id,
            'text': self.content,
            'created_at': self.created_at
        }
