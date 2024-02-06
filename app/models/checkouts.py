from .db import db, environment, SCHEMA, add_prefix_for_prod

checkouts = db.Table(
    "checkouts",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("book_id", db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")), primary_key=True)
)

if environment == "production":
    checkouts.schema = SCHEMA
