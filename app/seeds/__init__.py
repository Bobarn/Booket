from flask.cli import AppGroup
from .users import seed_users, undo_users
from .books import seed_books, undo_books
from .pages import seed_pages, undo_pages
from .annotations import seed_annotations, undo_annotations
from .chats import seed_chats, undo_chats

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_chats()
        undo_annotations()
        undo_pages()
        undo_books()
        undo_users()
    seed_users()
    seed_books()
    seed_pages()
    seed_annotations()
    seed_chats()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_chats()
    undo_annotations()
    undo_pages()
    undo_books()
    undo_users()
    # Add other undo functions here
