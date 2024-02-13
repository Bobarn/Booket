from app.models import db, User, Chat, Message, environment, SCHEMA
from sqlalchemy.sql import text

def seed_chats():

    chat1 = Chat()
    chat2 = Chat()
    chat3 = Chat()
    chat4 = Chat()
    chat5 = Chat()
    chat6 = Chat()
    chat7 = Chat()
    chat8 = Chat()

    chats = [chat1, chat2, chat3, chat4, chat5, chat6, chat7, chat8]


    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)

    user1.chats.append(chat1)
    user2.chats.append(chat1)

    user2.chats.append(chat2)
    user3.chats.append(chat2)

    user1.chats.append(chat4)
    user5.chats.append(chat4)

    user3.chats.append(chat3)
    user1.chats.append(chat3)

    user4.chats.append(chat5)
    user6.chats.append(chat5)

    user7.chats.append(chat6)
    user1.chats.append(chat6)

    user2.chats.append(chat7)
    user4.chats.append(chat7)

    user5.chats.append(chat8)
    user7.chats.append(chat8)

    db.session.add_all(chats)
    db.session.commit()

def undo_chats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM chats"))

    db.session.commit()
