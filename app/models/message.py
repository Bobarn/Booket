# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Message(db.Model):
#     __tablename__ = 'messages'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     chat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chats.id')), nullable=False)
#     text = db.Column(db.String(500))
#     created_at = db.Column(db.DateTime, default=datetime.now)

#     user = db.relationship('User', back_populates='messages')
#     chat = db.relationship('Chat', back_populates='messages')


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user': self.user.to_dict(),
#             'user_id': self.author_id,
#             'chat_id': self.channel_id,
#             'text': self.content,
#             'created_at': self.created_at
#         }
