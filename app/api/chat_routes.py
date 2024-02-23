from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Chat, Message, User, user_chats
from app.forms import ChatForm, MessageForm

chat_routes = Blueprint("chats", __name__)

@chat_routes.route('/<int:id>/messages')
@login_required
def chat_messages(id):
    """Get a chat by ID with its messages"""
    chat = Chat.query.get(id)

    if not chat:
        return {"errors": "Chat could not be found"}, 404
    else:
        return chat.to_dict(), 200

@chat_routes.route('/all')
@login_required
def get_chats():
    """Get all of a users chats"""
    chats = Chat.query.join(user_chats).join(User).filter(User.id == current_user.id).all()
    print(chats)

    return [chat.to_dict() for chat in chats]

@chat_routes.route('/new', methods=['POST'])
@login_required
def create_chat():
    form = ChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        chat = Chat()

        user2 = User.query.get(form.data["user2Id"])

        current_user.chats.append(chat)

        user2.chats.append(chat)

        db.session.add(chat)
        db.session.commit()

        return chat.to_dict()
    else:
        return form.errors, 401



@chat_routes.route('/<int:id>/message', methods=['POST'])
@login_required
def send_message(id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("In here!")

    chat = Chat.query.get(id)

    if not chat:
        return {"error": "Chat not found"}, 404

    if form.validate_on_submit():

        message = Message(
            user_id = current_user.id,
            chat_id = id,
            content = form.data["content"]
        )

        db.session.add(message)
        db.session.commit()
        return message.to_dict()

    return form.errors, 401

@chat_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_chat(id):
    chat = Chat.query.get(id)

    if not chat:
        return {"error": "Chat not found"}, 404

    if chat not in current_user.chats:
        return {"error": "You do not own this chat"}, 401

    db.session.delete(chat)
    db.session.commit()
    return {"message": "Chat deleted successfully"}
