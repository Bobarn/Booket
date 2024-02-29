from flask_socketio import SocketIO, emit

import os

#Set up where you want the socket to listen to
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://photobook-xu65.onrender.com/',
        'http://photobook-xu65.onrender.com/'
    ]
else:
    origins = '*'

# create your SocketIO instance

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("sendMessage")
def handle_chat(data):
    emit("sendMessage", data, broadcast=True, include_self=False)

@socketio.on("editMessage")
def handle_edit_message(data):
    emit("editMessage", data, broadcast=True, include_self=False)

@socketio.on("deleteMessage")
def handle_delete_message(data):
    emit("deleteMessage", data, broadcast=True, include_self=False)

@socketio.on('typing')
def handle_typing(data):
    emit('typing', data, broadcast=True, include_self=False)
