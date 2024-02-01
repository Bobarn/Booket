from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Book, Page
from app.forms import BookForm, PageForm
from .AWS import upload_file_to_s3, get_unique_filename, remove_file_from_s3

book_routes = Blueprint("books", __name__)

# GET ALL BOOKS
@book_routes.route('/all')
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
    my_books = Book.query.filter_by(user_id=current_user.id).all()
    return {"Books": [book.to_dict() for book in my_books]}, 200

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
            category=data["category"]
        )

        print(newBook)

        db.session.add(newBook)
        db.session.commit()

        return newBook.to_dict(), 201

    else:
        return form.errors, 400

# UPDATE BOOK (REVISE)
@book_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def revise_book(id):
    """
    Edit the book and return the newly edited book as a dictionary
    """

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
        book.category = form.category.data

        if form.cover_image.data:
            remove_file_from_s3(book.coverImage)

            image = form.cover_image.data

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

@book_routes.route('/<int:id>/delete', methods=["DELETE"])
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


# @book_routes.route('/<int:id>/pages')
# def get_book_pages(id):
#     """
#     Get all pages of a book
#     """

#     pages = Page.query.filter_by(book_id=id).all();

#     if not pages:
#         return {"message": "Book is Empty"}, 404

#     return {"pages": [page.to_dict() for page in pages]}, 200

# CREATING A PAGE ON A BOOK (PUBLISHING A NEW PAGE TO A BOOK)
@book_routes.route('/<int:id>/new', methods=["POST"])
@login_required
def write_page(id):
    """
    Add a page to a book and return the new page as a dictionary
    """

    book = Book.query.get(id)

    if book.user_id != current_user.id:
        return {"message": "You are not authorized for this action"}, 403

    form = PageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        data = form.data

        image = data["image"]
        imageName = image.filename
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 401

        page_number = len(book.pages) + 1

        newPage = Page(
            book_id = id,
            user_id = current_user.id,
            page_name = data["page_name"],
            page_number = page_number,
            caption = data["caption"],
            image = upload["url"],
            imageName = imageName
        )

        db.session.add(newPage)
        db.session.commit()

        return newPage.to_dict(), 201
    return {"errors": form.errors}, 400
