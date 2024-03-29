from .db import db, environment, SCHEMA, add_prefix_for_prod

bookmarks = db.Table(
    "bookmarks",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("page_id", db.Integer, db.ForeignKey(add_prefix_for_prod("pages.id")), primary_key=True)
)

if environment == "production":
    bookmarks.schema = SCHEMA
