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
