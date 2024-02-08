from .db import db, environment, SCHEMA, add_prefix_for_prod

user_chats = db.Table('user_chats',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('user.id'))),
    db.Column('chat_id', db.Integer, db.ForeignKey(add_prefix_for_prod('chat.id')))
)

if environment == "production":
    user_chats.schema = SCHEMA
