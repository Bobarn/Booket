from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Book, Page
from app.forms import BookForm, PageForm
from .AWS import upload_file_to_s3, get_unique_filename, remove_file_from_s3

book_routes = Blueprint("books", __name__)

# GET ALL BOOKS
@book_routes.route('/')
def get_all_books():
    """
    Get all books in the form of a list of dictionaries
    """
    books = Book.query.all()

    return {"Books": [book.to_dict() for book in books]}, 200

# GET ONE BOOK
@book_routes.route('/<int:id>')
def get_book(id):
    """
    Get a single specific book as a dictionary
    """
    book = Book.query.get(id)
    return book.to_dict()

# GET ALL BOOKS BY USER

@book_routes.route('/current')
@login_required
def get_my_books():
    my_books = Book.query.filter()

# CREATE A BOOK (PUBLISH)
@book_routes.route('/new', methods=["POST"])
@login_required
def start_book():
    """
    Open up a book for pages to be added, return the new book made as a dictionary
    """

    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        coverImageName = data["cover_image"].filename

        cover_image = data["cover_image"]

        cover_image.filename = get_unique_filename(cover_image.filename)

        upload = upload_file_to_s3(cover_image)

        if "url" not in upload:
                return upload, 401

        newBook = Book(
            user_id=current_user.id,
            title=data["title"],
            synopsis=data["synopsis"],
            coverImage=upload["url"],
            coverImageName=coverImageName,
            private=data["private"],
        )

        db.session.add(newBook)
        db.session.commit()

    else:
        return {"errors": form.errors}, 400

# UPDATE BOOK (REVISE)
@book_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def revise_book(id):
    book = Book.query.get(id)

    if book is None:
        return {'message': "Book not found"}, 404
    if current_user.id != book.user_id:
        return {'message': "You are not authorized for this action."}, 403

    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        book.title = form.title.data
        book.synopsis = form.synopsis.data
        book.private = form.private.data

        remove_file_from_s3(book.coverImage)

        image = form.image.data

        coverImageName =  image.filename

        image.filename = get_unique_filename(image.filename)

        newUpload = upload_file_to_s3(image)

        if "url" not in newUpload:
                return newUpload, 401

        book.coverImage = newUpload["url"]
        book.coverImageName = coverImageName

        db.session.commit()

        return book.to_dict(), 201
    else:
        return {"errors": form.errors}, 400

# DELETE BOOK (BURN)

@book_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def burn_book(id):
    """
    Delete the book and return success
    """
    book = Book.query.get(id)

    if book.user_id != current_user.id:
        return {"errors", "You are not authorized for this action"}, 403

    if book is None:
        return {"message": "Book not found"}, 404

    remove_file_from_s3(book.coverImage)

    db.session.delete(book)
    db.session.commit()
    return {"message": "Book deleted successfully"}
