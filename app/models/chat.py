# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Chat(db.Model):
#     __tablename__ = 'chats'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user1_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     user2_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.now)

#     user1 = db.relationship('User', back_populates='chats')
#     user2 = db.relationship('User', back_populates='chats')


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user1': self.user1_id,
#             'user2': self.user2_id,
#             'created_at': self.created_at
#         }
