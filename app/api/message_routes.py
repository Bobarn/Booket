from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Message, User
from app.forms import MessageForm

message_routes = Blueprint("messages", __name__)

@message_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_message(id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    message = Message.query.get(id)

    if not message:
        return {"error": "Message not found"}, 404

    if form.validate_on_submit():
        message.content = form.data["content"]
        db.session.commit()
        return message.to_dict()
    else:
        return form.errors, 401

@message_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_message(id):
  message = Message.query.get(id)
  if not message:
      return {"error": "Message not found"}, 404
  if message.user_id != current_user.id:
      return {"error": "You do not own this message"}
  else:
      db.session.delete(message)
      db.session.commit()
      return {"message":"Successfully deleted"}

@message_routes.route('/<int:id>')
@login_required
def get_message(id):
    message = Message.query.get(id)

    if not message:
        return {"error": "Message not found"}
    else:
        return message.to_dict()
